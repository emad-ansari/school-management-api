import React, { useEffect, useState } from "react";
import { GraduationCap, MapPin, Building2, Loader2, AlertCircle, Search } from "lucide-react";
import { apiService } from "../services/api";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";

export const ShowSchoolsPage = () => {
	const [schools, setSchools] = useState([]);
	const [filteredSchools, setFilteredSchools] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchLoading, setSearchLoading] = useState(false);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		fetchSchools();
	}, []);

	useEffect(() => {
		// Debounce search to avoid too many API calls
		const timeoutId = setTimeout(() => {
			if (searchQuery.trim() === "") {
				setFilteredSchools(schools);
			} else {
				performSearch(searchQuery);
			}
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [searchQuery, schools]);

	const fetchSchools = async () => {
		try {
			setLoading(true);
			const data = await apiService.getAllSchools();
			setSchools(data.schools || data || []);
			setFilteredSchools(data.schools || data || []);
		} catch (err) {
			setError(err.message || "Failed to fetch schools");
		} finally {
			setLoading(false);
		}
	};

	const performSearch = async (query) => {
		if (query.trim() === "") {
			setFilteredSchools(schools);
			return;
		}

		try {
			setSearchLoading(true);
			const data = await apiService.searchSchools(query);
			setFilteredSchools(data.schools || []);
		} catch (err) {
			console.error('Search error:', err);
			// Fallback to client-side filtering if search API fails
			const filtered = schools.filter(school => {
				const queryLower = query.toLowerCase();
				const name = (school.name || school.schoolName || "").toLowerCase();
				const address = (school.address || "").toLowerCase();
				const city = (school.city || "").toLowerCase();
				const state = (school.state || "").toLowerCase();
				
				return name.includes(queryLower) || 
					   address.includes(queryLower) || 
					   city.includes(queryLower) || 
					   state.includes(queryLower);
			});
			setFilteredSchools(filtered);
		} finally {
			setSearchLoading(false);
		}
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-center">
					<Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
					<p className="text-muted-foreground">Loading schools...</p>
				</div>
			</div>
		);
	}

	// if (error) {
	// 	return (
	// 		<div className="min-h-screen bg-background flex items-center justify-center">
	// 			<div className="text-center">
	// 				<AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
	// 				<p className="text-red-600 font-medium">Error: {error}</p>
	// 				<button
	// 					onClick={fetchSchools}
	// 					className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
	// 				>
	// 					Try Again
	// 				</button>
	// 			</div>
	// 		</div>
	// 	);
	// }

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8">
				{/* Header Section */}
				<div className="text-center mb-8">
					<div className="flex items-center justify-center gap-3 mb-4">
						<div className="p-3 bg-primary/10 rounded-full">
							<GraduationCap className="h-8 w-8 text-primary" />
						</div>
						<h1 className="text-4xl font-bold text-card-foreground">
							Our Schools
						</h1>
					</div>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
						Discover and explore the diverse range of schools in our network. 
						Find the perfect educational institution for your needs.
					</p>
				</div>

				{/* Search Section */}
				<div className="max-w-md mx-auto mb-8">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							type="text"
							placeholder="Search schools by name, address, city, or state..."
							value={searchQuery}
							onChange={handleSearchChange}
							className="pl-10 pr-4 py-3 text-base border-border focus:ring-2 focus:ring-ring focus:border-transparent"
						/>
						{searchLoading && (
							<Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-primary" />
						)}
					</div>
					{searchQuery && (
						<p className="text-sm text-muted-foreground mt-2 text-center">
							Found {filteredSchools.length} school{filteredSchools.length !== 1 ? 's' : ''} matching "{searchQuery}"
						</p>
					)}
				</div>

				{/* Schools Grid */}
				{filteredSchools.length === 0 ? (
					<div className="text-center py-16">
						<Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-card-foreground mb-2">
							{searchQuery ? 'No Schools Found' : 'No Schools Found'}
						</h3>
						<p className="text-muted-foreground">
							{searchQuery 
								? `No schools match your search for "${searchQuery}". Try a different search term.`
								: 'There are no schools registered in the system yet.'
							}
						</p>
						{searchQuery && (
							<button
								onClick={() => setSearchQuery("")}
								className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
							>
								Clear Search
							</button>
						)}
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{filteredSchools.map((school, index) => (
							<Card
								key={school.id || index}
								className="group hover:shadow-xl transition-all duration-300 border-0 bg-card overflow-hidden"
							>
								{/* School Image */}
								<div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
									{school.picture ? (
										<img
											src={school.picture}
											alt={`${school.name} school building`}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
										/>
									) : (
										<div className="flex flex-col items-center justify-center text-muted-foreground">
											<Building2 className="h-12 w-12 mb-2" />
											<p className="text-sm">No Image</p>
										</div>
									)}
								</div>

								{/* School Details */}
								<CardContent className="p-6">
									<CardTitle className="text-lg font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors overflow-hidden text-ellipsis whitespace-nowrap">
										{school.name || school.schoolName || "School Name"}
									</CardTitle>

									<div className="space-y-3">
										{/* Address */}
										<div className="flex items-start gap-2">
											<MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
											<CardDescription className="text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
												{school.address || "Address not available"}
											</CardDescription>
										</div>

										{/* City */}
										{school.city && (
											<div className="flex items-center gap-2">
												<Building2 className="h-4 w-4 text-muted-foreground" />
												<span className="text-sm text-muted-foreground">
													{school.city}
												</span>
											</div>
										)}

										{/* State (if available) */}
										{school.state && (
											<div className="flex items-center gap-2">
												<MapPin className="h-4 w-4 text-muted-foreground" />
												<span className="text-sm text-muted-foreground">
													{school.state}
												</span>
											</div>
										)}
									</div>

									{/* View Details Button */}
									<button className="w-full mt-4 py-2 px-4 bg-primary/10 text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors duration-200 font-medium">
										View Details
									</button>
								</CardContent>
							</Card>
						))}
					</div>
				)}

				{/* Footer Info */}
				{filteredSchools.length > 0 && (
					<div className="text-center mt-12 pt-8 border-t border-border">
						<p className="text-muted-foreground">
							{searchQuery 
								? `Showing ${filteredSchools.length} of ${schools.length} schools matching your search`
								: `Showing ${filteredSchools.length} school${filteredSchools.length !== 1 ? 's' : ''} in our network`
							}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

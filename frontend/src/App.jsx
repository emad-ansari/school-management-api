import "./App.css";
import { GraduationCap, MapPin } from "lucide-react";
import { AddSchoolForm } from "./components/add-school-form";
import { ProximitySearchForm } from "./components/proximity-search-form";
import { ApiStatus } from "./components/api-status";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./components/ui/card";


function App() {
	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				{/* Header Section */}
				<div className="text-center mb-12">
					<div className="flex items-center justify-center gap-3 mb-4">
						<div className="p-3 bg-primary/10 rounded-full">
							<GraduationCap className="h-8 w-8 text-primary" />
						</div>
						<h1 className="text-4xl font-bold text-foreground">
							School Management API
						</h1>
					</div>
					<div className="flex items-center justify-center gap-4 mb-4">
						<ApiStatus />
					</div>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Welcome to the School Management API. Use the forms
						below to interact with the API endpoints and manage
						school data efficiently.
					</p>
				</div>

				{/* Main Content Grid */}
				<div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
					{/* Add New School Section */}
					<Card className="shadow-lg border-0 bg-card">
						<CardHeader className="pb-6">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-primary/10 rounded-lg">
									<GraduationCap className="h-5 w-5 text-primary" />
								</div>
								<div>
									<CardTitle className="text-2xl text-card-foreground">
										Add New School
									</CardTitle>
									<CardDescription className="text-muted-foreground">
										Register a new school in the system with
										location details
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<AddSchoolForm />
						</CardContent>
					</Card>

					{/* List Schools by Proximity Section */}
					<Card className="shadow-lg border-0 bg-card">
						<CardHeader className="pb-6">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-accent/10 rounded-lg">
									<MapPin className="h-5 w-5 text-accent" />
								</div>
								<div>
									<CardTitle className="text-2xl text-card-foreground">
										Find Schools Nearby
									</CardTitle>
									<CardDescription className="text-muted-foreground">
										Discover schools in your area based on
										your location
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<ProximitySearchForm />
						</CardContent>
					</Card>
				</div>

				{/* Footer */}
				<div className="mt-16 text-center">
					<p className="text-sm text-muted-foreground">
						Built with modern web technologies for efficient school
						management
					</p>
				</div>
			</div>
		</div>
	);
}

export default App;

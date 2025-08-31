import { GraduationCap, MapPin } from "lucide-react";
import { AddSchoolForm } from "../components/add-school-form";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { useEffect } from "react";

export const SchoolFormPage = () => {
	
	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8">
				{/* Responsive Layout: Text on left, Form on right for larger screens */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
					{/* Left Side - Welcome Text & Description */}
					<div className="lg:sticky lg:top-8">
						<div className="text-center lg:text-left">
							{/* Icon and Main Heading */}
							<div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
								<h1 className="text-3xl lg:text-4xl font-bold text-card-foreground">
									Welcome to MySchool
								</h1>
							</div>
							
							{/* Description */}
							<p className="text-lg text-muted-foreground max-w-lg lg:max-w-none mb-6">
								Welcome to MySchool. Use the form to add new school details and manage school data efficiently.
							</p>
							
							{/* Additional Info */}
							<div className="space-y-4 text-left">
								<div className="flex items-start gap-3">
									<div className="p-2 bg-accent/10 rounded-lg mt-1">
										<GraduationCap className="h-4 w-4 text-accent" />
									</div>
									<div>
										<h3 className="font-semibold text-card-foreground mb-1">
											Easy Registration
										</h3>
										<p className="text-sm text-muted-foreground">
											Quickly add new schools with our streamlined form
										</p>
									</div>
								</div>
								
								<div className="flex items-start gap-3">
									<div className="p-2 bg-primary/10 rounded-lg mt-1">
										<MapPin className="h-4 w-4 text-primary" />
									</div>
									<div>
										<h3 className="font-semibold text-card-foreground mb-1">
											Location Management
										</h3>
										<p className="text-sm text-muted-foreground">
											Store precise location data for each school
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Side - Add School Form */}
					<div className="lg:sticky lg:top-8">
						<Card className="shadow-lg border-0 bg-card">
							<CardHeader className="pb-6">
								<div className="flex items-center gap-4">
									<div className="p-2 bg-primary/10 rounded-lg">
										<GraduationCap className="h-5 w-5 text-primary" />
									</div>
									<div>
										<CardTitle className="text-2xl text-card-foreground">
											Add New School
										</CardTitle>
										<CardDescription className="text-muted-foreground">
											Register a new school in the system with
											given details
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<AddSchoolForm />
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

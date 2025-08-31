import { GraduationCap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
	const location = useLocation();

	return (
		<header className="border-b border-border bg-background">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
						<div className="p-2 bg-primary/10 rounded-lg">
							<GraduationCap className="h-6 w-6 text-primary" />
						</div>
						<h1 className="text-xl md:text-2xl font-bold text-foreground">
							MySchool
						</h1>
					</Link>

					{/* Navigation */}
					<nav className="flex items-center gap-6">
						<Link
							to="/"
							className={`text-sm font-medium transition-colors hover:text-primary ${
								location.pathname === "/" 
									? "text-primary" 
									: "text-muted-foreground"
							}`}
						>
							Add School
						</Link>
						<Link
							to="/schools"
							className={`text-sm font-medium transition-colors hover:text-primary ${
								location.pathname === "/schools" 
									? "text-primary" 
									: "text-muted-foreground"
							}`}
						>
							View Schools
						</Link>
					</nav>
				</div>
			</div>
		</header>
	);
};

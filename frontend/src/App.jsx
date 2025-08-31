import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { SchoolFormPage } from "./pages/SchoolFromPage";
import { ShowSchoolsPage } from "./pages/showSchools";
import { Header } from "./components/Header";

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<SchoolFormPage />} />
				<Route path="/schools" element={<ShowSchoolsPage />} />
			</Routes>
		</Router>
	);
}

export default App;

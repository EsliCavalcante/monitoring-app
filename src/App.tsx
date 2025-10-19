import PreviewDocumentPage from "./pages/PreviewDocumentPage";
import TemperatureListPage from "./pages/TemperatureListPage";
import { BrowserRouter, Routes, Route } from "react-router";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/monitoring-app/"
					element={<TemperatureListPage />}
				/>
				<Route
					path="/temperature-monitoring-preview"
					element={<PreviewDocumentPage />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;

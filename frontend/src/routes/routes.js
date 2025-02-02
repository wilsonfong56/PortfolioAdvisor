import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App.js";
import LandingPage from "../pages/LandingPage.js";
import LoginPage from "../pages/LoginPage.js";
import SignupPage from "../pages/SignupPage.js";
import HeatmapPage from "../pages/HeatmapPage.js";
import ChartPage from "../pages/ChartPage.js";
import ChartsPage from "../pages/ChartsPage.js";
import {PortfolioProvider} from "../components/PortfolioContext.js";

const AppRoutes = () => {
    return (
        <PortfolioProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/app" element={<App />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/maps" element={<HeatmapPage />} />
                    <Route path="/chart" element={<ChartPage />} />
                    <Route path="/charts" element={<ChartsPage />} />
                </Routes>
            </BrowserRouter>
        </PortfolioProvider>
    )
}

export default AppRoutes;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App.js";
import LandingPage from "../pages/LandingPage.js";
import LoginPage from "../pages/LoginPage.js";
import SignupPage from "../pages/SignupPage.js";
import FunPage from "../pages/FunPage.js";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/app" element={<App />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/fun" element={<FunPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
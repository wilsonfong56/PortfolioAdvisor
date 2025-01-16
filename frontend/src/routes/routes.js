import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App.js";
import LandingPage from "../components/LandingPage.js";
import LoginPage from "../components/LoginPage.js";
import SignupPage from "../components/SignupPage.js";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/app" element={<App />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
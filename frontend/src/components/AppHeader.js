import React from "react";
import { BadgeDollarSign } from 'lucide-react';
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

function AppHeader() {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('access_token');
        navigate('/');
    }
    return (
        <>
            <header className="absolute w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
                <div className="max-w-7xl mx-auto px-2">
                    <div className="flex justify-between items-center py-3">
                        {/* Logo */}
                        <div className="flex items-center absolute left-4">
                            <a href="/app" className="flex items-center space-x-2">
                                <BadgeDollarSign className="h-8 w-8 text-indigo-600"/>
                                <span
                                    className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                  MarketMentor
                                </span>
                            </a>
                        </div>

                        <nav className="hidden md:flex items-center space-x-8 ml-auto">
                            <a href="/maps" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                Heat Maps
                            </a>
                            <a href="/chart" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                TA Center
                            </a>
                            <a href="/charts" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                Holdings Summary
                            </a>
                            <button
                                className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}

export default AppHeader;
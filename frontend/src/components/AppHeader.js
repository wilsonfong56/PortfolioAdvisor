import React, {useState} from "react";
import { BadgeDollarSign } from 'lucide-react';
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

function AppHeader() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        Cookies.remove('access_token');
        navigate('/');
    }
    return (
        <>
            <header className="absolute w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
                <div className="max-w-7xl mx-auto px-2">
                    <div className="flex justify-between items-center py-3">
                        <div className="flex items-center">
                            <a href="/app" className="flex items-center space-x-2">
                                <BadgeDollarSign className="h-8 w-8 text-indigo-600" />
                                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                  MarketMentor
                                </span>
                            </a>
                        </div>

                        <div className="relative ml-auto">
                            <button
                                className="p-2 rounded-full text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-list" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                                </svg>
                            </button>
                            {dropdownOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                                    <a href="/maps" className="block px-4 py-2 text-gray-600 hover:bg-indigo-100">
                                        Heat Maps
                                    </a>
                                    <a href="/chart" className="block px-4 py-2 text-gray-600 hover:bg-indigo-100">
                                        TA Center
                                    </a>
                                    <a href="/charts" className="block px-4 py-2 text-gray-600 hover:bg-indigo-100">
                                        Holdings Summary
                                    </a>
                                    <a href="/sentiment" className="block px-4 py-2 text-gray-600 hover:bg-indigo-100">
                                        Market Sentiment
                                    </a>
                                    <a href="/recommendations" className="block px-4 py-2 text-gray-600 hover:bg-indigo-100">
                                        Recommendations
                                    </a>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-indigo-100"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default AppHeader;
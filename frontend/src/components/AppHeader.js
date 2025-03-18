import React, { useState, useRef, useEffect } from "react";
import { BadgeDollarSign } from 'lucide-react';
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

function AppHeader() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        setDropdownOpen(false);
        Cookies.remove('access_token');
        navigate('/');
    };

    return (
        <header className="absolute w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
            <div className="max-w-7xl mx-auto px-2">
                <div className="flex justify-between items-center py-3">
                    <div className="flex items-center">
                        <Link to="/app" className="flex items-center space-x-2">
                            <BadgeDollarSign className="h-8 w-8 text-indigo-600" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                MarketMentor
                            </span>
                        </Link>
                    </div>

                    <div className="relative ml-auto">
                        <button
                            ref={buttonRef}
                            className="p-2 rounded-full text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                            </svg>
                        </button>
                        {dropdownOpen && (
                            <div
                                ref={dropdownRef}
                                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200"
                            >
                                <Link to="/maps" className="block px-4 py-2 text-gray-600 hover:bg-indigo-100">
                                    Heat Maps
                                </Link>
                                <Link to="/chart" className="block px-4 py-2 text-gray-600 hover:bg-indigo-100">
                                    TA Center
                                </Link>
                                <Link to="/charts" className="block px-4 py-2 text-gray-600 hover:bg-indigo-100">
                                    Holdings Summary
                                </Link>
                                <Link to="/sentiment" className="block px-4 py-2 text-gray-600 hover:bg-indigo-100">
                                    Market Sentiment
                                </Link>
                                <Link to="/recommendations" className="block px-4 py-2 text-gray-600 hover:bg-indigo-100">
                                    Recommendations
                                </Link>
                                <Link to="/feedback" className="block px-4 py-2 text-gray-600 hover:bg-indigo-100">
                                    Contact us
                                </Link>
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
    );
}

export default AppHeader;
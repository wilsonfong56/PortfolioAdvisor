import React from "react";
import Header from "./Header.js";
import { TrendingUp } from 'lucide-react';
import {Link} from "react-router-dom";

const LoginPage = () => {

    return (
        <>
            <Header/>
            <div className="pt-24 pb-8 md:pt-32 max-w-7xl mx-auto px-4 sm:px-6">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="flex justify-center">
                        <div className="flex items-center">
                            <TrendingUp className="h-8 w-8 text-blue-600"/>
                            <span className="ml-2 text-xl font-semibold">StockAI Portfolio</span>
                        </div>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Log in to your account
                    </h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="loginEmail"
                                type="email"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="loginPassword"
                                    type="password"
                                    // type={showPassword ? "text" : "password"}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    // onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                >
                                    {/*{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}*/}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                                Forgot password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign In
                        </button>
                    </form>
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"/>
                            </div>
                            <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                              New to StockAI?
                            </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link to="/signup">
                                <button
                                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Create new account
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;
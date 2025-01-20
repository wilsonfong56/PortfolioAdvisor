import React, {useState} from "react";
import Header from "./Header.js";
import {TrendingUp} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import { registerUser } from "../api/api.js";

const SignupPage = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate();
    const [fieldsMissing, setFieldsMissing] = useState(false);
    const [emailTaken, setEmailTaken] = useState(false);
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [passwordsMismatched, setPasswordsMismatched] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        setFieldsMissing(false);
        setEmailTaken(false);
        setIsInvalidEmail(false);

        if (confirmPassword === password) {
            registerUser(name, email, password)
                .then((response) => {
                    const message = response.data.message
                    if (message === "Registration Successful!") {
                        console.log("Registration successful!")
                        navigate("/login");
                    } else if (message === "Missing field(s)") {
                        console.log("All fields must be filled!")
                        setFieldsMissing(true);
                    } else if (message === "Email taken.") {
                        console.log("Email already has account")
                        setEmailTaken(true);
                    } else if (message === "Invalid email") {
                        console.log("Invalid email")
                        setIsInvalidEmail(true);
                    }
                })
                .catch((error) => console.log(error));
        }
        else {
            setPasswordsMismatched(true);
        }
    }

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
                        Create your account
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type="password"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Create Account
                        </button>
                    </form>
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"/>
                            </div>
                            <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                              Already have an account?
                            </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link to="/login">
                                <button
                                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Sign in to existing account
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupPage;
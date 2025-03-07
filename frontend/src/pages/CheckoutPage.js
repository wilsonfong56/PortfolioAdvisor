import React from "react";
import CheckoutButton from "../components/CheckoutButton.js";

function CheckoutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <svg className="h-8 w-8 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                        </svg>
                        <span className="ml-2 text-xl font-semibold text-gray-900">MarketMentor</span>
                    </div>
                    <div>
                        <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Back to Dashboard</a>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900">Complete Your Purchase</h1>
                        <p className="mt-1 text-sm text-gray-500">AI Stock Portfolio Management Premium Plan</p>
                    </div>

                    <div className="px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">Plan Details</h2>
                                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                                    <div className="flex justify-between py-3 border-b border-gray-200">
                                        <span className="font-medium">Premium Monthly Plan</span>
                                        <span className="text-gray-900">$5.00</span>
                                    </div>
                                    <div className="flex justify-between py-3">
                                        <span>Total</span>
                                        <span className="font-bold text-indigo-600">$5.00</span>
                                    </div>
                                </div>

                                <h2 className="text-lg font-medium text-gray-900 mt-6">What's included:</h2>
                                <ul className="mt-4 space-y-3">
                                    <li className="flex">
                                        <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span className="ml-2">Real-time AI market insights and analysis</span>
                                    </li>
                                    <li className="flex">
                                        <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span className="ml-2">Institutional investor tracking</span>
                                    </li>
                                    <li className="flex">
                                        <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span className="ml-2">Advanced portfolio management tools</span>
                                    </li>
                                    <li className="flex">
                                        <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span className="ml-2">Personalized stock recommendations</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h2 className="text-lg font-medium text-gray-900">Payment Information</h2>
                                <p className="mt-2 text-sm text-gray-500">You'll be redirected to our secure payment processor to complete your purchase.</p>

                                <div className="mt-6">
                                    <div className="mt-6">
                                        <CheckoutButton />
                                    </div>

                                    <p className="mt-4 text-sm text-gray-500 flex items-center">
                                        <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                        </svg>
                                        All transactions are secure and encrypted
                                    </p>

                                    <p className="mt-2 text-xs text-gray-500">
                                        By completing your purchase, you agree to our <a href="#" className="text-indigo-600 hover:text-indigo-800">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-800">Privacy Policy</a>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default CheckoutPage;
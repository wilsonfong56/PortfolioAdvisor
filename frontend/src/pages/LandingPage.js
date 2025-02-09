import React from 'react';
import IndexHeader from "../components/IndexHeader.js";
import { MessageSquare, Shield, Briefcase, ChevronRight } from 'lucide-react';
import {Link} from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
           <IndexHeader />
            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
                        <div className="mb-12 lg:mb-0">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Intelligent Stock Portfolio Management with AI
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Make smarter investment decisions with real-time AI insights, market analysis, and institutional investor data.
                            </p>
                            <div className="flex space-x-4">
                                <Link to="/signup">
                                    <button className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center">
                                        Start Free Trial
                                        <ChevronRight className="ml-2 h-5 w-5" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <img
                                    src="DashboardPreview.jpg"
                                    alt="Dashboard Preview"
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Smart Investing</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                                <MessageSquare className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">AI-Powered Insights</h3>
                            <p className="text-gray-600">
                                Get personalized stock analysis and recommendations based on real-time market data and news.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                                <Briefcase className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Institutional Tracking</h3>
                            <p className="text-gray-600">
                                Follow smart money movements with real-time updates on hedge fund positions and strategies.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                                <Shield className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Portfolio Management</h3>
                            <p className="text-gray-600">
                                Easily track and manage your investments with our intuitive dashboard and real-time updates.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;

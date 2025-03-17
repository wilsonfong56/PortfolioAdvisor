import React from "react";
import FearGreedIndex from "../components/FearGreedIndex.js";
import AppHeader from "../components/AppHeader.js";
import HotList from "../components/tradingview/HotList.js";
import PutCallRatio from "../components/tradingview/PutCallRatio.js";

const MarketHealthPage = () => {
    return (
        <>
            <AppHeader/>
            <div className="container mx-auto px-4 pt-20">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Market Health Dashboard</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Fear & Greed Index */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Fear & Greed Index</h2>
                        <div className="h-[300px]">
                            <FearGreedIndex/>
                        </div>
                    </div>

                    {/* Hot List */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Market Movers</h2>
                        <div className="h-[550px]">
                            <HotList/>
                        </div>
                    </div>
                </div>

                {/* Market Breadth Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="h-[400px]">
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="h-[400px]">
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="h-[400px]">
                        
                        </div>
                    </div>
                </div>

                {/* Put/Call Ratio Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="h-[400px]">
                            <PutCallRatio symbol="PCSP" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="h-[400px]">
                            <PutCallRatio symbol="PCQQ" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="h-[400px]">
                            <PutCallRatio symbol="PCIW" />
                        </div>
                    </div>
                </div>

                {/* Put/Call Ratio Explanation */}
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Put/Call Ratios</h3>
                    <div className="text-blue-800 space-y-2">
                        <p>The Put/Call Ratio is a technical indicator that helps measure market sentiment. Here's how to interpret it:</p>
                        <ul className="list-disc pl-6">
                            <li><span className="font-semibold">Above 1.0:</span> More puts than calls - indicates bearish sentiment (investors are buying more put options for protection)</li>
                            <li><span className="font-semibold">Below 1.0:</span> More calls than puts - indicates bullish sentiment (investors are buying more call options for upside)</li>
                            <li><span className="font-semibold">Extreme readings:</span> Values above 1.5 or below 0.5 often signal potential market reversals due to excessive sentiment</li>
                        </ul>
                        <p className="mt-2 text-sm italic">Note: PCSP = S&P 500 Put/Call Ratio, PCQQ = Nasdaq 100 Put/Call Ratio, PCIW = Russell 2000 Put/Call Ratio</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MarketHealthPage;
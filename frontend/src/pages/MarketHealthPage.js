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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="h-[300px]">
                            <PutCallRatio symbol="PCSP" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="h-[300px]">
                            <PutCallRatio symbol="PCQQ" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="h-[300px]">
                            <PutCallRatio symbol="PCIW" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MarketHealthPage;
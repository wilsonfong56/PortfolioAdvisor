import React from "react";
import TradingViewStockHeatmap from "../components/tradingview/StockHeatmap.js";
import TradingViewCryptoHeatmap from "../components/tradingview/CryptoHeatmap.js";
import NewsWidget from "../components/tradingview/NewsWidget.js";
import TradingViewAnalyticsChart from "../components/tradingview/AnalyticsChart.js";

const FunPage = () => {
    return (
        <>
            <div className="flex flex-col lg:flex-row gap-6 max-w-9xl w-full">
                <div className="lg:flex-[1] h-[600px]">
                    <TradingViewStockHeatmap/>
                </div>
                <div className="lg:flex-[1] h-[600px]">
                    <TradingViewCryptoHeatmap/>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 max-w-9xl w-full">
                <div className="lg:flex-[1] h-[600px]">
                    <TradingViewAnalyticsChart/>
                </div>
                <div className="lg:flex-[1] h-[600px]">
                    <NewsWidget/>
                </div>
            </div>
        </>
    )
}

export default FunPage;
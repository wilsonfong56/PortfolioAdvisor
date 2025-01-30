import React from "react";
import AnalyticsChart from "../components/tradingview/AnalyticsChart.js";

const ChartsPage = () => {
    const tickers = ["SPY", "AAPL", "TSLA", "AMZN", "MSFT"];

    return (
        <div className="pt-20 px-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickers.map((ticker) => (
                    <div key={ticker} className="h-[500px] md:h-[600px] w-full">
                        <AnalyticsChart ticker={ticker} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChartsPage;


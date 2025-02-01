import React from "react";
import CompanyProfile from "../components/tradingview/CompanyProfile.js";
import StockTrend from "../components/tradingview/StockTrend.js";
import SimpleChart from "../components/tradingview/SimpleChart.js";
import AppHeader from "../components/AppHeader.js";

const ChartsPage = () => {
    const tickers = ["SPY", "AAPL", "TSLA", "AMZN", "MSFT"];

    return (
        <>
            <AppHeader />
            <div className="pt-20 px-6 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {tickers.map((ticker) => (
                        <div key={ticker} className="h-[700px] md:h-[800px] w-auto">
                            {/* Rectangular Chart */}
                            <div className="h-[350px] w-full">
                                <SimpleChart ticker={ticker}/>
                            </div>

                            {/* Flex Container for StockTrend & CompanyProfile */}
                            <div className="flex flex-row gap-4 h-[calc(100%-350px)]">
                                <div className="w-1/2 flex-grow">
                                    <CompanyProfile ticker={ticker}/>
                                </div>
                                <div className="w-1/2 flex-grow">
                                    <StockTrend ticker={ticker}/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ChartsPage;


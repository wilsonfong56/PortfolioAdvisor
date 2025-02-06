import React from "react";
import FearGreedIndex from "../components/FearGreedIndex.js";
import AppHeader from "../components/AppHeader.js";
import HotList from "../components/tradingview/HotList.js";

const MarketHealthPage = () => {
    return (
        <>
            <AppHeader/>
            <div className="flex flex-col lg:flex-row pt-20 gap-1 max-w-9xl w-full">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                    <FearGreedIndex/>
                </div>
                <HotList/>
            </div>
        </>
    )
}

export default MarketHealthPage;
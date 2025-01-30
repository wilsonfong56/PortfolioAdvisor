import React, {useEffect, useState} from "react";
import AppHeader from "../components/AppHeader.js";
import NewsWidget from "../components/NewsWidget.js";
import {getStockNews} from "../api/api.js";
import AnalyticsChart from "../components/tradingview/AnalyticsChart.js";

const ChartPage = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        getStockNews("AAPL")
            .then((res) => {
                setNews(res.data.news);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <>
            <AppHeader />
            <div className="flex flex-col lg:flex-row pt-20 gap-6 max-w-9xl w-full">
                <div className="lg:flex-[2] pl-6 h-[600px]">
                    <AnalyticsChart ticker={"SPY"}/>
                </div>
                <div className="lg:flex-[1] h-[600px]">
                    <NewsWidget newsItems={news}/>
                </div>
            </div>
        </>
    )
}

export default ChartPage;
import React, {useContext, useEffect} from "react";
import CompanyProfile from "../components/tradingview/CompanyProfile.js";
import StockTrend from "../components/tradingview/StockTrend.js";
import SimpleChart from "../components/tradingview/SimpleChart.js";
import AppHeader from "../components/AppHeader.js";
import {PortfolioContext} from "../components/PortfolioContext.js";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const ChartsPage = () => {
    const navigate = useNavigate();

    if (!Cookies.get('access_token')) {
        navigate('/');
    }

    const { portfolio } = useContext(PortfolioContext);

    useEffect(() => {
        console.log('ChartsPage mounted, portfolio:', portfolio);
    }, []);

    useEffect(() => {
        console.log('Portfolio in ChartsPage updated:', portfolio);
    }, [portfolio]);

    return (
        <>
            <AppHeader />
            <div className="pt-20 px-6 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {portfolio.map((stock) => (
                        <div key={stock.symbol} className="h-[700px] md:h-[800px] w-auto">

                            <div className="h-[350px] w-full">
                                <SimpleChart ticker={stock.symbol}/>
                            </div>

                            <div className="flex flex-row gap-4 h-[calc(100%-350px)]">
                                <div className="w-1/2 flex-grow">
                                    <CompanyProfile ticker={stock.symbol}/>
                                </div>
                                <div className="w-1/2 flex-grow">
                                    <StockTrend ticker={stock.symbol}/>
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


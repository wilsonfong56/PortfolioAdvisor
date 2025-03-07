import React, {useContext, useEffect, useState} from "react";
import GroupedWL from "../components/tradingview/GroupedWL.js";
import {getRecommendations} from "../api/api.js";
import {PortfolioContext} from "../components/PortfolioContext.js";
import AppHeader from "../components/AppHeader.js";


const RecommendationPage = () => {
    const [recStocks, setRecStocks] = useState([])
    const [loading, setLoading] = useState(true);
    const { portfolio } = useContext(PortfolioContext);

    useEffect(() => {
        const symbols = portfolio.map(item => item.symbol)
        getRecommendations(symbols)
            .then((res) => {
                setRecStocks(res.data.recommendations);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
        }, [portfolio]);

    return (
        <>
            <AppHeader/>
            <div className="pt-[100px] max-w-[500px]">
                {loading ? (
                    <p className="text-center text-lg font-semibold">Loading recommendations...</p>
                ) : (
                    <GroupedWL tabs={recStocks} />
                )}
            </div>
        </>
    )
}

export default RecommendationPage;
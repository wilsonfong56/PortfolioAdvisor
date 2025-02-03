import React, {createContext, useEffect, useState} from "react";
import {fetchPortfolio} from "../api/api.js";
import Cookies from "js-cookie";

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
    const [portfolio, setPortfolio] = useState([]);
    const [currentPrices, setCurrentPrices] = useState({});

    useEffect(() => {
        fetchPortfolio(Cookies.get('access_token'))
            .then((res) => {
                setPortfolio(res.data.portfolio)
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <PortfolioContext.Provider value={{ portfolio, setPortfolio, currentPrices, setCurrentPrices }}>
            {children}
        </PortfolioContext.Provider>
    );
};
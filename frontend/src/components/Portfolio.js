import React, { useState, useEffect } from "react";
import { addStock, deleteStock, fetchPortfolio } from "../api/api.js";
import { get_quote } from "../utils.js";
import Cookies from "js-cookie";

const Portfolio = ({ portfolio, setPortfolio, currentPrices, setCurrentPrices }) => {
    const [stock, setStock] = useState({symbol: '', shares: '', price: ''});
    const [totalGainPercentages, setTotalGainPercentages] = useState({});
    const [dailyGainPercentages, setDailyGainPercentages] = useState({});
    const [dailyGains, setDailyGains] = useState({});

    // Fetch portfolio on component mount
    useEffect(() => {
        fetchPortfolio(Cookies.get("email"))
            .then((res) => {
                setPortfolio(res.data.portfolio)
            })
            .catch((err) => console.error(err));
    }, [setPortfolio]);

    useEffect(() => {
        const fetchGains = async () => {
            const newGainPercentages = {};
            const newCurrentPrices = {};
            const newDailyGainPercentages = {}
            const newDailyGains = {}

            for (const stock of portfolio) {
                try {
                    const { price, dailyGain, dailyGainPercentage } = await get_quote(stock.symbol.toUpperCase());
                    const totalGain = (parseFloat(price) - parseFloat(stock.price_bought)) / parseFloat(stock.price_bought);
                    newGainPercentages[stock.symbol.toUpperCase()] = totalGain;
                    newCurrentPrices[stock.symbol.toUpperCase()] = price;
                    newDailyGainPercentages[stock.symbol.toUpperCase()] = dailyGainPercentage;
                    newDailyGains[stock.symbol.toUpperCase()] = dailyGain;
                } catch (error) {
                    console.error(`Error fetching quote for ${stock.symbol.toUpperCase()}:`, error);
                    newGainPercentages[stock.symbol.toUpperCase()] = null;
                    newCurrentPrices[stock.symbol.toUpperCase()] = null;
                }
            }
            setTotalGainPercentages(newGainPercentages);
            setCurrentPrices(newCurrentPrices);
            setDailyGainPercentages(newDailyGainPercentages);
            setDailyGains(newDailyGains)
        };

        fetchGains();
    }, [portfolio, setCurrentPrices]); // Update gain percentages when portfolio changes


    const handleChange = (e) => {
        const {name, value} = e.target;
        setStock({...stock, [name]: value});
    };

    const handleAddStock = (e) => {
        e.preventDefault();
        console.log(stock)
        addStock(stock, Cookies.get("email"))
            .then((response) => setPortfolio(response.data.portfolio))
            .catch((error) => console.log(error));
        setStock({symbol: '', shares: '', price: ''});
    };

    const handleDeleteStock = (symbol) => {
        deleteStock(symbol, Cookies.get("email"))
            .then((response) => setPortfolio(response.data.portfolio))
            .catch((error) => console.log(error));
    };

    const calculateTotal = (stock) => {
        return (parseFloat(stock.shares) * parseFloat(stock.price_bought)).toFixed(2);
    };

    const calculateMarketValue = (stock) => {
        return (parseFloat(stock.shares) * currentPrices[stock.symbol.toUpperCase()]).toFixed(2);
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md mb-8">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold">Add New Stock</h2>
                </div>
                <div className="p-6">
                    <form onSubmit={handleAddStock} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                name="symbol"
                                placeholder="Stock Symbol"
                                value={stock.symbol.toUpperCase()}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                            />
                            <input
                                type="number"
                                name="shares"
                                placeholder="Number of Shares"
                                value={stock.shares}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price per Share"
                                value={stock.price}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                        >
                            Add Stock
                        </button>
                    </form>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold">Your Portfolio</h2>
                </div>
                <div className="p-6">
                    {portfolio.length === 0 ? (
                        <p className="text-center text-gray-500">No stocks in your portfolio yet</p>
                    ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                    <tr className="text-left text-sm text-gray-500">
                                        <th className="pb-4">Symbol</th>
                                        <th className="pb-4">Shares</th>
                                        <th className="pb-4">Cost Avg</th>
                                        <th className="pb-4">Current Price</th>
                                        <th className="pb-4">Daily Change ($)</th>
                                        <th className="pb-4">Daily Change (%)</th>
                                        <th className="pb-4">Total Change (%)</th>
                                        <th className="pb-4">Total Change ($)</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {portfolio.map((stock) => (
                                        <tr key={stock.symbol} className="border-t">
                                            <td className="py-4 font-medium">{stock.symbol}</td>
                                            <td className="py-4">{stock.shares}</td>
                                            <td className="py-4">${stock.price_bought.toFixed(2)}</td>
                                            <td className="py-4">${currentPrices[stock.symbol.toUpperCase()]}</td>
                                            <td className={`py-4 ${dailyGains[stock.symbol.toUpperCase()] > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {dailyGains[stock.symbol.toUpperCase()] > 0 ? '+$' : '-$'}{Math.abs(dailyGains[stock.symbol.toUpperCase()])}
                                            </td>
                                            <td className={`py-4 ${dailyGainPercentages[stock.symbol.toUpperCase()] > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {dailyGainPercentages[stock.symbol.toUpperCase()] > 0 ? '+' : ''}{Number(dailyGainPercentages[stock.symbol.toUpperCase()]).toFixed(2)}%
                                            </td>
                                            <td className={`py-4 ${totalGainPercentages[stock.symbol.toUpperCase()] > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {totalGainPercentages[stock.symbol.toUpperCase()] > 0 ? '+' : ''}{(totalGainPercentages[stock.symbol.toUpperCase()] * 100).toFixed(2)}%
                                            </td>
                                            <td className={`py-4 ${(calculateMarketValue(stock) - calculateTotal(stock)) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {(calculateMarketValue(stock) - calculateTotal(stock)) > 0 ? '+$' : '-$'}{Math.abs(calculateMarketValue(stock) - calculateTotal(stock)).toFixed(2)}
                                            </td>
                                            <td className="py-4">
                                                <button
                                                    onClick={() => handleDeleteStock(stock.symbol.toUpperCase())}
                                                    className="h-8 w-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                                                >
                                                    ×
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default Portfolio;
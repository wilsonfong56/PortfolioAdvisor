import React, { useState, useEffect } from "react";
import { addStock, deleteStock, fetchPortfolio } from "../api";
import { get_quote } from "../utils";

const Portfolio = ({ portfolio, setPortfolio }) => {
    const [stock, setStock] = useState({symbol: '', shares: '', price: ''});
    const [gainPercentages, setGainPercentages] = useState({});
    const [currentPrices, setCurrentPrices] = useState({});

    // Fetch portfolio on component mount
    useEffect(() => {
        fetchPortfolio()
            .then((res) => setPortfolio(res.data.portfolio))
            .catch((err) => console.error(err));
    }, [setPortfolio]);

    useEffect(() => {
        const fetchGains = async () => {
            const newGainPercentages = {};
            const newCurrentPrices = {};
            for (const stock of portfolio) {
                try {
                    const currentPrice = await get_quote(stock.symbol.toUpperCase());
                    const gain = (parseFloat(currentPrice) - parseFloat(stock.price)) / parseFloat(stock.price);
                    newGainPercentages[stock.symbol.toUpperCase()] = gain;
                    newCurrentPrices[stock.symbol.toUpperCase()] = currentPrice;
                } catch (error) {
                    console.error(`Error fetching quote for ${stock.symbol.toUpperCase()}:`, error);
                    newGainPercentages[stock.symbol.toUpperCase()] = null;
                    newCurrentPrices[stock.symbol.toUpperCase()] = null;
                }
            }
            setGainPercentages(newGainPercentages);
            setCurrentPrices(newCurrentPrices);
        };

        fetchGains();
    }, [portfolio]); // Update gain percentages when portfolio changes


    const handleChange = (e) => {
        const { name, value } = e.target;
        setStock({ ...stock, [name]: value });
    };

    const handleAddStock = (e) => {
        e.preventDefault();
        addStock(stock)
            .then((response) => setPortfolio(response.data.portfolio))
            .catch((error) => console.log(error));
        setStock({ symbol: '', shares: '', price: ''});
    };

    const handleDeleteStock = (symbol) => {
        deleteStock(symbol)
            .then((response) => setPortfolio(response.data.portfolio))
            .catch((error) => console.log(error));
    };

    const calculateTotal = (stock) => {
        return (parseFloat(stock.shares) * parseFloat(stock.price)).toFixed(2);
    };

    const calculateMarketValue = (stock) => {
        return (parseFloat(stock.shares) * currentPrices[stock.symbol.toUpperCase()]).toFixed(2);
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
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
                        <div className="space-y-4">
                            {portfolio.map((stock, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                >
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-lg">{stock.symbol.toUpperCase()} - ${currentPrices[stock.symbol.toUpperCase()]}</h3>
                                        <p className="text-sm text-gray-600">
                                            {stock.shares} shares @ ${parseFloat(stock.price).toFixed(2)}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Cost Basis: ${calculateTotal(stock)}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Market Value: ${calculateMarketValue(stock)}
                                        </p>
                                        {gainPercentages[stock.symbol.toUpperCase()] !== null && (
                                            <p className="text-sm font-medium">
                                                Gain (%): {(gainPercentages[stock.symbol.toUpperCase()] * 100).toFixed(2)}% <br />
                                                Gain ($): ${(calculateMarketValue(stock)-calculateTotal(stock)).toFixed(2)}
                                            </p>
                                        )}
                                        {gainPercentages[stock.symbol.toUpperCase()] === null && (
                                            <p className="text-sm text-gray-500">
                                                Gain data unavailable
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleDeleteStock(stock.symbol.toUpperCase())}
                                        className="h-8 w-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
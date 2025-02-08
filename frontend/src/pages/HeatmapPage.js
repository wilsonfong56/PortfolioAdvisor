import TradingViewStockHeatmap from "../components/tradingview/StockHeatmap.js";
import TradingViewCryptoHeatmap from "../components/tradingview/CryptoHeatmap.js";
import AppHeader from "../components/AppHeader.js";

const HeatmapPage = () => {

    return (
        <>
            <AppHeader/>
            <div className="flex flex-col lg:flex-row pt-20 gap-6 max-w-9xl w-full">
                <div className="lg:flex-[1] h-[600px]">
                    <h3 className="text-2xl font-bold text-center text-indigo-600 bg-clip-text">
                        S&P500 Daily Heat Map
                    </h3>
                    <TradingViewStockHeatmap/>
                </div>
                <div className="lg:flex-[1] h-[600px]">
                    <h3 className="text-2xl font-bold text-center text-indigo-600 bg-clip-text">
                        Crypto Daily Heat Map
                    </h3>
                    <TradingViewCryptoHeatmap/>
                </div>
            </div>
        </>
    )
}

export default HeatmapPage;
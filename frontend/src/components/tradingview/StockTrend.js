import { useEffect, useRef } from "react";

const StockTrend = ({ ticker }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
        script.innerHTML = JSON.stringify({
            interval: "1h",
            width: "100%",
            isTransparent: false,
            height: "100%",
            symbol: `${ticker}`,
            showIntervalTabs: true,
            displayMode: "multiple",
            locale: "en",
            colorTheme: "light",
        });

        if (containerRef.current) {
            containerRef.current.appendChild(script);
        }
    }, []);

    return (
        <div className="tradingview-widget-container" ref={containerRef}>
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
                <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                    <span className="blue-text">Track all markets on TradingView</span>
                </a>
            </div>
        </div>
    );
};

export default StockTrend;

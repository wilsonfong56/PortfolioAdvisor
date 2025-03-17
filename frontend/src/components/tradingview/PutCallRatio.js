import { useEffect, useRef } from "react";

const PutCallRatio = ({ symbol }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
        script.innerHTML = JSON.stringify({
            "symbol": symbol,
            "width": "100%",
            "height": "100%",
            "locale": "en",
            "dateRange": "12M",
            "colorTheme": "light",
            "trendLineColor": "rgba(41, 98, 255, 1)",
            "underLineColor": "rgba(41, 98, 255, 0.3)",
            "underLineBottomColor": "rgba(41, 98, 255, 0)",
            "isTransparent": false,
            "autosize": true,
            "largeChartUrl": ""
        });

        if (containerRef.current) {
            containerRef.current.appendChild(script);
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, [symbol]);

    return (
        <div className="h-full">
            <div className="text-lg font-semibold mb-2">{symbol} Put/Call Ratio</div>
            <div className="tradingview-widget-container h-[calc(100%-2rem)]" ref={containerRef}>
                <div className="tradingview-widget-container__widget h-full"></div>
            </div>
        </div>
    );
};

export default PutCallRatio; 
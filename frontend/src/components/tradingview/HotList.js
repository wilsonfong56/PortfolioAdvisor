import React, { useEffect, useRef } from "react";

const HotList = () => {
    const widgetRef = useRef(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
            colorTheme: "light",
            dateRange: "12M",
            exchange: "US",
            showChart: true,
            locale: "en",
            largeChartUrl: "",
            isTransparent: false,
            showSymbolLogo: false,
            showFloatingTooltip: false,
            width: "400",
            height: "550",
            plotLineColorGrowing: "rgba(41, 98, 255, 1)",
            plotLineColorFalling: "rgba(41, 98, 255, 1)",
            gridLineColor: "rgba(240, 243, 250, 0)",
            scaleFontColor: "rgba(19, 23, 34, 1)",
            belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
            belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
            belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
            belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
            symbolActiveColor: "rgba(41, 98, 255, 0.12)",
        });

        if (widgetRef.current) {
            widgetRef.current.appendChild(script);
        }
    }, []);

    return (
        <div className="tradingview-widget-container">
            <div ref={widgetRef} className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
                <a
                    href="https://www.tradingview.com/"
                    rel="noopener nofollow"
                    target="_blank"
                >
                    <span className="blue-text">Track all markets on TradingView</span>
                </a>
            </div>
        </div>
    );
};

export default HotList;

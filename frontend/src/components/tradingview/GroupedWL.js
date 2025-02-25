
import { useEffect, useRef } from "react";

const GroupedWL = ({ title, tabs }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
            title,
            tabs,
            width: "100%",
            height: "100%",
            showChart: true,
            showFloatingTooltip: false,
            locale: "en",
            plotLineColorGrowing: "#2962FF",
            plotLineColorFalling: "#2962FF",
            belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
            belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
            belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
            belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
            gridLineColor: "rgba(240, 243, 250, 0)",
            scaleFontColor: "rgba(120, 123, 134, 1)",
            showSymbolLogo: true,
            symbolActiveColor: "rgba(41, 98, 255, 0.12)",
            colorTheme: "light",
        });

        containerRef.current.appendChild(script);
    }, [title, tabs]); // Re-run when props change

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

export default GroupedWL;

import React, { useEffect, useRef, memo } from "react";

function SimpleChart({ ticker }) {
    const container = useRef(null);

    useEffect(() => {
        // Ensure container exists
        if (!container.current) return;

        // Remove existing scripts to avoid duplicates
        container.current.innerHTML = "";

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
      {
        "symbols": [
          ["${ticker}", "${ticker}|12M"]
        ],
        "chartOnly": false,
        "width": "100%", 
        "height": "100%", 
        "locale": "en",
        "colorTheme": "light",
        "autosize": true,
        "showVolume": true,
        "showMA": true,
        "hideDateRanges": false,
        "hideMarketStatus": false,
        "hideSymbolLogo": false,
        "scalePosition": "right",
        "scaleMode": "Normal",
        "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
        "fontSize": "10",
        "noTimeScale": false,
        "valuesTracking": "3",
        "changeMode": "price-and-percent",
        "chartType": "line",
        "maLineColor": "#2962FF",
        "maLineWidth": 1,
        "maLength": 200,
        "lineType": 0,
        "dateRanges": [
          "1w|60",
          "1m|1D",
          "6m|120",
          "12m|1D",
          "60m|1W"
        ],
        "downColor": "#f7525f",
        "upColor": "#22ab94"
      }
    `;

        container.current.appendChild(script);
    }, []);

    return (
        <div className="tradingview-widget-container" ref={container}>
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
                <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                    <span className="blue-text">Track all markets on TradingView</span>
                </a>
            </div>
        </div>
    );
}

export default memo(SimpleChart);

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const GroupedWL = ({
                                     tabs,
                                     width = "100%",
                                     height = "500px",
                                     colorTheme = "light"
                                 }) => {
    // Generate a unique identifier for this widget instance
    const widgetId = 'tradingview-widget-' + Math.random().toString(36).substring(2, 15);

    const widgetHtml = useMemo(() => {
        const widgetConfig = {
            title: "Stocks",
            tabs: tabs || [
                {
                    title: "Financial",
                    symbols: [
                        { s: "NYSE:JPM", d: "JPMorgan Chase" },
                        { s: "NYSE:WFC", d: "Wells Fargo" }
                    ]
                },
                {
                    title: "Technology",
                    symbols: [
                        { s: "NASDAQ:AAPL", d: "Apple" },
                        { s: "NASDAQ:GOOGL", d: "Alphabet" }
                    ]
                }
            ],
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
            colorTheme
        };

        // Convert the config to a formatted JSON string
        const configString = JSON.stringify(widgetConfig, null, 2);

        return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { margin: 0; padding: 0; height: 100vh; overflow: hidden; }
          .tradingview-widget-container { height: 100%; }
        </style>
      </head>
      <body>
        <div class="tradingview-widget-container">
          <div class="tradingview-widget-container__widget"></div>
          <div class="tradingview-widget-copyright">
            <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
              <span class="blue-text">Track all markets on TradingView</span>
            </a>
          </div>
          <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js" async>
          ${configString}
          </script>
        </div>
      </body>
      </html>
    `;
    }, [tabs, colorTheme]);

    // Encode the HTML content for use in the srcdoc attribute
    const encodedHtml = encodeURIComponent(widgetHtml);
    const srcDoc = decodeURIComponent(encodedHtml);

    return (
        <div style={{ width, height, border: 'none' }}>
            <iframe
                id={widgetId}
                title="TradingView Market Overview Widget"
                srcDoc={srcDoc}
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none'
                }}
                frameBorder="0"
            />
        </div>
    );
};

GroupedWL.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            symbols: PropTypes.arrayOf(
                PropTypes.shape({
                    s: PropTypes.string.isRequired, // Symbol
                    d: PropTypes.string.isRequired  // Description
                })
            ).isRequired
        })
    ),
    title: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    showChart: PropTypes.bool,
    colorTheme: PropTypes.oneOf(['light', 'dark'])
};

export default GroupedWL;
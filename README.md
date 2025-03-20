# MarketMentor

MarketMentor is a comprehensive market analysis and portfolio management platform that provides real-time market insights, sentiment analysis, and portfolio tracking capabilities.

Demo: https://sheltered-beach-97367-47419915dd72.herokuapp.com/

## Features

### Market Health Dashboard
- **Fear & Greed Index**: Visual representation of market sentiment
- **Market Screener**: Real-time market movers and trending stocks
- **Market Breadth Analysis**: Advanced market breadth indicators for major indices:
  - S&P 500 (SPY)
  - Nasdaq 100 (QQQ)
  - Russell 2000 (IWM)
- **Put/Call Ratios**: Options market sentiment indicators with real-time data for:
  - S&P 500 (PCSP)
  - Nasdaq 100 (PCQQ)
  - Russell 2000 (PCIW)

### Portfolio Management
- Track and manage stock positions
- Real-time portfolio valuation
- Support for partial position selling
- Performance analytics

## Technology Stack

### Frontend
- React.js
- TailwindCSS for styling
- TradingView widgets for market data visualization

### Backend
- Python
- RESTful API architecture
- Real-time market data integration

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/MarketMentor.git
cd MarketMentor
```

2. Install frontend dependencies:
```bash
cd Development/frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
pip install -r requirements.txt
```

### Running the Application

1. Start the backend server:
```bash
cd Development/backend
python app.py
```

2. Start the frontend development server:
```bash
cd Development/frontend
npm start
```

## Acknowledgments

- TradingView for providing market data widgets
- CNN Fear & Greed Index for market sentiment data

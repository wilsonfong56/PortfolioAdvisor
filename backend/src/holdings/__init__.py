from flask import Blueprint, request, jsonify
from .helpers import *
import yfinance as yf

holdings_routes = Blueprint('holdings_routes', __name__)

@holdings_routes.route('/getPeers', methods=['GET'])
def getPeers():
    """
    Gets the peers of a list of stocks.

    This endpoint returns a JSON object with the user's stocks as the keys and
    a list of their peers as values.

    Args:
        None

    Returns:
        Example Response (JSON):
            - 200 OK: If getPeers is successful.
                {
                    "peers": {
                        "AAPL": [
                            "DELL",
                            "HPQ",
                            "HPE",
                            "1337.HK",
                            "SMCI",
                            "NTAP",
                            "PSTG",
                            "WDC",
                            "IONQ"
                        ]
                    }
                }

    Raises:
        None
    """
    data = request.json
    symbols = data.get("symbols")
    peers_dict = {}
    for symbol in symbols:
        peers = asyncio.run(helpers.getPeers(symbol))
        peers_dict[symbol] = peers
    return jsonify(peers=peers_dict)

@holdings_routes.route('/getIndustry', methods=['GET'])
def getIndustry():
    """
    Gets the industry of all stocks in user portfolio.

    This endpoint returns a JSON object with the user's stocks as the keys and
    their industry as values.

    Args:
        None

    Returns:
        Example Response (JSON):
            - 200 OK: If getIndustry is successful.
                {
                    "industry": {
                        "AAPL": "Technology",
                        "JPM": "Banking"
                    }
                }

    Raises:
        None
    """
    data = request.json
    symbols = data.get("symbols")
    industry_dict = {}
    for symbol in symbols:
        industry = asyncio.run(helpers.getIndustry(symbol))
        industry_dict[symbol] = industry
    return jsonify(industry=industry_dict)

@holdings_routes.route('/getInsiderTrans', methods=['GET'])
def getInsiderTrans():
    """
    Gets recent insider transactions of all stocks in user portfolio.

    This endpoint returns a JSON object with the user's stocks as the keys and
    a list of dictionaries representing each transaction with the nominal value of the
    transaction, date of transaction, and name of insider.

    Args:
        None

    Returns:
        Example Response (JSON):
            - 200 OK: If getInsiderTransactions is successful.
                {
                    "transactions": {
                        "AAPL": [
                            {
                                "amount": -343146.7516,
                                "date": "2025-02-03",
                                "name": "LEVINSON ARTHUR D"
                            }
                        ],
                        "JPM": [
                            {
                                "amount": -10118868.75,
                                "date": "2025-02-20",
                                "name": "Rohrbaugh Troy L"
                            },
                            {
                                "amount": -1153078.0233,
                                "date": "2025-02-20",
                                "name": "Piepszak Jennifer"
                            }
                        ]
                    }
                }

    Raises:
        None
    """
    data = request.json
    symbols = data.get("symbols")
    trans_dict = {}
    for symbol in symbols:
        transactions = asyncio.run(helpers.getInsiderTransactions(symbol))
        trans_dict[symbol] = transactions
    return jsonify(transactions=trans_dict)

@holdings_routes.route('/getRecommendations', methods=['POST'])
def getRecommendations():
    """
    Gets recommended stocks for all stocks in user portfolio.

    This endpoint returns a JSON array of JSON objects where each object contains
    two elements: "symbols" which contains a JSON array of JSON objects with the name
    of each company and their ticker symbol with exchange name, and "title" which is the
    industry that all the recommended stocks belong to.

    Args:
        None

    Returns:
        Example Response (JSON):
            - 200 OK: If getRecommendations is successful.
                {
                    "recommendations": [
                        {
                            "symbols": [
                                {
                                    "d": "Apple Inc",
                                    "s": "NASDAQ:AAPL"
                                },
                                {
                                    "d": "Dell Technologies Inc",
                                    "s": "NYSE:DELL"
                                },
                                {
                                    "d": "HP Inc",
                                    "s": "NYSE:HPQ"
                                },
                            ],
                            "title": "Technology"
                        },
                        {
                            "symbols": [
                                {
                                    "d": "JPMorgan Chase & Co",
                                    "s": "NYSE:JPM"
                                },
                                {
                                    "d": "Bank of America Corp",
                                    "s": "NYSE:BAC"
                                },
                                {
                                    "d": "Wells Fargo & Co",
                                    "s": "NYSE:WFC"
                                }
                            ],
                            "title": "Banking"
                        }
                    ]
                }

    Raises:
        None
    """
    data = request.json
    symbols = data.get("symbols")
    recommendations = asyncio.run(helpers.getRecommendations(symbols))
    return jsonify(recommendations=recommendations)

# @holdings_routes.route('/news', methods=['GET'])
# def get_stock_news():
#     """
#     Gets the news in the past month of a single stock.
#
#     This endpoint returns a JSON array where each object is a news item.
#
#     Args:
#         None
#
#     Returns:
#         Example Response (JSON):
#             - 200 OK: If getNews is successful.
#                 {
#                     "news": [
#                         {
#                             "category": "company",
#                             "datetime": 1741201200,
#                             "headline": "CDT Insider Sentiment February 2025: Tariff Paralysis",
#                             "id": 133040442,
#                             "image": "https://static.seekingalpha.com/cdn/s3/uploads/getty_images/2189862167/image_2189862167.jpg?io=getty-c-w1536",
#                             "related": "AAPL",
#                             "source": "SeekingAlpha",
#                             "summary": "President Trump promised a radical approach to trade policy during his campaign, and he has delivered.",
#                             "url": "https://finnhub.io/api/news?id=69ff694d689b049731aa118c0b989ab7cde04b689c493e267b2c6c81a2b3bbd8"
#                         },
#                         {
#                             "category": "company",
#                             "datetime": 1741179480,
#                             "headline": "The Global Growth Engine: 2025 And Beyond",
#                             "id": 133016394,
#                             "image": "https://static.seekingalpha.com/cdn/s3/uploads/getty_images/1943639081/image_1943639081.jpg?io=getty-c-w1536",
#                             "related": "AAPL",
#                             "source": "SeekingAlpha",
#                             "summary": "Going into 2025, the PGM remains strong, with the potential for other regions to start closing the gap with the United States. Click to read.",
#                             "url": "https://finnhub.io/api/news?id=a9b384deb1ae51345c2d590cb8c406263c38ddf744b4c758a3ea58e7e0daed9e"
#                         },
#                         {
#                             "category": "company",
#                             "datetime": 1741172087,
#                             "headline": "FTEC: Buy The Tech Correction, NVIDIA Events On Tap (Rating Upgrade)",
#                             "id": 133015645,
#                             "image": "https://static.seekingalpha.com/cdn/s3/uploads/getty_images/185108607/image_185108607.jpg?io=getty-c-w1536",
#                             "related": "AAPL",
#                             "source": "SeekingAlpha",
#                             "summary": "FTEC, with $12.5 billion AUM, has a low expense ratio and focuses on large-cap growth stocks like Apple, NVIDIA, and Microsoft, which are key for its performance. Read more here.",
#                             "url": "https://finnhub.io/api/news?id=61bcc9fd040d2749f9c54f8b37aa13edf7c4eac84f8e3309c6cfe57e245d7229"
#                         },
#                         {
#                             "category": "company",
#                             "datetime": 1741168090,
#                             "headline": "YouTube brings cheaper subscription tier to US with no ads, except for music",
#                             "id": 133015230,
#                             "image": "",
#                             "related": "AAPL",
#                             "source": "Finnhub",
#                             "summary": "Alphabet's YouTube on Wednesday rolled out a $7.99 monthly subscription service that is ad-free for most videos, except music, to create a plan to compete more directly with offerings from Netflix and...",
#                             "url": "https://finnhub.io/api/news?id=37deb11a3ed0994ac71cc73ebee77eb74223f83ad0a70037b6acd94ed1293350"
#                         },
#                         {
#                             "category": "company",
#                             "datetime": 1741165626,
#                             "headline": "Apple reveals M3 Ultra, taking Apple silicon to a new extreme",
#                             "id": 133014966,
#                             "image": "",
#                             "related": "AAPL",
#                             "source": "Finnhub",
#                             "summary": "The new chip delivers up to 2.6x the performance of M1 Ultra, along with Thunderbolt 5 connectivity and support for more than half a terabyte of unified memory — the most ever in a personal...",
#                             "url": "https://finnhub.io/api/news?id=8dd791f5faa464a759ec9c616e782b0f23b1236466c1265ef77fe66cd0fa3eb5"
#                         }
#                     ]
#                 }
#
#     Raises:
#         None
#     """
#     data = request.args
#     symbol = data.get("symbol")
#     news = asyncio.run(getNews(symbol))
#     response = jsonify(news=news)
#     return response

@holdings_routes.route('/news', methods=['GET'])
def get_stock_news():
    data = request.args
    symbol = data.get("symbol")
    news = yf.Ticker(symbol).news
    return jsonify(news=news)
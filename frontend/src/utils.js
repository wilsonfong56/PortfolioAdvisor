import axios from 'axios';

const apiKey = process.env.REACT_APP_FINNHUB_API_KEY;

export const get_quote = async (symbol) => {
    try {
        const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
        const response = await axios.get(url);
        return {
            price: response.data.c,
            dailyGain: response.data.d,
            dailyGainPercentage: response.data.dp,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

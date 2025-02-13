import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:5050',
    credentials: 'omit'
});

export const fetchPortfolio = (token) => API.get('/portfolio', {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }});
export const addStock = (stock, token) => API.post('/portfolio',
    { stock },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
export const deleteStock = (symbol, token) => API.delete('/portfolio', {
    data: { symbol },
    headers: {
        Authorization: `Bearer ${token}`,
    }
});
export const getStockNews = (symbol) => API.get('/news', { params : { symbol: symbol }})
export const handleChat = (payload) => API.post('/query', payload, {
    headers: {
        'Content-Type': 'application/json',
    },
});
export const registerUser = (name, email, password) => API.post('/register', { name, email, password });
export const loginUser = (email, password) => API.post('/login', { email, password });
export const sendFeedback = (feedback) => API.post('/submitFeedback', { feedback });

import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:5050',
    withCredentials: true,
    credentials: 'include'
});

export const fetchPortfolio = (email) => API.get('/portfolio', {
    headers: {
        'Content-Type': 'application/json',
    },
    params: { email: email }});
export const addStock = (stock, email) => API.post('/portfolio', { stock, email });
export const deleteStock = (symbol, email) => API.delete('/portfolio', { params: { symbol, email } });
export const getStockNews = (symbol) => API.get('/news', { params : { symbol: symbol }})
export const handleChat = (payload) => API.post('/query', payload, {
    headers: {
        'Content-Type': 'application/json',
    },
});
export const registerUser = (name, email, password) => API.post('/register', { name, email, password });
export const loginUser = (email, password) => API.post('/login', { email, password })
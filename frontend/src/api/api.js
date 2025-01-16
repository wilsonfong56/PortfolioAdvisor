import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:5000' });

export const fetchPortfolio = () => API.get('/portfolio');
export const addStock = (stock) => API.post('/portfolio', stock);
export const deleteStock = (symbol) => API.delete(`/portfolio/${symbol}`);
export const handleChat = (payload) => API.post(`/query`, payload, {
    headers: {
        'Content-Type': 'application/json',
    },
});
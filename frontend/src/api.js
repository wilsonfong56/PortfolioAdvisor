import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchPortfolio = () => API.get('/portfolio');
export const addStock = (stock) => API.post('/portfolio', stock);
export const deleteStock = (symbol) => API.delete(`/portfolio/${symbol}`);
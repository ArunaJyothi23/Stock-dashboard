import axios from 'axios';

const stock = axios.create({
    baseURL: 'https://finnhub.io/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        'X-Finnhub-Token': process.env.REACT_APP_FINNHUB_API_KEY
    }
});

export default stock;

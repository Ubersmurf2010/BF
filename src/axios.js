import axios from 'axios';

const instance = axios.create({
    //baseURL: "https://bb-gamma-three.vercel.app",
    baseURL: 'http://localhost:4444',
});

//функция посредник, которая при каждом запросе проверяет авторизацию по токену

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});

export default instance;

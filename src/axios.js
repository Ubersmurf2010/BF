import axios from 'axios';

const instance = axios.create({
    baseURL: procces.env.REACT_APP_API_URL,
});

//функция посредник, которая при каждом запросе проверяет авторизацию по токену

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});

export default instance;
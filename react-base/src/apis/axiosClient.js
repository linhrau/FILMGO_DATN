import axios from 'axios';

const axiosClient = axios.create({
    baseUrl: 'http://filmgo.io.vn/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosClient;
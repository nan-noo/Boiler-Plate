import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : '서버주소';
export default axios;
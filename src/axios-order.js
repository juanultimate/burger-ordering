import axios  from 'axios';

const instance = axios.create({
    baseURL : 'https://burger-ordering.firebaseio.com/'
});
export default instance;
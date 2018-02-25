import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burgerapp.firebaseio.com/'
})

export default instance;
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


const instance =axios.create({
    baseURL : "https://kepptrack.herokuapp.com"
});

instance.interceptors.request.use (
    async (config) => {
        const data = await AsyncStorage.getItem('billsplit_user_key');
        if(data) {
            config.headers['X-AUTH-TOKEN'] = data;
            config.headers['source'] = 'android'
        }
        return config;
    },
    (err) => {
       
        return Promise.reject(err);
    }
);

export default instance;
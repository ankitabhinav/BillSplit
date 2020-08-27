import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


const instance =axios.create({
      baseURL : "https://kepptrack.herokuapp.com"
      //baseURL:"https://507c7178c07f.ngrok.io"
});

instance.interceptors.request.use(
    async (config) => {
        const data = await AsyncStorage.getItem('billsplit_user_key');
        if (data) {
            config.headers.Authorization = `Bearer ${data}`
        }
        return config;
    },
    (err) => {

        return Promise.reject(err);
    }
);

export default instance;
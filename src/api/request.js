import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000
})


instance.interceptors.request.use((config)=>{
    return config;
})


instance.interceptors.response.use((response)=>{
    return response
},(err)=>{
    return Promise.reject(err);
})


export default instance;
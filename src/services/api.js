import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://10.0.0.110:8081/api',
    validateStatus: (status) => true,
    headers: {
        'Accept': 'application/json'
    }
});



instance.interceptors.response.use((response) => {
    if(response.status === 200){
        return response
    }
    return Promise.reject(response)

},(reject) =>{
   return Promise.reject(reject)
});


export default instance;
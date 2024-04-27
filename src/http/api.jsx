import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:5000"
})


export const login = async(data)=>{
   return api.post('api/v1/login',data)
}
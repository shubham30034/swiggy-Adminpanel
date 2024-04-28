import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000"
})

export const login = async (data) => {
    try {
        const response = await api.post('api/v1/login', data);
        return response; // Return the response if successful
    } catch (error) {
        // Handle errors here
        throw error; // Re-throw the error to be caught by the caller
    }
}

export const register = async(data)=>{
     
    try{
        const response = await api.post('api/v1/signup',data)
        return response
    }catch(error){
       throw error
    }



}

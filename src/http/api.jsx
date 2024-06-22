import axios from "axios";
import myStore from "@/store";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`
})



export const login = async (data) => {
    try {
        const response = await api.post('api/v1/login', data);
        return response; // Return the response if successful
    } catch (error) {
        // Handle errors here
        throw error // Re-throw the error to be caught by the caller
    }
}

export const register = async(data)=>{
    try {
        const response = await api.post('api/v1/signup', data);
        return response;
    } catch (error) {
        throw error;
    }
}

 export const userDetails = async(token)=>{
    try {
        const response = await api.get('api/v1/getUser',{
            headers: {
                'authorization': `${token}` 
            }
        })
        return response
    } catch (error) {
         throw error
    }
 }


export const getAllRes = async (token) => {

    try {
        const response = await api.get('api/v1/getRes', {
            headers: {
                'authorization': `${token}` 
            }
        });
    
        console.log(response,"response");
        return response;
    } catch (error) {
        throw error;
    }
}


export const createRestaurant = async({ data, token })=>{
    console.log("yha bhi token check kro",token);
    console.log(data,"data hamara wala");

    try {
        const response = await api.post('api/v1/createRes',data,{
            headers: {
                'authorization': `${token}`,
                'Content-Type' : 'multipart/form-data'
            }
        })
        return response
    } catch (error) {
        throw error
    }

}


export const deleteRes = async(id)=>{
    try {
         const response = await api.delete(`api/v1/deleteRes?resId=${id}`)
         return response
    } catch (error) {
        throw error
    }

}


export const updateUser = async({data,token})=>{

    console.log(data,token,"hehehehe");
    try {
        const response = await api.put('api/v1/updateUser',data,{
            headers: {
                'authorization': `${token}`,
                'Content-Type' : 'multipart/form-data'
            }
        })
        return response
    } catch (error)  {
        throw error
        
    }
}
import { create } from 'zustand'
 import {devtools,persist} from "zustand/middleware"

 const store = (set)=>({
    setToken : '',
    addToken : (token)=>{
        set((state)=>({
            setToken : token  
        }))
    }
})


const myStore = create(
     devtools(
       persist(store,{
        name : "token"
       }) 

     )
)

export default myStore
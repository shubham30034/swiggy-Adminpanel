import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import Register from "./pages/RegisterPage";


const router = createBrowserRouter([

    {
        path:'/',
        element:<Homepage/>
    },
    {
        path:'/login',
        element : <Login/>
    },
    {
        path:"/signup",
        element : <Register/>
    }


])

export default router
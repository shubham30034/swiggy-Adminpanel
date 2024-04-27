import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import Register from "./pages/RegisterPage";
import Dashboardlayout from "./layouts/DashboardLayout";
import Dishes from "./pages/Dishes";


const router = createBrowserRouter([

    {
        path:'/',
        element:<Dashboardlayout/>,
        children:[
            {
                path:"home",
                element : <Homepage/>
            },
            {
                element:"dishes",
                element:<Dishes/>
            }
        ]
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
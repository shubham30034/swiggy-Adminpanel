import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import Register from "./pages/RegisterPage";
import Dashboardlayout from "./layouts/DashboardLayout";
import Dishes from "./pages/Dishes";
import AuthLayout from "./layouts/AuthLayout";


const router = createBrowserRouter([

    {
        path:'/dashboard',
        element:<Dashboardlayout/>,
        children:[
            {
                path:"home",
                element : <Homepage/>,
                
            },
            {
                path:"dishes",
                element:<Dishes/>
            }
        ]
    },
    {
     path:"/auth",
     element:<AuthLayout/>,
      children:[
        {
            path:'login',
            element : <Login/>
            
        },
        {
            path:"signup",
            element : <Register/>
        }
    

      ]

    },
   

])

export default router
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import Register from "./pages/RegisterPage";
import Dashboardlayout from "./layouts/DashboardLayout";
import Dishes from "./pages/Dishes";
import AuthLayout from "./layouts/AuthLayout";
import Restaurants from "./pages/Restaurants";
import CreateRestaurants from "./pages/CreateRestaurants";
import UpdateRestaurant from "./pages/UpdateRestaurant";


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
            },
            {
                path : "restaurants",
                element : <Restaurants/>
            },
            {
                path : "create/restaurant",
                element : <CreateRestaurants/>
            },
            {
               path : "update/restaurant",
               element : <UpdateRestaurant/>
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
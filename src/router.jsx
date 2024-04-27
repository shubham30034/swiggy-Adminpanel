import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";


const router = createBrowserRouter([

    {
        path:'/',
        element:<Homepage/>
    },
    {
        path:'/auth',
        element : <Login/>
    }


])

export default router
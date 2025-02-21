import { createBrowserRouter } from "react-router-dom"
import Layout from "../Layout/Layout";
import HomePage from "../Pages/HomePage";
import Dashboard from "../Pages/Dashboard";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <HomePage/>
            },
            {
                path: 'dashboard',
                element: <Dashboard/>
            }
        ]
    }
])

export default router;
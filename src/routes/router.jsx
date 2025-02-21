import { createBrowserRouter } from "react-router-dom"
import Layout from "../Layout/Layout";
import HomePage from "../Pages/HomePage";
import Dashboard from "../Pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AddTask from "../components/AddTask";
import EditTask from "../components/EditTask";

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
                element: <PrivateRoute><Dashboard/></PrivateRoute>
            },
            {
                path: 'addTask',
                element: <PrivateRoute><AddTask/></PrivateRoute>
            },
            {
                path: 'edit/:taskId',
                element: <PrivateRoute><EditTask/></PrivateRoute>
            }
        ]
    }
])

export default router;
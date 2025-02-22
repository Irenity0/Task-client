import { useContext } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <div>Loading...</div>
    }

    if(user && user?.email){
        return children;
    }

    return <Navigate to={'/'} state={{from: location}}/>
}

export default PrivateRoute;
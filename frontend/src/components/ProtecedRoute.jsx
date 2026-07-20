import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ children }) => {
     const {loading, isLoggedIn, user} = useAuth();
console.log(loading);
console.log(isLoggedIn);
console.log(user);
    if(loading) return <h2>Loading......</h2> ;

    if(!isLoggedIn) { return   <Navigate to="/login" replace />;}

    return children;
};

export default ProtectedRoute;
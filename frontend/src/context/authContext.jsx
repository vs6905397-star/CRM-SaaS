import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../services/authApi";
import { Children } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);1
    const [loading, setLoading] = useState(true);

    const checkAuth = async() => {
        try {
            const data = await authApi.getme();

            setUser(data);
        } catch (error) {
            setUser(null);
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    },[]);

    const login = async (email, password) => {
    
            await authApi.login(email, password);

            const data = await authApi.getme();
            setUser(data.user);
    }

    const logout = async () => {
        await authApi.logout();

        setUser(null);
    };

    return (
        <AuthContext.Provider
        value={{
            user,loading,isLoggedIn: !!user, login, logout, checkAuth,
        }}> {children} </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
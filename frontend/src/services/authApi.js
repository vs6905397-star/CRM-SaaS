import api from "./api"

export const Singup = async (userData) => {
    const res = await api.post("/signup", userData);

    return res.data;
}

export const login = async (userData) => {
    const res = await api.post("/login", userData)

    return res.data;
}

export const logout = async () => {
    const res = await api.post("/logout")

    return res.data;
}


export const getme = async () => {
    const res = await api.get("/user/me");

    return res.data;
}

export const updateUser = async (data) => {
    const res = await api.put("/user/update", data);

    return res.data;
}
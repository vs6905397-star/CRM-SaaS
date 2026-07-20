import api from "./api"

export const getCount = async () => {
    const res = await api.get("/deshboard/count");

    return res.data;
}

export const getData = async () => {
    const res = await api.get("/deshboard/data");

    return res.data;
}
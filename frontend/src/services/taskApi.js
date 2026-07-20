import api from "./api"

export const createTask = async (data) =>  {
    const res = await api.post("/task/create", data);

    return res.data;
}

export const deleteTask = async (id) => {
    const res = await api.delete(`/task/${id}`);

    return res.data;
}

export const updateTask = async (id, data) => {
    const res = await api.put(`/task/${id}`, data);

    return res.data;
}

export const getAllTask = async (status, priority) => {
    let url = "/task";
    const params = [];

    if(status && status !== "All"){
        params.push(`status=${status}`);
    }

    if(priority && priority !== "All"){
        params.push(`priority=${priority}`);
    }

    if(params.length > 0){
        url += "?" + params.join("&");
    }

    const res = await api.get(url);

    return res.data;
}

export const getCustomerTask = async (id) => {
    const res = await api.get(`/task/customer/${id}`);

    return res.data;
}
import api from "./api"

export const getCustomers = async (page,search) => {
    const res = await api.get(`/customer?page=${page}&search=${search}`);

    return res.data;
}

export const createCustomer = async (data) => {
    const res = await api.post("/customer/create", data);

    return res.data;
}

export const deleteCustomer = async (id) => {
    const res = await api.delete(`/customer/delete/${id}`)

    return res.data;
}

export const updateCustomer = async (id, data) => {
    const res = await api.put(`/customer/update/${id}`, data);

    return res.data;
}
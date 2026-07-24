import axios from "axios"

const api = axios.create({
    baseURL:"https://crm-saas-w8wq.onrender.com/api",
    withCredentials:true
})

export default api
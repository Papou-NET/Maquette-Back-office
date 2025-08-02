import axios from "axios";

const url = "http://localhost:3000"

const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use(
    (config)=> {
        const token = localStorage.getItem("token")
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error)=> Promise.reject(error)
)


//APPARTEMENTS

export const appartementAPI = {
    getAll: () => api.get('/appartements'),

    getOne: (id) => api.get(`/appartements/${id}`),

    update: (id, data) => api.patch(`/appartements/${id}`, data),

    delete: (id) => api.delete(`/appartements/${id}`),

    search: (lot) => api.get(`/appartements?lot=${lot}`)
}

//CLIENTS
export const ClientsAPI = {
    getAll: () => api.get('/clients'),

    getOne: (id) => api.get(`/clients/${id}`),

    create: (data) => api.post('/clients', data),

    update: (id, data) => api.patch(`/clients/${id}`, data),

    delete: (id) => api.delete(`/clients/${id}`),

    search: (nom) => api.get(`/clients?nom=${nom}`)
}


//RESERVATIONS
export const reservationAPI = {
    getAll: () => api.get('/reservations'),
    
    getOne: (id) => api.get(`/reservations/${id}`),

    create: (data) => api.post('/reservations', data),

    delete: (id) => api.delete(`/reservations/${id}`),

    search: (date) => api.get(`/reservations?dateDébut=${date}`)
}

export const login = async (username, password) => {
    const admin = await axios.get(`${url}/admins?username=${username}&password=${password}`)

    if(admin.data.length !== 0) {
        return {
            admin: admin.data,
            token: "fake-jwt-token-" + Math.random().toString(36).substr(2)
        }
    }
    else {
        throw new Error("admin introuvable")
    }
    
}

export default api;
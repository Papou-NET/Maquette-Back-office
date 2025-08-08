import axios from "axios";

const url = "http://localhost:3001"

const api = axios.create({
    baseURL: "http://localhost:3001",
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


export const login = (credentials) => {
    return api.post('/admin/login', credentials)
}

//APPARTEMENTS

export const appartementAPI = {
    getAll: () => api.get('/appartements'),

    getOne: (id) => api.get(`/appartements/${id}`),

    update: (id, data) => api.patch(`/appartements/${id}`, data),

    delete: (id) => api.delete(`/appartements/${id}`),

    search: (lot) => api.get(`/appartements?lot=${lot}`),

    count: () => api.get('/appartements/count'),

    countByStatus: (status) => api.get(`/appartements/count/${status}`)

}

//CLIENTS
export const ClientsAPI = {
    getAll: () => api.get('/client'),

    getOne: (id) => api.get(`/client/${id}`),

    create: (data) => api.post('/client', data),

    update: (id, data) => api.patch(`/client/${id}`, data),

    delete: (id) => api.delete(`/client/${id}`),

    search: (nom) => api.get(`/client?nom=${nom}`)
}


//RESERVATIONS
export const reservationAPI = {
    getAll: () => api.get('/reservation'),
    
    getOne: (id) => api.get(`/reservation/${id}`),

    create: (data) => api.post('/reservation', data),

    delete: (id) => api.delete(`/reservation/${id}`),

    search: (date) => api.get(`/reservation?dateDébut=${date}`),

    getDateReservation: (id) => api.get(`/reservation/appartement/${id}`),

    getLastFour: () => api.get('/reservation/lastFour')
}

// BATIMENTS

export const batimentAPI = {
    getAll: () => api.get('/immeuble')
}



export default api;
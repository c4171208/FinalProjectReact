import axios from "axios";

let url = "http://localhost:5000/api/watch"

export const getAllWatch = (page, search) => {
    return axios.get(`${url}?page=${page}&search=${search}`)
}

export const getWatchesByCategory = (category, page) => {
    return axios.get(`${url}/catagory/${category}?page=${page}`)
}

export const getWatchById = (id) => {
    return axios.get(`${url}/${id}`)
}



export const upDateWatchByID = (watch, id, token) => {
    return axios.put(`${url}/${id}`, watch, {
        headers: {
            "my-token": token,
        }
    })
}
export const addWatch = (watch, token) => {
    return axios.post(url, watch, {
        headers: {
            "my-token": token,
        }
    })
}
export const deleteWatchById = (id, token) => {
    return axios.delete(`${url}/${id}`, {
        headers: {
            "my-token": token,
        },
    })
}



export const getNumWatcha = () => {
    return axios.get(`${url}/qutiy`)
}
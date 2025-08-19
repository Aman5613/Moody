import axios from "axios"

export const getSongs = axios.create({
    baseURL : "http://localhost:3000"
})


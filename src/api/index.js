import axios from "axios";
const defaultConfig ={
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    },
    baseURL: 'http://localhost:3000'
}
export const DefaultApiInstance = axios.create(defaultConfig)

import axios from "axios";
const defaultConfig ={
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    },
    baseURL: 'https://swyod-ejournal--3cc0.twc1.net/'
}
export const DefaultApiInstance = axios.create(defaultConfig)

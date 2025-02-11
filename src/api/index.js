import axios from "axios";
const defaultConfig ={
    headers:{
        'Content-Type': 'application/json'
    }
}
export const DefaultApiInstance = axios.create(defaultConfig)
export const config =
    {

        backendIP :'http://localhost:3000'
    }
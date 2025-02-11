import {config, DefaultApiInstance} from "@/api/index.js";

export const StudentsApi = {
    async getStudents(){
        const res = await DefaultApiInstance.get(`${config.backendIP}/students`)
        return res.data
    }
}
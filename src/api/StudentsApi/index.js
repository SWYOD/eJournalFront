import {DefaultApiInstance} from "@/api/index.js";

export const StudentsApi = {
    async getStudents(){
        const res = await DefaultApiInstance.get(`/students`)
        return res.data
    }
}
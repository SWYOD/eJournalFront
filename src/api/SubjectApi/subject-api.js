import {DefaultApiInstance} from "@/api/index.js";


export const fetchSubjects = async () => {
    try {
        const response = await DefaultApiInstance.get('/subjects');
        return response.data;
    } catch (error) {
        console.error('Error fetching subjects:', error);
        throw error;
    }
};

export const createSubject = async (subjectData) => {
    try {
        const response = await DefaultApiInstance.post('/subjects', subjectData);
        return response.data;
    } catch (error) {
        console.error('Error creating subject:', error);
        throw error;
    }
};

export const getSubjectById = async (id) => {
    try {
        const response = await DefaultApiInstance.get(`/subjects/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching subject with ID ${id}:`, error);
        throw error;
    }
};

export const updateSubject = async (id, subjectData) => {
    try {
        const response = await DefaultApiInstance.patch(`/subjects/${id}`, subjectData);
        return response.data;
    } catch (error) {
        console.error(`Error updating subject with ID ${id}:`, error);
        throw error;
    }
};

export const deleteSubject = async (id) => {
    try {
        const response = await DefaultApiInstance.delete(`/subjects/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting subject with ID ${id}:`, error);
        throw error;
    }
};

export default {
    fetchSubjects,
    createSubject,
    getSubjectById,
    updateSubject,
    deleteSubject
};
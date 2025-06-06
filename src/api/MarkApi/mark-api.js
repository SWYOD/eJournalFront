import { DefaultApiInstance } from "@/api/index.js";

// Получение средней оценки группы
export const fetchGroupAverageMarks = async (groupId, period, date) => {
    try {
        const response = await DefaultApiInstance.get(`/marks/group/${groupId}/average`, {
            params: { period, startDate: date.toISOString() }
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении средней оценки группы:", error);
        throw error;
    }
};
// Получение всех оценок группы (новый метод)
export const fetchGroupMarks = async (groupId) => {
    try {
        const response = await DefaultApiInstance.get(`/marks/group/${groupId}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении оценок группы:", error);
        throw error;
    }
};

// Получение оценок студента
export const fetchStudentMarks = async (studentId) => {
    try {
        const response = await DefaultApiInstance.get(`/marks/student/${studentId}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении оценок студента:", error);
        throw error;
    }
};

// Получение оценок по предмету
export const fetchSubjectMarks = async (subjectId) => {
    try {
        const response = await DefaultApiInstance.get(`/marks/subject/${subjectId}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении оценок по предмету:", error);
        throw error;
    }
};

// Создание оценки
export const createMark = async (data) => {
    try {
        const response = await DefaultApiInstance.post('/marks', data);
        return response.data;
    } catch (error) {
        console.error("Ошибка при создании оценки:", error);
        throw error;
    }
};

// Обновление оценки
export const updateMark = async (id, value) => {
    try {
        const response = await DefaultApiInstance.patch(`/marks/${id}`, { value });
        return response.data;
    } catch (error) {
        console.error("Ошибка при обновлении оценки:", error);
        throw error;
    }
};

// Удаление оценки
export const deleteMark = async (id) => {
    try {
        const response = await DefaultApiInstance.delete(`/marks/${id}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при удалении оценки:", error);
        throw error;
    }
};
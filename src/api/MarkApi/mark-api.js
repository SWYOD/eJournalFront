// api/MarkApi/mark-api.js

import {DefaultApiInstance} from "@/api/index.js";

export default {
    /**
     * Создать новую оценку
     * @param {Object} dto - Данные для создания оценки
     * @param {number} dto.studentId - ID студента
     * @param {number} dto.subjectId - ID предмета
     * @param {number} dto.value - Значение оценки (1-5)
     * @returns {Promise} - Промис с созданной оценкой
     */
    async createMark(dto) {
        try {
            const response = await DefaultApiInstance.post(`/marks`, dto);
            return response.data;
        } catch (error) {
            console.error('Error creating mark:', error);
            throw error;
        }
    },

    /**
     * Обновить оценку
     * @param {number} id - ID оценки
     * @param {Object} dto - Данные для обновления
     * @param {number} [dto.value] - Новое значение оценки (1-5)
     * @returns {Promise} - Промис с обновленной оценкой
     */
    async updateMark(id, dto) {
        try {
            const response = await DefaultApiInstance.patch(`/marks/${id}`, dto);
            return response.data;
        } catch (error) {
            console.error('Error updating mark:', error);
            throw error;
        }
    },

    /**
     * Удалить оценку
     * @param {number} id - ID оценки
     * @returns {Promise}
     */
    async deleteMark(id) {
        try {
            await DefaultApiInstance.delete(`}/marks/${id}`);
        } catch (error) {
            console.error('Error deleting mark:', error);
            throw error;
        }
    },

    /**
     * Получить оценки студента
     * @param {number} studentId - ID студента
     * @returns {Promise} - Промис с данными оценок студента
     */
    async getMarksByStudent(studentId) {
        try {
            const response = await DefaultApiInstance.get(`/marks/student/${studentId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching student marks:', error);
            throw error;
        }
    },

    /**
     * Получить оценки группы
     * @param {number} groupId - ID группы
     * @returns {Promise} - Промис с данными оценок группы
     */
    async getMarksByGroup(groupId) {
        try {
            const response = await DefaultApiInstance.get(`/marks/group/${groupId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching group marks:', error);
            throw error;
        }
    },

    /**
     * Получить оценки за период
     * @param {Object} params - Параметры запроса
     * @param {string} params.startDate - Начальная дата (ISO строка)
     * @param {string} params.endDate - Конечная дата (ISO строка)
     * @param {number[]} [params.groupIds] - Фильтр по ID групп
     * @param {number[]} [params.subjectIds] - Фильтр по ID предметов
     * @returns {Promise} - Промис с данными оценок за период
     */
    async getMarksByPeriod(params) {
        try {
            // Преобразуем массивы в строки для корректной передачи в URL
            const queryParams = {
                startDate: params.startDate,
                endDate: params.endDate
            };

            if (params.groupIds && params.groupIds.length) {
                queryParams.groupIds = params.groupIds.join(',');
            }

            if (params.subjectIds && params.subjectIds.length) {
                queryParams.subjectIds = params.subjectIds.join(',');
            }

            const response = await DefaultApiInstance.get(`/marks/period`, {
                params: queryParams,
                paramsSerializer: params => {
                    return Object.entries(params)
                        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                        .join('&');
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching marks by period:', error);
            throw error;
        }
    }
};
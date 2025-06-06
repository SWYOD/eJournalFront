import { DefaultApiInstance } from '@/api/index.js';

export const fetchGroups = () => {
    return DefaultApiInstance.get('/groups');
};

export const fetchGroupById = (id) => {
    return DefaultApiInstance.get(`/groups/${id}`);
};

export const createGroup = (groupData) => {
    return DefaultApiInstance.post('/groups', groupData);
};

export const updateGroup = (id, updateData) => {
    return DefaultApiInstance.patch(`/groups/${id}`, updateData);
};

export const deleteGroup = (id) => {
    return DefaultApiInstance.delete(`/groups/${id}`);
};

export const fetchGroupStudents = (groupId) => {
    return DefaultApiInstance.get(`/groups/${groupId}/students`);
};

export const fetchGroupSubjects = (groupId) => {
    return DefaultApiInstance.get(`/groups/${groupId}/subjects`);
};
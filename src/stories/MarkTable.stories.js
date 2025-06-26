// src/stories/MyComponent.stories.js

import JournalPageMarksTable from "@/components/TeacherAgent/JournalPage/JournalPageMarksTable.vue";

export default {
    title: 'MarkTable',
    component: JournalPageMarksTable,
    // Добавляем секцию argTypes для Controls
    argTypes: {
        // Примеры пропсов (замените на актуальные для вашего компонента)
        selectedGroup: {control: 'object'},
        selectedSubject: {control: 'object'},
        selectedStudent: {control: 'object'},
        students: {control: 'array'},
        // Добавьте другие пропсы вашего компонента
    }
}

const Template = (args) => ({
    components: { JournalPageMarksTable },
    setup() {
        return { args };
    },
    template: '<JournalPageMarksTable v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
    selectedGroup: 2,
    selectedSubject: 1,
    selectedStudent: 2,
    students: [],
};
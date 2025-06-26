// src/stories/MyComponent.stories.js


import Cell from "@/components/TeacherAgent/JournalPage/Cell.vue";
import HeaderCell from "@/components/TeacherAgent/JournalPage/HeaderCell.vue";

export default {
    title: 'Cell',
    component: Cell,
}

export const Default = () => ({
    components: { Cell },
    template: '<Cell/>',
})

export const Header = () => ({
    components: { HeaderCell },
    template: '<header-cell/>'
})
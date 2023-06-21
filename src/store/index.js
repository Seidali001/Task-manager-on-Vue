import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        tasks: [], // Массив задач
    },
    mutations: {
        setTasks(state, tasks) {
            if (Array.isArray(tasks)) {
                state.tasks = tasks;
            }
        },
        addTask(state, task) {
            state.tasks.push(task);
        },
        updateTask(state, { taskId, updatedTask }) {
            const taskIndex = state.tasks.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                state.tasks.splice(taskIndex, 1, updatedTask);
            }
        },
        deleteTask(state, taskId) {
            state.tasks = state.tasks.filter(task => task.id !== taskId);
        },
    },
   
});

export default store;

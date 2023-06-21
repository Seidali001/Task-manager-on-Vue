import Vue from 'vue';
import VueRouter from 'vue-router';
import TaskList from '@/views/TaskList.vue';
import CreateTask from '@/views/CreateTask.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/tasks',
    name: 'TaskList',
    component: TaskList,
  },
  {
    path: '/tasks/create',
    name: 'CreateTask',
    component: CreateTask,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;

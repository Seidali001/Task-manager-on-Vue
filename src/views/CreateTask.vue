<template>
  <div>
    <h2>Создать задачу</h2>
        <form @submit.prevent="createTask">
      <input type="text" v-model="newTaskTitle" placeholder="Введите название задачи">
      <button type="submit">Создать</button>
    </form>
  </div>
</template>

<script>
export default {
  created() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.$store.commit('setTasks', JSON.parse(savedTasks));
    }
  },
  computed: {
    tasks: {
      get() {
        return this.$store.state.tasks;
      },
      set(value) {
        this.$store.commit('setTasks', value);
      }
    }
  },
  data() {
    return {
      newTaskTitle: '',
      editingTaskId: null,
      editedTaskTitle: '',
    };
  },
  mounted() {
    window.addEventListener('beforeunload', this.handleBeforeUnload);
    this.saveTasksToLocalStorage();
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
    this.saveTasksToLocalStorage();
  },

  methods: {
    handleBeforeUnload(event) {
      this.saveTasksToLocalStorage();
      event.preventDefault();
      event.returnValue = '';
    },
    saveTasksToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.$store.state.tasks));
    },
    createTask() {
      const newTask = {
        id: Date.now(),
        title: this.newTaskTitle,
        completed: false,
      };
      this.$store.commit('addTask', newTask);
      this.newTaskTitle = '';
      this.tasks = this.$store.state.tasks;
      this.saveTasksToLocalStorage();
    },
    editTask(task) {
      this.editingTaskId = task.id;
      this.editedTaskTitle = task.title;
      this.tasks = this.$store.state.tasks;
      this.saveTasksToLocalStorage();
    },
    saveTaskEdit(task) {
      task.title = this.editedTaskTitle;
      this.editingTaskId = null;
      this.tasks = this.$store.state.tasks;
      this.saveTasksToLocalStorage();
    },
    deleteTask(taskId) {
      this.$store.commit('deleteTask', taskId);
      this.tasks = this.$store.state.tasks;
      this.saveTasksToLocalStorage();
    },
  },
};
</script>

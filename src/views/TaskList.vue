<template>
  <div>
    <h1>Список задач</h1>
    <h2>Задачи:</h2>
    <div class="tasks">
      <ul>
        <li class="task" v-for="task in tasks" :key="task.id">
          <template v-if="editingTaskId !== task.id">
            <input type="checkbox" v-model="task.completed">
            <span :class="{ 'completed': task.completed }" @dblclick="startEditingTask(task)">{{ task.title }}</span>
            <button style="background-color: pink; border-radius: 15px" @click="deleteTask(task.id)">x</button>
          </template>
          <template v-else>
            <input type="checkbox" v-model="task.completed">
            <input type="text" v-model="editedTaskTitle" @blur="saveTaskEdit(task)" @keyup.enter="saveTaskEdit(task)">
            <button style="background-color: yellow; border-radius: 15px" @click="saveTaskEdit(task)">Сохранить</button>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.tasks{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.task {
  display: flex;
  justify-content: flex-start;
}
</style>

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
    editTask(task) {
      this.editingTaskId = task.id;
      this.editedTaskTitle = task.title;
      this.tasks = this.$store.state.tasks;
      this.saveTasksToLocalStorage();
    },
    startEditingTask(task) {
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


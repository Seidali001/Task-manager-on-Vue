<template>
  <div id="app">
    <div id="navbar">
      <div id="dropdown">
        <button id="dropBtn">
          Главная страница
          <i id="fa fa-caret-down"></i>
        </button>
        <div id="dropdown-content">
          <div class="itemPosition">
            <router-link to="/tasks/create">Создание задачи</router-link>
          </div>
          <div class="itemPosition">
            <router-link to="/tasks">Перейти к списку задач</router-link>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>

  </div>
</template>

<style>
#app {
  text-align: center;
  margin-top: 2rem;
}

#navbar {
  align-items: center;
  overflow: hidden;
  background-color: #333;
}

#dropdown {
  float: left;
  overflow: hidden;
}

#dropdown #dropBtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

#dropdown:hover #dropBtn {
  background-color: red;
}

#dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 14px 16px;
}
.itemPosition {
  padding: 14px 16px;
}

#dropdown:hover #dropdown-content {
  display: block;
}
</style>

<script>
export default {
  name: 'App',
}
</script>
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: {
      userName: '',
      userId: null,
    },
    isAuthenticated: false,
    todoList: [],
    userList: [],
  },
  getters: {
    loginUser: (state) => state.loginUser,
    isAuthenticated: (state) => state.isAuthenticated,
    todoList: (state) => state.todoList,
    todoLength: (state) => state.todoList.length,
    completedTodos: (state) => state.todoList.filter((todo) => todo.isCompleted),
    completedTodosLength: (_, getters) => getters.completedTodos.length,
  },
  mutations: {
    updateLoginUser(state, user) {
      state.loginUser = user;
    },
    resetLoginUser(state) {
      state.loginUser = {
        userName: '',
        userId: null,
      };
    },
    updateIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    updateTodoList(state, todoList) {
      state.todoList = todoList;
    },
    getUserList(state, payload) {
      state.userList = payload;
    },
  },
  actions: {
    async updateLoginUser({ commit }, param) {
      const res = await axios
        .post(`${BASE_URL}/login`, param)
        .then((resp) => resp)
        .catch((err) => err.response);

      if (res.status === 200) {
        commit('updateLoginUser', res.data);
        commit('updateIsAuthenticated', true);
      } else {
        commit('resetLoginUser');
        commit('updateIsAuthenticated', false);
      }
    },
    async logout({ commit }) {
      await axios.post(`${BASE_URL}/logout`);
      commit('resetLoginUser');
      commit('updateIsAuthenticated', false);
    },
    async checkAuthenticated({ commit }) {
      const res = await axios
        .get(`${BASE_URL}/user`)
        .then((resp) => resp)
        .catch((err) => err.response);

      if (res.status === 200) {
        commit('updateLoginUser', res.data.user);
        commit('updateIsAuthenticated', true);
      } else {
        commit('resetLoginUser');
        commit('updateIsAuthenticated', false);
      }
    },
    async getUserList({ commit }) {
      const res = await axios
        .get(`${BASE_URL}/user/all`)
        .then((resp) => resp)
        .catch((err) => err.response);
      if (res.status === 200) {
        commit('getUserList', res.data);
      }
    },
    updateTodoList({ commit }) {
      return new Promise(() => {
        axios
          .get(`${BASE_URL}/todo`)
          .then((res) => {
            commit('updateTodoList', res.data);
          });
      });
    },
    async updateTodo({ dispatch }, todo) {
      await axios.put(`${BASE_URL}/todo/${todo.id}`, todo);
      dispatch('updateTodoList');
    },
    async addTodo({ dispatch }, todo) {
      await axios
        .post(`${BASE_URL}/todo`, todo);
      dispatch('updateTodoList');
    },
    async deleteTodo({ dispatch }, id) {
      await axios
        .delete(`${BASE_URL}/todo/${id}`);
      dispatch('updateTodoList');
    },
  },
});

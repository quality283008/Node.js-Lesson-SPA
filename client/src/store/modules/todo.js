import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export default {
  namespaced: true,
  state: {
    todoList: [],
  },
  getters: {
    todoList: (state) => state.todoList,
    todoLength: (state) => state.todoList.length,
    completedTodos: (state) => state.todoList.filter((todo) => todo.isCompleted),
    completedTodosLength: (_, getters) => getters.completedTodos.length,
  },
  mutations: {
    updateTodoList(state, todoList) {
      state.todoList = todoList;
    },
  },
  actions: {
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
};

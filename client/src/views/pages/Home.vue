<template>
  <div>
    <my-navi />
    <template>
      <my-add-todo-form 
        @addTodoList="addTodoList"
      />
    </template>
    <template>
      <div class="list-status">
        <p>総件数: {{ todoLength }} </p>
        <p>完了済み: {{ completedTodosLength }}</p>
      </div>
    </template>
    <template>
      <ul class="list">
        <my-todo-detail
          v-for="todo in todoList"
          :key="todo.id"
          :todo="todo"
          @update-completed="updateTodo(todo)"
          @update-todo="updateTodo(todo)"
          @deleteTodo="deleteTodo(todo)"
        />
      </ul>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import MyNavi from '@/components/Navi.vue';
import MyAddTodoForm from '@/components/AddTodoForm.vue';
import MyTodoDetail from '@/components/TodoDetail.vue';

export default {
  components: {
    MyNavi,
    MyAddTodoForm,
    MyTodoDetail,
  },
  created() {
    this.getTodoList();
  },
  methods: {
    ...mapActions([
      'updateTodo',
    ]),
    ...mapActions({
      getTodoList: 'updateTodoList',
    }),
    addTodoList(todo) {
      this.$store.dispatch('addTodo', todo);
    },
    deleteTodo(todo) {
      this.$store.dispatch('deleteTodo', todo.id);
    },
  },
  computed: {
    ...mapGetters([
      'todoList',
      'todoLength',
      'completedTodosLength',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.list {
  list-style: none;
  padding: initial;
}
</style>

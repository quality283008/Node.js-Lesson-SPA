<template>
  <div>
    <my-navi />
    <ul class="list">
      <user-list
        v-for="list in userList"
        :key="list.id"
        :userList="list"
      />
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import MyNavi from '@/components/Navi.vue';
import UserList from '@/components/UserList.vue';

export default {
  components: {
    MyNavi,
    UserList,
  },
  created() {
    this.getUserList();
  },
  methods: {
    ...mapActions([
      'getUserList',
    ]),
  },
  computed: {
    ...mapState([
      'userList',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.list {
  list-style: none;
}
</style>

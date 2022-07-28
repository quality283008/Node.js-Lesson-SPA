<template>
  <my-login-form 
    @login="login"
  />
</template>

<script>
import MyLoginForm from '@/components/LoginForm.vue';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    MyLoginForm,
  },
  computed: {
    ...mapState([
      'isAuthenticated',
    ]),
  },
  methods: {
    ...mapActions([
      'updateLoginUser',
    ]),
    login(param) {
      this.updateLoginUser(param);
    },
  },
  watch: {
    isAuthenticated() {
      if (this.isAuthenticated) {
        this.$router.push({ name: 'home' });
      }
    },
  },
};
</script>

<template>
  <form class="login-form" @submit.prevent="login">
    <div class="row">
      <label>
        username:
        <input type="text" v-model="user.username">
      </label>
    </div>
    <div class="row">
      <label>
        password:
        <input type="password" v-model="user.password">
      </label>
    </div>
    <div class="row">
      <input type="submit" value="Login">
    </div>
  </form>
</template>

<script>

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const param = {
        username: this.user.username,
        password: this.user.password,
      };
      this.$emit('login', param);
    },
  },
};
</script>


<style lang="scss" scoped>
.login-form {
  .row {
    & + .row {
      margin-top: 10px;
    }
  }

  input {
    display: inline-block;
  }
}
</style>

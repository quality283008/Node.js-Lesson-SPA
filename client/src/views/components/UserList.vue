<template>
  <li>
    <span>ID: {{ userList.id }} </span>
    <span>ユーザー名: {{ userList.username }} </span>
  </li>

</template>

<script>
export default {
  props: {
    userList: {
      type: Object,
      default: () => ({}),
    },
  }
};
</script>

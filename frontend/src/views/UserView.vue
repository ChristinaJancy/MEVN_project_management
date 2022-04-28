<template>
  <div v-for="user in user" :key="user._id">
    Email:
    <h4>{{ user.email }}</h4>
  </div>
</template>

<script lang="ts">
import userCrud from "../modules/userCrud";

export default {
  setup() {
    const { state, user, userId, getSpecificUser } = userCrud();
    getSpecificUser();

    return { state, user, userId };
  },
};
</script>
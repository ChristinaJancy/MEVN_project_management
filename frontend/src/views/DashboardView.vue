<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Dashboard</h3>

    <div class="mt-8"></div>
    <h4 class="text-1xl font-bold text-gray-700">All users</h4>
    <!-- All users table -->
    <UsersTable />
  </div>
</template>

<script lang="ts">
import UsersTable from "../components/UsersTable.vue";
export default {
  components: {
    UsersTable,
  },
};
</script>
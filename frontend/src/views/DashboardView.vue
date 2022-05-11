<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Dashboard</h3>
    <div class="mt-8"></div>
    <h4 class="text-1xl font-bold text-gray-700">All users</h4>
    <!-- All users table -->
    <Suspense>
      <template #default>
        <UsersTable />
      </template>
      <template #fallback>
        <LoadingTable />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import UsersTable from "../components/UsersTable.vue";
import LoadingTable from "../components/LoadingTable.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    UsersTable,
    LoadingTable,
  },

  setup() {
    return {};
  },
});
</script>
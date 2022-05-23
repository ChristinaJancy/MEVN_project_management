<template>
  <div>
    <h3 class="text-3xl text-gray-700">All tags</h3>
    <div class="mt-8"></div>

    <!-- All users table -->
    <Suspense>
      <template #default>
        <TagsTable />
      </template>
      <template #fallback>
        <LoadingTable />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import TagsTable from '../components/TagsTable.vue';
import LoadingTable from '../components/animations/LoadingTable.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    TagsTable,
    LoadingTable,
  },

  setup() {
    return {};
  },
});
</script>

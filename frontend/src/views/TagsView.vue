<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Tags</h3>
    <div class="mt-8"></div>
    <h4 class="text-1xl font-bold text-gray-700">All tags</h4>

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
import LoadingTable from '../components/LoadingTable.vue';
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

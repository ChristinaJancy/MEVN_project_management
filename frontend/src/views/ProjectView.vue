<template>
  <div>
    <Suspense>
      <template #default>
        <DraggableProject />
      </template>
      <template #fallback>
        Loading... 
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import DraggableProject from '../components/DraggableProject.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'project',
  components: {
    DraggableProject,
  },
});
</script>

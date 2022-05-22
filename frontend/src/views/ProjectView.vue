<template>
  <div>
    <Suspense>
      <template #default>
        <DraggableProject />
      </template>
      <template #fallback>
        <LoadingCenter />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import DraggableProject from '../components/DraggableProject.vue';
import LoadingCenter from '../components/animations/LoadingCenter.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'project',
  components: {
    DraggableProject,
    LoadingCenter,
  },
});
</script>

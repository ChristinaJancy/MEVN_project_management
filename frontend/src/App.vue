<template>
  <Suspense>
    <template #default>
      <component :is="layout">
        <router-view />
      </component>
    </template>
    <template #fallback></template>
  </Suspense>
</template>

<script async setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const defaultLayout = 'default';
const { currentRoute } = useRouter();
const layout = computed(
  () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
);
</script>

<!--vue multiselect styling https://github.com/shentao/vue-multiselect/tree/next-->
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

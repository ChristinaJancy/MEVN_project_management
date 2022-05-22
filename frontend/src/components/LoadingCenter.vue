<template>
  <Loading style="display: block; margin-left: auto; margin-right: auto; margin-top:20vh;" />
</template>

<script lang="ts">
import Loading from './Loading.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    Loading,
  },
  setup() {
    return {};
  },
});
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

const defaultLayout = "default";
const { currentRoute } = useRouter();
const layout = computed(
  () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
);
</script>



<!-- <template>
  <div id="app">
    <TopNav />
    <div id="main">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import TopNav from "./components/TopNav.vue";

export default {
  components: {
    TopNav,
  },
};
</script>

<style>
#main {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
-->
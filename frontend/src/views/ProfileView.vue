<template>
  <Suspense>
    <template #default>
      <ProfileCard />
    </template>
    <template #fallback> 
      <LoadingCenter/>
    </template>
  </Suspense>
</template>
<!-- <LoadingTable /> -->
<script lang="ts">
import { defineComponent } from 'vue';
import ProfileCard from '../components/ProfileCard.vue';
import LoadingCenter from '../components/LoadingCenter.vue';

export default defineComponent({
  components: {
    ProfileCard,
    LoadingCenter
  },
});
</script>

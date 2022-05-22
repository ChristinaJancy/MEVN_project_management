<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Dashboard</h3>
    <div class="mt-8 flex flex-wrap space-y-10 md:space-y-0 md:space-x-5">
      <DashboardUserProjects />
      <DashboardUserTasks />
    </div>
   
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DashboardUserTasks from "../components/DashboardUserTasks.vue";
import DashboardUserProjects from "../components/DashboardUserProjects.vue";
export default defineComponent({
  components:{
    DashboardUserTasks,
    DashboardUserProjects
  },
  
})


</script>
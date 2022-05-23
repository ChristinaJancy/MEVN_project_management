<template>
  <h5 class="m-1 text-1xl text-gray-700">Your tasks</h5>
  <div class="max-h-96 overflow-y-scroll space-y-3 w-full">
    <div
      v-for="(task, index) in taskState.userTasks"
      :key="index"
      class="bg-white rounded max-w-full shadow-sm p-4 mr-2 space-y-2"
    >
      <router-link
        :to="{ name: 'project', params: { id: taskState.projectIds[index] } }"
      >
        <p class="font-medium text-md">{{ task.title }}</p>
        <!-- <p class="font-bold text-md">Description:</p> -->
        <p class="font-light text-sm mb-1">{{ task.description }}</p>
        <p class="italic font-normal text-sm mb-1">
          Deadline: {{ moment(task.deadline).startOf('hour').fromNow() }}
        </p>
        <div
          class="font-bold text-sm inline-flex"
          v-for="(user, index) in task.assigned"
          :key="user"
        >
          <p class="text-sm">{{ user.name }}</p>
          <div v-if="index < task.assigned.length - 1">, &nbsp;</div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import taskCrud from '../modules/taskCrud';
import moment from 'moment';
import { defineComponent } from 'vue';

export default defineComponent({
  async setup() {
    const { taskState, getTasksFromUser } = taskCrud();

    await getTasksFromUser();
    return {
      moment,
      taskState,
    };
  },
});
</script>

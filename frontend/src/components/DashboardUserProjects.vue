<template>
  <h5 class="m-1 text-1xl font-bold text-gray-700">Your projects</h5>
  <div class="max-h-96 overflow-y-scroll space-y-3 w-full">
    <div
      v-for="project in projectState.userProjects"
      :key="project._id"
      class="bg-white rounded max-w-full shadow-sm p-4 mr-2 space-y-2"
    >
      <router-link :to="{ name: 'project', params: { id: project._id } }">
        <p class="font-medium text-xl">{{ project.title }}</p>
        <p class="font-light">{{ project.description }}</p>
        <p class="italic font-normal">
          Deadline: {{ moment(project.deadline).startOf('hour').fromNow() }}
        </p>
        <div class="flex w-full justify-end flex-wrap">
          <div
            v-for="tag in project.tags"
            :key="tag"
            style="
              display: flex;
              justify-content: space-between;
              flex-direction: row-reverse;
              align-items: flex-end;
            "
          >
            <p
              class="text-sm font-medium px-2 mt-1 mr-2 py-0.5 rounded-full"
              :style="{ background: tag.color }"
            >
              <span
                :style="{
                  color: 'white',
                  'mix-blend-mode': 'color-dodge',
                }"
              >
                {{ tag.title }}
              </span>
            </p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import projectCrud from '../modules/projectCrud';
import moment from 'moment';
import { defineComponent } from 'vue';

export default defineComponent({
  async setup() {
    const { projectState, getProjectsFromUser } = projectCrud();

    await getProjectsFromUser();
    return {
      moment,
      projectState,
    };
  },
});
</script>

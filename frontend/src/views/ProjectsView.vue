<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Your projects</h3>
    <div class="flex flex-col">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="
            inline-block
            min-w-full
            overflow-hidden
            align-middle
            sm:rounded-lg
          "
        >
          <div
            class="
              max-w-2xl
              mx-auto
              py-16
              px-4
              sm:py-24 sm:px-6
              lg:max-w-7xl lg:px-8
            "
          >
            <div
              class="
                grid grid-cols-1
                gap-y-10
                sm:grid-cols-2
                gap-x-6
                lg:grid-cols-3
                xl:grid-cols-4 xl:gap-x-8
              "
            >
              <div
                class="
                  w-full
                  aspect-w-1 aspect-h-1
                  px-2
                  pb-2
                  rounded-lg
                  overflow-hidden
                  xl:aspect-w-7 xl:aspect-h-8
                  bg-white
                  group
                "
                v-for="project in state.projects"
                :key="project._id"
              >
                <div class="flex justify-between mt-1">
                  <div>
                    <router-link
                      :to="{
                        name: 'project',
                        params: {
                          id: project._id,
                          title: project.title,
                        },
                      }"
                    >
                      <h3 class="mt-1 text-sm text-gray-700 mb-0 font-bold">
                        {{ project.title }}
                      </h3>
                    </router-link>
                    <p class="mt-1 text-sm text-gray-700 mb-0 font-medium">
                      {{ project.description }}
                    </p>
                    <p
                      class="mt-1 text-sm text-gray-700 mb-0 font-medium"
                      v-for="assigned in project.assigned"
                      :key="assigned"
                    >
                      {{ assigned.name }}
                    </p>
                    <br />
                  </div>
                  <div>
                    <button class="text-blue-500">
                      <DotsVerticalIcon class="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div class="flex justify-between">
                  <!-- project deadline -->
                  <p class="text-sm text-gray-500">
                    <!--https://momentjs.com/-->
                    {{ moment(project.deadline).startOf("hour").fromNow() }}
                  </p>
                  <!-- Loop through tags on project 
                  'mix-blend-mode': 'difference' to make sure the text on the tags 
                  has a good enough contrast compared to the background color
                  -->
                  <div v-for="tag in project.tags" :key="tag">
                    <p
                      class="text-sm font-medium rounded-full"
                      :style="{ background: tag.color }"
                    >
                      <span
                        :style="{
                          color: 'white',
                          'mix-blend-mode': 'difference',
                        }"
                        class="px-1 py-0.5 m-0"
                      >
                        {{ tag.name }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import projectCrud from "../modules/projectCrud";
import { onMounted } from "vue";
import { defineComponent } from "vue";
import { DotsVerticalIcon } from "@heroicons/vue/solid";

import moment from "moment";

export default defineComponent({
  components: {
    DotsVerticalIcon,
  },
  setup() {
    const { state, getAllProjects } = projectCrud();

    onMounted(() => {
      getAllProjects();
    });

    return { state, getAllProjects };
  },
  created: function () {
    this.moment = moment;
  },
});
</script>







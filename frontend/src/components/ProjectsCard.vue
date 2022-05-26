<template>
  <div
    class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
  >
    <div
      v-for="project in projectState.projects"
      :key="project._id"
      class="w-full aspect-w-1 relative aspect-h-1 py-2 rounded-lg xl:aspect-w-7 xl:aspect-h-8 bg-white group"
    >
      <div class="flex relative justify-between mt-1 px-4">
        <div>
          <router-link
            :to="{
              name: 'project',
              params: {
                id: project._id,
              },
            }"
          >
            <h5 class="mt-1 text-gray-700 mb-0 font-bold w-11/12">
              {{ project.title }} <br />
            </h5>
          </router-link>
          <p class="mt-1 text-sm text-gray-700 mb-0 font-medium">
            {{ project.description }}
          </p>
          <!-- assigned -->
          <div>
            <p class="mt-1 text-gray-700 mb-0 text-xs uppercase font-bold">
              Assigned:
            </p>
            <p
              class="mt-0 inline-flex"
              v-for="(assigned, index) in project.assigned"
              :key="index"
            >
              <span class="text-sm"
                >{{ assigned.name }}
                <!-- If it is NOT the last name in the array, then ,&nbsp;
                this makes sure there is no comma after the last name. -->
                <span v-if="index != Object.keys(project.assigned).length - 1"
                  >,&nbsp;</span
                >
              </span>
            </p>
          </div>
          <!-- deadline -->
          <p class="text-gray-700 mb-0">
            <span class="text-xs uppercase font-bold"> Deadline:</span>
            {{ ' ' }}

            <!--https://momentjs.com/-->
            <span class="text-sm">
              {{ moment(project.deadline).startOf('hour').fromNow() }}</span
            >
          </p>
          <br />
        </div>

        <div class="absolute right-1 mt-1">
          <Menu as="div" class="relative inline-block text-left">
            <MenuButton class="text-blue-500">
              <DotsVerticalIcon class="h-5 w-5" aria-hidden="true" />
            </MenuButton>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 m-0 p-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <router-link
                      :to="{
                        name: 'project-edit',
                        params: {
                          id: project._id,
                        },
                      }"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      ]"
                      >Edit</router-link
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      @click="deleteProject(project._id)"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      ]"
                      >Delete</a
                    >
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
      <div class="flex justify-end items-center flex-wrap pb-2 px-2">
        <div v-for="tag in project.tags" :key="tag" class="">
          <p
            class="text-sm font-medium mt-1 px-2 mr-2 py-0.5 rounded-full"
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
    </div>
  </div>
  <div class="pagination rounded-lg relative">
    <div class="absolute right-3 top-4 uppercase text-xs">
      Page: {{ projectState.page }} / {{ projectState.totalPages }}
    </div>
    <!-- total pages -->
    <div class="flex px-5 content-center h-full">
      <button
        v-if="projectState.page !== 1"
        type="button"
        class="self-center mr-4 pagination-previous button px-5 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-50 sm:text-sm"
        @click="previousPage()"
  
      >
        <!-- Previous -->
        <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        class="self-center pagination-next button px-5 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-50 sm:text-sm"
        v-if="projectState.page < projectState.totalPages"
        @click="nextPage()"
      >
        <!-- Next -->
        <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import projectCrud from '../modules/projectCrud';
import { onMounted, defineComponent, ref } from 'vue';
// tailwind
import {
  DotsVerticalIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@heroicons/vue/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import moment from 'moment';

export default defineComponent({
  async setup() {
    const {
      projectState,
      projectId,
      // getAllProjects,
      deleteProject,
      getProjects,
    } = projectCrud();

    onMounted(() => {
      // getAllProjects();
      getProjects();
    });

    await getProjects();
    // await getAllProjects();

    return {
      projectState,
      // getAllProjects,
      projectId,
      moment,
      deleteProject,
      getProjects,
    };
  },
  components: {
    DotsVerticalIcon,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    ChevronRightIcon,
    ChevronLeftIcon,
  },
  methods: {
    previousPage() {
      this.projectState.page--;
      this.getProjects();
    },
    nextPage() {
      this.projectState.page++;
      this.getProjects();
    },
  },
  created: function () {
    this.moment = moment;
  },
});
</script>

<style lang="scss" scoped>
.pagination {
  left: 0;
  bottom: auto;
  width: 100%;
  height: 50px;
  margin-top: 25px;
  background-color: white;
  text-align: center;
}
</style>

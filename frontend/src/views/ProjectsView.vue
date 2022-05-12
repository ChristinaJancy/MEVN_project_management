<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Your projects</h3>
    <div class="flex flex-col">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="inline-block min-w-full overflow-hidden align-middle sm:rounded-lg"
        >
          <div
            class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <div
              class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
            >
              <div
                v-for="project in projectState.projects"
                :key="project._id"
                class="w-full aspect-w-1 aspect-h-1 px-2 pb-2 rounded-lg xl:aspect-w-7 xl:aspect-h-8 bg-white group"
              >
                <div class="flex relative justify-between mt-1">
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
                  <div class="absolute right-0">
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
                              <a
                                href="#"
                                @click="
                                  EditProjectDetails(
                                    project._id,
                                    project.title,
                                    project.description,
                                    project.deadline,
                                    project.tags
                                  )
                                "
                                :class="[
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm',
                                ]"
                                >Edit</a
                              >
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                              <a
                                href="#"
                                :class="[
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
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
                <div class="flex justify-between">
                  <!-- project deadline -->
                  <p class="text-sm text-gray-500">
                    <!--https://momentjs.com/-->
                    {{ moment(project.deadline).startOf('hour').fromNow() }}
                  </p>
                  <!-- Loop through tags on project 
                  'mix-blend-mode': 'difference' to make sure the text on the tags 
                  has a good enough contrast compared to the background color
                  -->
                </div>
                <div v-for="tag in project.tags" :key="tag">
                  <p
                    class="text-sm font-medium mt-1"
                    align="right"
                    :style="{ background: tag.color }"
                  >
                    <span
                      :style="{
                        color: 'white',
                        'mix-blend-mode': 'difference',
                      }"
                      class="px-1 py-0.5 rounded-full"
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

    <!-- task modal -->
    <EditProjectDetails :show="showModal" @close-modal="showModal = false" />
  </div>
</template>

<script lang="ts">
import projectCrud from '../modules/projectCrud';
import { onMounted, defineComponent, ref } from 'vue';
import EditProjectDetails from '../components/EditProjectDetails.vue';
import { DotsVerticalIcon } from '@heroicons/vue/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import moment from 'moment';

export default defineComponent({
  setup() {
    const { projectState, getAllProjects, getSpecificProject } = projectCrud();
    
    getSpecificProject();

    const showModal = ref(false);

    onMounted(() => {
      getAllProjects();
    });

    return { projectState, getAllProjects, moment, showModal };
  },
  components: {
    DotsVerticalIcon,
    EditProjectDetails,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  },
  methods: {
    EditProjectDetails(id: string, title: string, description: string, deadline: string, tags: any) {
      this.showModal = true;
      this.projectState.project = {
        id,
        title,
        description,
        deadline,
        tags,
      };
    },
  },
  created: function () {
    this.moment = moment;
  },
});
</script>

<template>
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
      v-for="project in projectState.projects"
      :key="project._id"
      class="
        w-full
        aspect-w-1 aspect-h-1
        px-2
        pb-2
        rounded-lg
        xl:aspect-w-7 xl:aspect-h-8
        bg-white
        group
      "
    >
      <div class="flex relative justify-between mt-1">
        <div>
          <router-link
            :to="{
              name: 'project',
              params: {
                id: project._id,
              },
            }"
          >
            <h5 class="mt-1 text-gray-700 mb-0 font-bold">
              {{ project.title }} <br />
            </h5>
          </router-link>
          <p class="mt-1 text-sm text-gray-700 mb-0 font-medium">
            {{ project.description }}
          </p>
          <!-- assigned -->
          <p
            class="mt-1 text-gray-700 mb-0"
            v-for="assigned in project.assigned"
            :key="assigned"
          >
            <span class="text-xs uppercase font-bold"> Assigned:</span>
            {{ " " }}
            <!-- space -->
            <span class="text-sm">{{ assigned.name }}</span>
          </p>
          <!-- deadline -->
          <p class="text-gray-700 mb-0">
            <span class="text-xs uppercase font-bold"> Deadline:</span>
            {{ " " }}

            <!--https://momentjs.com/-->
            <span class="text-sm">
              {{ moment(project.deadline).startOf("hour").fromNow() }}</span
            >
          </p>
          <br />
        </div>

        <div class="absolute right-0 mt-1">
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
                class="
                  absolute
                  right-0
                  m-0
                  p-0
                  w-56
                  rounded-md
                  shadow-lg
                  bg-white
                  ring-1 ring-black ring-opacity-5
                  focus:outline-none
                "
              >
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      @click="EditProjectDetails()"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      ]"
                      >Edit</a
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
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
      <div
        v-for="tag in project.tags"
        :key="tag"
        style="
          display: inline-flex;
          justify-content: space-between;
          float: right;
        "
      >
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
            {{ tag.name }}
          </span>
        </p>
      </div>
    </div>

    <!-- task modal -->
    <EditProjectDetails :show="showModal" @close-modal="showModal = false" />
  </div>
</template>

<script lang="ts">
import projectCrud from "../modules/projectCrud";
import EditProjectDetails from "../components/EditProjectDetails.vue";
import { onMounted, defineComponent, ref } from "vue";
// tailwind
import { DotsVerticalIcon } from "@heroicons/vue/solid";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import moment from "moment";

export default defineComponent({
  async setup() {
    const { projectState, getAllProjects, getSpecificProject } = projectCrud();

    getSpecificProject();
    const selectedProject = ref("");

    const showModal = ref(false);

    onMounted(() => {
      getAllProjects();
    });

    await getAllProjects();

    return {
      projectState,
      getAllProjects,
      moment,
      showModal,
      selectedProject,
    };
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
    EditProjectDetails() {
      this.showModal = true;
    },
  },
  created: function () {
    this.moment = moment;
  },
});
</script>
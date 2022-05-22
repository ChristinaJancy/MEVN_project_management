<template>
  <div v-for="project in projectState" :key="project._id">
    <!-- title + tags -->
    <h1 class="text-4xl tracking-tight font-extrabold text-blue-900 block">
      {{ project.title }}
      <span class="text-sm inline" v-for="tag in project.tags" :key="tag">
        {{ tag.name }}
      </span>
    </h1>
    <!-- description -->
    <div>
      <h4 class="mt-0 text-sm font-extrabold inline">Description</h4>
      {{ ' ' }}
      <p class="text-base -mt-5 inline">
        {{ project.description }}
      </p>
    </div>
    <!-- deadline -->
    <div>
      <h4 class="mt-0 text-sm font-extrabold inline">Deadline</h4>
      {{ ' ' }}
      <p class="inline">
        <!--https://momentjs.com/-->
        {{ moment(project.deadline).startOf('hour').fromNow() }}
      </p>
    </div>

    <br />

    <div class="grid grid-cols-12 mx-auto">
      <!------ create columns button ------->
      <!-- if not adding new columns -->
      <div class="col-span-12" v-if="!isCreatingCols">
        <button
          type="button"
          class="button mb-2 mr-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          @click="toggleCreateCols()"
        >
          Add columns
        </button>
        <!-- edit/update columns -->
        <button
          type="button"
          class="button mb-2 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          @click="toggleUpdateCols()"
        >
          Edit columns
        </button>
      </div>
      <!-- if adding new columns -->
      <div class="col-span-4" v-else>
        <button
          type="button"
          class="button mr-3 mb-2 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          @click="toggleCreateCols()"
        >
          cancel
        </button>
        <!-- create column btn -->
        <button
          type="button"
          class="button mb-2 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-green-600 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          @click="createAColumn()"
        >
          Create column
        </button>
      </div>
      <!-- if creating new columns, show input -->
      <div class="col-span-8" v-if="isCreatingCols">
        <div class="flex rounded-md shadow-sm">
          <input
            type="text"
            name="column-name"
            v-model="columnState.title"
            id="column-name"
            class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
          />
        </div>
      </div>

      <!------------ columns in project ----------------->
      <div
        class="relative xl:col-span-3 lg:col-span-4 md:col-span-4 sm:col-span-12 col-span-12 bg-gray-100 rounded-lg shadow-lg mr-3 mt-3 pl-3 pt-2"
        v-for="(column, index) in project.columns"
        :key="column._id"
      >
        <div class="absolute right-0 mt-1" style="z-index: 5">
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
                class="m-0 p-0 w-56 absolute right-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      @click="deleteColumn(column._id)"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      ]"
                      >Delete</a
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      @click="openCreateTaskModal(column._id)"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      ]"
                      >Create task</a
                    >
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
        <!--  -->

        <div v-if="!isUpdatingCols">
          <h4
            class="text-base font-bold mt-0 text-gray-800"
            style="text-transform: capitalize"
          >
            {{ column.title }}
          </h4>
        </div>

        <div
          class="rounded-md pb-10 inline-flex px-5 relative"
          v-if="isUpdatingCols"
        >
          <input
            type="text"
            name="column-name"
            v-model="column.title"
            id="column-name"
            class="focus:ring-indigo-500 focus:border-indigo-500 w-full rounded-md sm:text-sm border-gray-300"
          />
          <button
            type="button"
            class="button ml-2 rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-green-600 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:text-sm"
            @click="updateColumn(column._id, column.title)"
          >
            Save
          </button>

          <div class="absolute bottom-2 -left-2">
            <a
              v-if="index != 0"
              @click="moveColumnDown(index)"
              class="text-gray-400 flex"
            >
              <!-- if screen sm show ChevronUpIcon else  ChevronLeftIcon -->
              <ChevronLeftIcon class="h-5 w-5" />
              <span class="text-xs mt-0.5 uppercase">move</span>
            </a>
          </div>

          <!-- move column to the right -->
          <div class="absolute bottom-2 right-0">
            <a
              v-if="project.columns.length > index + 1"
              @click="moveColumnUp(index)"
              class="text-gray-400 flex"
            >
              <span class="text-xs mt-0.5 uppercase">move</span>
              <ChevronRightIcon class="h-5 w-5" />
            </a>
          </div>
        </div>

        <!----------- draggable task card ------------------>
        <draggable
          v-if="!isUpdatingCols"
          :list="column.tasks"
          group="tasks"
          fallbackTolerance="500"
          animation="200"
          item-key="id"
          @add="onTaskEnd(column._id, $event)"
          @update="onTaskUpdate(column._id)"
        >
          <!-- tasks -->
          <template #item="{ element }" type="transition">
            <div
              id="taskCard"
              style="min-height: 80px; position: relative; cursor: pointer"
              class="p-2 mr-4 mb-4 rounded-lg bg-white shadow-md"
              @click="openTaskModal(element._id)"
            >
              <h3 class="text-sm font-bold text-gray-800 mt-0 mb-0">
                {{ element.name }}
              </h3>
              <p class="text-sm">
                {{ element.status }}
              </p>
              <p class="text-sm" style="position: absolute; bottom: 0">
                {{ element.assigned.initials }}
              </p>
              <!-- task modal -->
              <TaskCard
                :show="taskModal === element._id"
                :name="element.name"
                :id="element._id"
                :description="element.description"
                :tags="element.tags"
                :status="element.status"
                :assigned="element.assigned"
                :deadline="element.deadline"
                @close-modal="taskModal = false"
              />
            </div>
          </template>
        </draggable>

        <!-- create task modal -->
        <CreateTaskModal
          :show="createTaskModal === column._id"
          @close-modal="createTaskModal = false"
          :columnId="column._id"
        />
      </div>
    </div>

    <!-- <TaskCard :show="showModal" @close-modal="showModal = false" /> -->
  </div>
</template>

<script lang="ts">
import draggable from 'vuedraggable';
import projectCrud from '../modules/projectCrud';
import columnCrud from '../modules/columnCrud';
import taskCrud from '../modules/taskCrud';
import TaskCard from '../components/TaskCard.vue';
import CreateTaskModal from '../components/CreateTaskModal.vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import moment from 'moment';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  DotsVerticalIcon,
} from '@heroicons/vue/solid';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'project',
  components: {
    draggable,
    TaskCard,
    ChevronRightIcon,
    ChevronLeftIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    DotsVerticalIcon,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    CreateTaskModal,
  },

  async setup() {
    const {
      projectState,
      projectId,
      getSpecificProject,
      updateProjectColumns,
    } = projectCrud();
    const {
      columnState,
      moveTaskToNewColumn,
      moveTaskInsideColumn,
      createColumn,
      updateColumn,
      deleteColumn,
    } = columnCrud();

    const { taskState } = taskCrud();

    await getSpecificProject();
    const isUpdatingCols = ref(false);
    const isCreatingCols = ref(false);
    const taskModal = ref(null);
    const createTaskModal = ref(null);

    return {
      projectState,
      columnState,
      projectId,
      taskState,
      moment,
      taskModal,
      updateProjectColumns,
      moveTaskToNewColumn,
      moveTaskInsideColumn,
      createColumn,
      updateColumn,
      isCreatingCols,
      isUpdatingCols,
      deleteColumn,
      createTaskModal,
    };
  },

  created: function () {
    this.moment = moment;
  },

  methods: {
    openTaskModal(index) {
      //element is the task
      this.taskModal === index
        ? (this.taskModal = null)
        : (this.taskModal = index);
    },
    openCreateTaskModal(columnId) {
      this.createTaskModal === columnId
        ? (this.createTaskModal = null)
        : (this.createTaskModal = columnId);
    },

    toggleUpdateCols: function () {
      this.isUpdatingCols = !this.isUpdatingCols;
    },
    toggleCreateCols() {
      this.isCreatingCols = !this.isCreatingCols;
    },
    onTaskEnd(columnId: string, event: any) {
      /*This function is called when a task is dropped in a new column */
      const taskId = event.item._underlying_vm_._id;

      /*gets the project state, finds the project with the same id as the projectId in the url,
      finds the column with the same id as the columnId that the task is being moved to */
      const tasks = this.projectState
        .find((project: any) => project._id === this.projectId)
        .columns.find((column: any) => column._id === columnId).tasks;

      //maps the tasks array to find the task with the same id as the dropped task
      const taskIds = tasks.map((task: { _id: string | string[] }) => task._id);

      this.moveTaskToNewColumn(columnId, taskId, taskIds);
    },

    onTaskUpdate(columnId: string) {
      /*This function is called when a task is moved inside its own column */
      const tasks = this.projectState
        .find((project: any) => project._id === this.projectId)
        .columns.find((column: any) => column._id === columnId).tasks;

      //maps the tasks array to find the task with the same id as the dropped task
      const taskIds = tasks.map((task: { _id: string | string[] }) => task._id);

      this.moveTaskInsideColumn(columnId, taskIds);
    },

    createAColumn() {
      /*This function is called when the user clicks the create column button */
      const columnTitle = this.columnState.title;
      const projectId = this.projectId;

      this.createColumn(projectId, columnTitle);
    },

    moveColumnDown(index: number) {
      /*This function is called when the user clicks the move column down button */
      const projectId = this.projectId;

      const columns = this.projectState.find(
        (project: any) => project._id === this.projectId
      ).columns;

      //map the columns array to only find the ids of the columns
      const columnIds = columns.map((column: any) => column._id);

      //splice the columnIds array to add the column at the index - 1
      columnIds.splice(index - 1, 0, columnIds.splice(index, 1)[0]);

      this.updateProjectColumns(projectId, columnIds);
    },
    moveColumnUp(index: number) {
      /*This function is called when the user clicks the move column down button */
      const projectId = this.projectId;

      const columns = this.projectState.find(
        (project: any) => project._id === this.projectId
      ).columns;

      //map the columns array to only find the ids of the columns
      const columnIds = columns.map((column: any) => column._id);

      //splice the columnIds array to add the column at the index - 1
      columnIds.splice(index + 1, 0, columnIds.splice(index, 1)[0]);

      this.updateProjectColumns(projectId, columnIds);
    },
  },
});
</script>

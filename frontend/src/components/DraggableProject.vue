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
          class="button mb-2 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          @click="toggleCreateCols()"
        >
          Add columns
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

      <!-- columns in project -->
      <div
        class="lg:col-span-3 md:col-span-auto sm:col-span-12 col-span-12 bg-gray-100 rounded-lg shadow-lg mr-3 mt-3 pl-3 pt-2"
        v-for="(column, index) in project.columns"
        :key="column._id"
      >
        <div class="relative">
          <div class="absolute -left-4 top-0.5">
            <a
              v-if="index != 0"
              @click="moveColumnDown(index)"
              class="text-gray-400"
            >
              <!-- if screen sm show ChevronUpIcon else  ChevronLeftIcon -->

              <ChevronLeftIcon class="h-5 w-5" />
            </a>
          </div>
          <!-- move column to the right -->
          <div class="absolute right-0 top-0.5">
            <a
              v-if="project.columns.length > index + 1"
              @click="moveColumnUp(index)"
              class="text-gray-400"
            >
              <ChevronRightIcon class="h-5 w-5" />
            </a>
          </div>
        </div>

        <h4
          class="text-base font-bold mt-0 text-gray-800"
          style="text-transform: capitalize"
        >
          {{ column.title }}
        </h4>

        <!-- task card -->
        <draggable
          :list="column.tasks"
          group="tasks"
          item-key="id"
          @add="onTaskEnd(column._id, $event)"
          @update="onTaskUpdate(column._id)"
        >
          <!-- tasks -->
          <template #item="{ element }">
            <div
              id="taskCard"
              style="min-height: 80px; position: relative"
              class="p-2 mr-4 mb-4 rounded-lg bg-white shadow-md"
            >
              <h3
                class="text-sm font-bold text-gray-800 mt-0 mb-0"
                style="cursor: pointer"
                @click="showModal = true"
              >
                {{ element.name }}
              </h3>
              <p class="text-sm">
                {{ element.status }}
              </p>
              <p class="text-sm" style="position: absolute; bottom: 0">
                {{ element.assigned.initials }} JJ
              </p>
            </div>
          </template>
        </draggable>
      </div>
    </div>

    <!-- task modal -->
    <!-- <TaskCard :show="showModal" @close-modal="showModal = false" /> -->
  </div>
</template>

<script lang="ts">
import draggable from 'vuedraggable';
import projectCrud from '../modules/projectCrud';
import columnCrud from '../modules/columnCrud';
import moment from 'moment';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/vue/solid';
import TaskCard from '../components/TaskCard.vue';
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
    } = columnCrud();

    await getSpecificProject();

    const isCreatingCols = ref(false);
    // const showModal = ref(false);

    return {
      projectState,
      columnState,
      projectId,
      moment,
      // showModal,
      updateProjectColumns,
      moveTaskToNewColumn,
      moveTaskInsideColumn,
      createColumn,
      isCreatingCols
    };
  },

  created: function () {
    this.moment = moment;
  },

  methods: {
    //if screen is small show ChevronUpIcon else  ChevronLeftIcon
    screenSmall() {
      if ( window.innerWidth < 768 ) {
        return true;
      } else {
        return false;
      }
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

    moveColumn(columnId: string) {
      /*This function is called when the user clicks the move column button */
      const projectId = this.projectId;

      const columns = this.projectState.find(
        (project: any) => project._id === this.projectId
      ).columns;

      this.updateProjectColumns(projectId, columns);
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

<style></style>

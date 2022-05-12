<template>
  <div>
    <div v-for="project in projectState" :key="project">
      <h1 class="text-4xl tracking-tight font-extrabold text-blue-900 block">
        {{ project.title }}
        <span class="text-sm inline" v-for="tag in project.tags" :key="tag">
          {{ tag.name }}
        </span>
      </h1>
      <div>
        <h4 class="mt-0 text-sm font-extrabold inline">Description</h4>
        {{ ' ' }}
        <p class="text-base -mt-5 inline">
          {{ project.description }}
        </p>
      </div>

      <div>
        <h4 class="mt-0 text-sm font-extrabold inline">Deadline</h4>
        {{ ' ' }}
        <p class="inline">
          <!--https://momentjs.com/-->
          {{ moment(project.deadline).startOf('hour').fromNow() }}
        </p>
      </div>

      <br />
      <!-- test -->
      <div class="grid grid-cols-12 mx-auto">
        <div
          class="lg:col-span-3 md:col-span-auto sm:col-span-12 col-span-12 bg-gray-100 rounded-lg shadow-lg mr-3 mt-3 pl-3 pt-2"
          v-for="column in project.columns"
          :key="column"
        >
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
      <TaskCard :show="showModal" @close-modal="showModal = false" />
    </div>
  </div>
</template>

<script lang="ts">
import draggable from 'vuedraggable';
import projectCrud from '../modules/projectCrud';
import columnCrud from '../modules/columnCrud';
import moment from 'moment';
import TaskCard from '../components/TaskCard.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'project',
  components: {
    draggable,
    TaskCard,
  },

  setup() {
    const { projectState, projectId, getSpecificProject } = projectCrud();
    const { columnState, moveTaskToNewColumn, moveTaskInsideColumn } =
      columnCrud();

    getSpecificProject();

    const showModal = ref(false);

    return {
      projectState,
      columnState,
      projectId,
      moment,
      showModal,
      moveTaskToNewColumn,
      moveTaskInsideColumn,
    };
  },

  created: function () {
    this.moment = moment;
  },

  methods: {
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
  },
});
</script>

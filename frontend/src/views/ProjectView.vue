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
        {{ " " }}
        <p class="text-base -mt-5 inline">
          {{ project.description }}
        </p>
      </div>

      <div>
        <h4 class="mt-0 text-sm font-extrabold inline">Deadline</h4>
        {{ " " }}
        <p class="inline">
          <!--https://momentjs.com/-->
          {{ moment(project.deadline).startOf("hour").fromNow() }}
        </p>
      </div>

      <br />
      <!-- test -->
      <div class="grid grid-cols-12 mx-auto">
        <div
          class="
            lg:col-span-3
            md:col-span-auto
            sm:col-span-12
            col-span-12
            bg-gray-100
            rounded-lg
            shadow-lg
            mr-3
            mt-3
            pl-3
            pt-2
          "
          v-for="column in project.columns"
          :key="column"
        >
          <h4
            class="text-base font-bold mt-0 text-gray-800"
            style="text-transform: capitalize"
          >
            {{ column.title }}
          </h4>

          <!-- :list="column.tasks" -->
          <draggable
            v-model="column.tasks"
            group="tasks"
            itemKey="name"
            @end="onEnd"
            @change="log"
          >
            <!-- <template #item="{ element, index }"> -->
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
                <!-- <span class="text-sm">| Index:{{ index }}</span> -->
              </div>
            </template>
          </draggable>
        </div>
      </div>

      <!-- task modal -->
      <TaskCard :show="showModal" @close-modal="showModal = false" />

      <br />
      <hr
        style="
          height: 2px;
          border-width: 0;
          color: gray;
          background-color: gray;
        "
      />
    </div>
  </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import projectCrud from "../modules/projectCrud";
import moment from "moment";
import TaskCard from "../components/TaskCard.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "project",
  display: "project",
  order: 1,
  components: {
    draggable,
    TaskCard,
  },

  setup() {
    const { projectState, projectId, getSpecificProject } = projectCrud();

    getSpecificProject();
    
    const showModal = ref(false);

    return { projectState, projectId, moment, showModal };
  },

  created: function () {
    this.moment = moment;
  },

  methods: {
    onEnd: function (evt: any) {
      console.log(evt);
    },
    log: function (evt: any) {
      window.console.log(evt.oldIndex + " " + evt.newIndex);
    },
  },
});
</script>


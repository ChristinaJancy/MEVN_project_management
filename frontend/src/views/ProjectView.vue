<template>
  <div>
    <div v-for="project in projectState" :key="project">
      <h1 class="text-4xl tracking-tight font-extrabold text-blue-900 block">
        {{ project.title }}
        <span
          class="text-sm inline block"
          v-for="tag in project.tags"
          :key="tag"
        >
          {{ tag.name }}
        </span>
      </h1>
      <div>
        <h4 class="mt-0 text-sm font-extrabold block inline">Description</h4>
        {{ " " }}
        <p class="text-base -mt-5 inline">
          {{ project.description }}
        </p>
      </div>

      <div>
        <h4 class="mt-0 text-sm font-extrabold block inline">Deadline</h4>
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
          class="lg:col-span-3 md:col-span-auto sm:col-span-12 col-span-12"
          v-for="column in project.columns"
          :key="column"
        >
          <h3>{{ column.title }}</h3>

          <!-- :list="column.tasks" -->
          <draggable
            class="list-group"
            v-model="column.tasks"
            group="tasks"
            itemKey="name"
            @end="onEnd"
            @change="log"
          >
            <template #item="{ element }">
              <div class="list-group-item">{{ element.name }}</div>
            </template>
          </draggable>
        </div>

        <!-- <rawDisplayer class="col-3" :value="list1" title="List 1" />
        <rawDisplayer class="col-3" :value="list2" title="List 2" /> -->
      </div>
    </div>
    <!-- test end -->
    <br />
    <hr
      style="height: 2px; border-width: 0; color: gray; background-color: gray"
    />

    <!-- <div class="grid grid-cols-12 mx-auto">
      <div class="lg:col-span-3 md:col-span-auto sm:col-span-12 col-span-12">
        <h3>Todo</h3>
        <draggable
          class="list-group"
          :list="list1"
          group="people"
          @change="log"
          itemKey="name"
        >
          <template #item="{ element, index }">
            <div class="list-group-item">{{ element.name }} {{ index }}</div>
          </template>
        </draggable>
      </div>
      <hr />
      <div class="lg:col-span-3 md:col-span-auto sm:col-span-12 col-span-12">
        <h3>Doing</h3>
        <draggable
          class="list-group"
          :list="list2"
          group="people"
          @change="log"
          itemKey="name"
        >
          <template #item="{ element, index }">
            <div class="list-group-item">{{ element.name }} {{ index }}</div>
          </template>
        </draggable>
      </div>
      <hr />
      <div class="lg:col-span-3 md:col-span-auto sm:col-span-12 col-span-12">
        <h3>Done</h3>
        <draggable
          class="list-group"
          :list="list3"
          group="people"
          @change="log"
          itemKey="name"
        >
          <template #item="{ element, index }">
            <div class="list-group-item">{{ element.name }} {{ index }}</div>
          </template>
        </draggable>
      </div>

      <rawDisplayer class="col-3" :value="list1" title="List 1" />
      <rawDisplayer class="col-3" :value="list2" title="List 2" />
    </div> -->
  </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import projectCrud from "../modules/projectCrud";
import moment from "moment";
import { defineComponent } from "vue";

export default defineComponent({
  name: "project",
  display: "project",
  order: 1,
  components: {
    draggable,
  },

  setup() {
    const { projectState, projectId, getSpecificProject } = projectCrud();
    getSpecificProject();
    return { projectState, projectId, moment };
  },
  created: function () {
    this.moment = moment;
  },

  // data() {
  //   return {
  //     list1: [
  //       { name: "John", id: 1 },
  //       { name: "Joao", id: 2 },
  //       { name: "Jean", id: 3 },
  //       { name: "Gerard", id: 4 },
  //     ],
  //     list2: [
  //       { name: "Juan", id: 5 },
  //       { name: "Edgard", id: 6 },
  //       { name: "Johnson", id: 7 },
  //     ],
  //     list3: [
  //       { name: "Johnny", id: 8 },
  //       { name: "Edgardio", id: 9 },
  //       { name: "Johnsonson", id: 10 },
  //     ],
  //   };
  // },

  methods: {
   onEnd: function (/**Event*/evt) {
      console.log(evt);
   },
    log: function (evt: any) {
      window.console.log(evt.oldIndex + " " + evt.newIndex);
    },
  },
  // methods: {
  //   add: function () {
  //     this.list.push({ name: "Juan" });
  //   },
  //   replace: function () {
  //     this.list = [{ name: "Edgard" }];
  //   },
  //   clone: function (el: any) {
  //     return {
  //       name: el.name + " cloned",
  //     };
  //   },
  //   log: function (evt: any) {
  //     window.console.log(evt);
  //   },
  // },
});
</script>


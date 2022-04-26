<template>
  <div>
    <div class="grid grid-cols-12 mx-auto">
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
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "three-lists",
  display: "Three Lists",
  order: 1,
  components: {
    draggable,
  },
  data() {
    return {
      list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 },
      ],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 },
      ],
      list3: [
        { name: "Johnny", id: 8 },
        { name: "Edgardio", id: 9 },
        { name: "Johnsonson", id: 10 },
      ],
    };
  },

  methods: {
    add: function () {
      this.list.push({ name: "Juan" });
    },
    replace: function () {
      this.list = [{ name: "Edgard" }];
    },
    clone: function (el) {
      return {
        name: el.name + " cloned",
      };
    },
    log: function (evt) {
      window.console.log(evt);
    },
  },
};
</script>
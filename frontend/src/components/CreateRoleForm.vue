<template>
  <div class="shadow sm:rounded-md">
    <div class="px-4 py-5 bg-white space-y-6 sm:p-6 rounded-lg">
      <!-- title -->
      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-3 sm:col-span-2">
          <label for="title" class="block text-sm font-medium text-gray-700"
            >Title</label
          >
          <div class="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              name="role-name"
              v-model="roleState.title"
              id="role-name"
              class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
              placeholder="Role title"
            />
          </div>
        </div>
      </div>
      <!------------ color ------------>
      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-3 sm:col-span-2">
          <label for="title" class="block text-sm font-medium text-gray-700"
            >Color</label
          >
          <div
            class="mt-2 rounded-full w-20 h-8 relative"
            style="overflow: hidden"
          >
            <input
              class="w-40 h-16 absolute -bottom-4 -left-4"
              type="color"
              id="head"
              name="head"
              v-model="roleState.color"
            />
          </div>
        </div>
      </div>
      <div class="px-2 pt-3 text-right sm:px-6">
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          @click="createRole()"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid';
import roleCrud from '../modules/roleCrud';

// tailwind
export default defineComponent({
  components: {
    CheckIcon,
    SelectorIcon,
  },
  setup() {
    const { roleState, roleId, createRole } = roleCrud();

    return {
      roleState,
      roleId,
      createRole
    };
  },
  methods: {},
});
</script>

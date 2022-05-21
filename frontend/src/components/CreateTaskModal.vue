<template>
  <TransitionRoot as="template" :show="open" :key="element">
    <Dialog as="div" class="relative z-10">
      <!-- this child makes the background greyed out -->
      <TransitionChild
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="fixed z-10 inset-0 overflow-y-auto flex items-end justify-center min-h-screen px-4 text-center sm:block sm:p-0"
      >
        <TransitionChild
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <!-- dialog-panel -->
          <div
            class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          >
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
              <div class="shadow sm:rounded-md">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <!-- Name -->
                  <div class="grid grid-cols-3 gap-6">
                    <div class="col-span-3 sm:col-span-2">
                      <label
                        for="name"
                        class="block text-sm font-medium text-gray-700"
                        >Name</label
                      >
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="task-name"
                          v-model="taskState.name"
                          id="task-name"
                          class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                          placeholder="Task name"
                        />
                      </div>
                    </div>
                  </div>

                  <!------------ Description ------------>
                  <div>
                    <label
                      for="about"
                      class="block text-sm font-medium text-gray-700"
                      >Description</label
                    >
                    <div class="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows="3"
                        v-model="taskState.description"
                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Brief description of the task..."
                      />
                    </div>
                    <!-- <p class="mt-2 text-sm text-gray-500">Brief description of the project.</p> -->
                  </div>

                  <!------------ Tags------------>
                  <div>
                    <label
                      for="about"
                      class="block text-sm font-medium text-gray-700"
                      >Tags</label
                    >
                    <!-- :options="tagState.tags.map((tag ) => tag.name)" -->
                    <VueMultiselect
                      v-model="taskState.tags"
                      :options="tagState.tags"
                      :value="tagState.tags"
                      :multiple="true"
                      :close-on-select="true"
                      placeholder="Pick some"
                      label="name"
                      track-by="name"
                    />
                  </div>

                  <!------------ Assigned ------------>
                  <div>
                    <label
                      for="about"
                      class="block text-sm font-medium text-gray-700"
                      >Assign members</label
                    >
                    <VueMultiselect
                      v-model="taskState.assigned"
                      :options="state.users"
                      :value="state.users"
                      :multiple="true"
                      :close-on-select="false"
                      placeholder="Pick some"
                      label="name"
                      track-by="name"
                    />
                  </div>

                  <!------------ Deadline ------------>
                  <div class="mt-6">
                    <label
                      for="deadline"
                      class="block text-sm font-medium text-gray-700"
                      >Deadline</label
                    >
                    <div class="mt-1">
                      <input
                        type="date"
                        name="deadline"
                        v-model="taskState.deadline"
                        id="deadline"
                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Deadline"
                      />
                    </div>
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    @click="$emit('close-modal')"
                    ref="cancelButtonRef"
                  >
                    cancel
                  </button>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    @click="createTask(columnId, name, description, tags, assigned, deadline)"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import {
  Dialog,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid';
import VueMultiselect from 'vue-multiselect';
import tagCrud from '../modules/tagCrud';
import userCrud from '../modules/userCrud';
import taskCrud from '../modules/taskCrud';
import { defineComponent, onMounted, ref } from 'vue';

// tailwind
export default defineComponent({
  components: {
    CheckIcon,
    SelectorIcon,
    VueMultiselect,
    Dialog,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },
  props: ['columnId'],
  async setup() {
    const { tagState, tagId, getAllTags } = tagCrud();
    const { state, userId, getAllUsers } = userCrud();
    const { taskState, createTask } = taskCrud();

    // const { columnState, columnId, getAllColumns } = columnCrud();

    onMounted(() => {
      getAllTags();
      getAllUsers();
    });

    await getAllTags();
    await getAllUsers();
    const open = ref(false);

    return {
      createTask,
      taskState,
      state,
      userId,
      tagState,
      tagId,
      open,
    };
  },
  methods: {},
});
</script>

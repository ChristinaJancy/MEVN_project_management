<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" id="dialog">
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
        class="fixed z-10 inset-0 overflow-y-auto flex items-end justify-center min-h-screen px-4 text-center sm:block"
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
            class="relative inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-top sm:max-w-lg sm:w-full"
            id="dialog-panel"
          >
            <div class="bg-white shadow rounded-lg">
              <!---- name and tags ---->
              <div class="px-4 py-5 sm:px-6">
                <div class="flex relative mb-10">
                  <h3
                    class="mt-0 absolute left-0 top-0 text-lg leading-6 font-medium text-gray-900"
                  >
                    {{ name }}
                  </h3>
                  <!-- edit -->
                  <router-link
                    :to="{
                      name: 'edit-task',
                      params: {
                        id: id,
                      },
                    }"
                  >
                    <button
                      type="button"
                      class="absolute right-0 -top-2 justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    >
                      Edit
                    </button>
                  </router-link>
                </div>
                <p
                  class="ml-1 max-w-2xl text-sm text-gray-500 italic"
                  v-for="tag in tags"
                  :key="tag._id"
                >
                  {{ tag.name }}
                </p>
              </div>
              <div class="border-t border-gray-200">
                <dl>
                  <!---- description ---->
                  <div
                    class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-gray-500">
                      Description
                    </dt>
                    <dd
                      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                    >
                      {{ description }}
                    </dd>
                  </div>
                  <!---- status ---->
                  <div
                    class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-gray-500">Status</dt>
                    <dd
                      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                    >
                    <div>
                      <label for="status" class="block text-sm font-medium text-gray-700"
                        >Status</label
                      >
                      <select name="status" id="" v-model="currentStatus" @change="changeStatus()">
                        <option :value="currentStatus" disabled selected>
                          <span class="text-xs">{{ currentStatus }}</span>
                        </option>
                        <option
                          v-for="(status,index) in statusOptions"
                          :key="status"
                          :value="statusOptions[index]"
                        >
                          <span>{{ statusOptions[index] }}</span>
                        </option>
                      </select>
                    </div>
                    <!-- <button type="button" class=" rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    @click="changeStatus(currentStatus)">
                      {{ currentStatus }}
                    </button> -->
                    </dd>
                  </div>
                  <!---- assigned ---->
                  <div
                    class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-gray-500">Assigned</dt>
                    <dd
                      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      v-for="assignee in assigned"
                      :key="assignee._id"
                    >
                      {{ assignee.name }}
                    </dd>
                  </div>
                  <!---- Deadline ---->
                  <div
                    class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-gray-500">Deadline</dt>
                    <dd
                      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                    >
                      {{ moment(deadline).startOf('hour').fromNow() }}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div class="bg-gray-50 px-4 py-4 sm:px-6 sm:flex flex-row-reverse">
              <!-- close -->
              <button
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="$emit('close-modal', currentStatus), $emit('update-status')"
                ref="cancelButtonRef"
              >
                Close
              </button>
            </div>
          </div>
          <!-- /dialog-panel -->
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
import { PaperClipIcon } from '@heroicons/vue/solid';
import moment from 'moment';
import VueMultiselect from 'vue-multiselect';
import columnCrud from '../modules/columnCrud';
import { defineComponent, ref } from 'vue';
import taskCrud from '../modules/taskCrud';
import projectCrud from '../modules/projectCrud';

export default defineComponent({
  props: [
    'name',
    'description',
    'status',
    'assigned',
    'tags',
    'deadline',
    'columnId',
    'id',
  ],
  components: {
    PaperClipIcon,
    Dialog,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    VueMultiselect,
  },
  setup(props) {
    const columnState = columnCrud;
    const open = ref(false);
    const { updateTask, statusOptions } = taskCrud();
    let currentStatus = props.status;
    const { getSpecificProject } = projectCrud();
    
    
    return {
      statusOptions,
      updateTask,
      open,
      columnState,
      moment,
      currentStatus,
      getSpecificProject
    };
  },
  created: function () {
    this.moment = moment;
  },
  methods: {
    changeStatus: function () {
        this.updateTask(
          this.id,
          this.name,
          this.description,
          this.deadline,
          this.tags,
          this.assigned,
          this.currentStatus,
        );
    },
  },
});
</script>

<style lang="scss" scoped>
/*  https://tailwindcss.com/docs/responsive-design
Breakpoint prefix	Minimum width	CSS
sm	640px	@media (min-width: 640px) { ... }
md	768px	@media (min-width: 768px) { ... }
lg	1024px	@media (min-width: 1024px) { ... }
xl	1280px	@media (min-width: 1280px) { ... }
2xl	1536px	@media (min-width: 1536px) { ... }
*/

// sm breakpoint and below
@media screen and (max-width: 640px) {
  #dialog-panel {
    min-width: 80vw !important;
    height: auto;
    position: absolute;
    top: 0;
    max-height:90vh;
    transform: translateX(-50%) translateY(2%);
  }
}

#dialog-panel {
  overflow: scroll;
}
//html scrollbar
/* width */
::-webkit-scrollbar {
  border-radius: 50%;
  height: 80%;
}
/* Track */
::-webkit-scrollbar-track {
  overflow: hidden;
}
/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
}
</style>

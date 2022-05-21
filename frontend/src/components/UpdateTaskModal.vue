<!-- This example requires Tailwind CSS v2.0+ -->
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
            style="width: 100%"
          >
            <div
              class="bg-white shadow overflow-hidden sm:rounded-lg"
             
            >
              <!---- name and tags ---->
              <div class="px-4 py-5 sm:px-6">
                <h3 class="mt-0 text-lg leading-6 font-medium text-gray-900">
                  <input type="text" v-model="name" name="" id="" />
                </h3>

                <p class="mt-1 max-w-2xl text-sm text-gray-500">tags</p>
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
                      desc
                    </dd>
                  </div>
                  <!---- status ---->
                  <div
                    class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-gray-500">Status</dt>
                    <dd
                      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                    ></dd>
                    status
                  </div>
                  <!---- assigned ---->
                  <div
                    class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-gray-500">Assigned</dt>
                    <dd
                      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                    >
                      assigned
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div
              class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
            >
              <button
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="$emit('close-modal')"
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

<script>
import {
  Dialog,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { PaperClipIcon } from '@heroicons/vue/solid';
import { defineComponent, ref } from 'vue';
import VueMultiselect from 'vue-multiselect';
import columnCrud from '../modules/columnCrud';
import taskCrud from '../modules/taskCrud';

export default defineComponent({
  props: ['id'],

  components: {
    PaperClipIcon,
    Dialog,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    VueMultiselect,
  },
  setup() {
    const { columnState } = columnCrud;
    const open = ref(false);
    const { taskState } = taskCrud();

    return {
      open,
      columnState,
      taskState,
    };
  },
  methods: {},
});
</script>

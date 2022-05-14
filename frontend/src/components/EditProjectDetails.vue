<template>
  <TransitionRoot as="template" :show="open">
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
              <div class="px-4 py-5 sm:px-6">
                <h3 class="mt-0 text-lg leading-6 font-medium text-gray-900">
                  <div>
                    <label class="font-bold text-sm text-gray-700" for="title"
                      > Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      name="title"
                      required
                      class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                  </div>
                </h3>
              </div>
              <div class="border-t border-gray-200">
                <dl>
                  <div
                    class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-gray-500">
                      Description
                    </dt>
                    <dd
                      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                    >
                      <textarea
                        id="description"
                        type="text"
                        name="description"
                        required
                        class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      />
                    </dd>
                  </div>
                  <!-- deadline -->
                  <div
                    class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-gray-500">Deadline</dt>
                    <dd
                      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                    >
                      <input
                        id="date"
                        type="date"
                        name="date"
                        required
                        class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      />
                    </dd>
                  </div>
                  <!-- tags -->
                  <div
                    class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-gray-500">Tags</dt>
                    <dd
                      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                    >
                      <!-- tags -->
                      <Disclosure
                   
                        v-for="section in filters"
                        :key="section.id"
                        v-slot="{ open }"
                      >
                        <h3 class="-my-3 flow-root">
                          <DisclosureButton
                            class="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
                          >
                            <span class="font-medium text-gray-900">
                              {{ section.name }}
                            </span>
                            <span class="ml-6 flex items-center">
                              <PlusSmIcon
                                v-if="!open"
                                class="h-5 w-5"
                                aria-hidden="true"
                              />
                              <MinusSmIcon
                                v-else
                                class="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          </DisclosureButton>
                        </h3>

                        <DisclosurePanel class="pt-6">
                          <div class="space-y-4">
                            <div
                              v-for="(option, optionIdx) in section.options"
                              :key="option.value"
                              class="flex items-center"
                            >
                              <input
                                :id="`filter-${section.id}-${optionIdx}`"
                                :name="`${section.id}[]`"
                                :value="option.value"
                                type="checkbox"
                                :checked="option.checked"
                                class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                :for="`filter-${section.id}-${optionIdx}`"
                                class="ml-3 text-sm text-gray-600"
                              >
                                {{ option.label }}
                              </label>
                            </div>
                          </div>
                        </DisclosurePanel>
                      </Disclosure>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div
              class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
            >
              <!-- <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" @click="open = false">Deactivate</button> -->
              <button
                @click="
                  updateProjectDetails(
                    project._id,
                    project.title,
                    project.description,
                    project.tags)">
                edit
              </button>
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
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';

import {
  PaperClipIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
} from '@heroicons/vue/solid';
import projectCrud from '../modules/projectCrud';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    PaperClipIcon,
    Dialog,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    FilterIcon,
    MinusSmIcon,
    PlusSmIcon,
  },
  setup() {
    const {
      projectState,
      projectId,
      getSpecificProject,
      updateProjectDetails,
    } = projectCrud();

    getSpecificProject();

    const open = ref(false);
    const filters = [
      {
        id: 'tag',
        name: 'Tags',
        options: [
          { value: 'white', label: 'White', checked: false },
          { value: 'beige', label: 'Beige', checked: false },
          { value: 'blue', label: 'Blue', checked: true },
          { value: 'brown', label: 'Brown', checked: false },
          { value: 'green', label: 'Green', checked: false },
          { value: 'purple', label: 'Purple', checked: false },
        ],
      },
    ];

    return {
      open,
      projectState,
      projectId,
      updateProjectDetails,
      filters,
    };
  },
});
</script>

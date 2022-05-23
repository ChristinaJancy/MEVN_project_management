<template>
  <div class="flex flex-col mt-8">
    <div>
      <router-link to="/templates/new-template">
        <button
          type="button"
          class="button mb-2 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
        >
          Create template
        </button></router-link
      >
    </div>
    <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div
        class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
      >
        <table class="min-w-full">
          <thead>
            <tr class="relative">
              <!-- Tag label and color -->
              <th
                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Title
              </th>
              <th
                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Columns
              </th>
              <!-- delete/edit -->
              <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>

              <div
                class="absolute right-0 top-0 px-6 py-3 text-xs font-medium leading-4 tracking-wider uppercase"
              >
                <a
                  href="#"
                  class="text-indigo-600 hover:text-indigo-900"
                  @click="toggleEditing()"
                >
                  <span v-if="!isEditing">Edit templates</span>
                  <span v-else>Stop editing</span>
                </a>
              </div>
            </tr>
          </thead>

          <tbody class="bg-white">
            <tr v-for="template in templateState.templates" :key="template._id">
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                <div
                  class="text-sm font-medium leading-5 text-gray-900"
                  v-if="!isEditing"
                >
                  {{ template.name }}
                </div>

                <div class="text-sm font-medium leading-5 text-gray-900" v-else>
                  <input type="text" v-model="template.name" />
                </div>

                <div class="text-sm leading-5 text-gray-500" v-if="!isEditing">
                  {{ template.description }}
                </div>
                <div class="text-sm font-medium leading-5 text-gray-900" v-else>
                  <textarea type="text" v-model="template.description" />
                </div>
              </td>

              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                <div v-if="!isEditing">
                  {{ template.columns.join(', ') }}
                </div>
                <div v-else>
                  <div
                    class="text-sm font-medium leading-5 text-gray-900"
                    v-for="(column, index) in template.columns"
                    :key="index"
                  >
                    <div class="inline-flex">
                      <input type="text" v-model="template.columns[index]" />
                      <TrashIcon
                        class="button h-5 w-5 my-auto ml-2 text-sm font-medium leading-5 text-red-800 hover:text-red-700 focus:outline-none focus:text-gray-900"
                        type="button"
                        @click="removeColumn(index)"
                      />
                    </div>
                  </div>
                  <button
                    class="button h-5 w-5 my-auto ml-2 text-sm font-medium leading-5 text-indigo-800 hover:text-indigo-700 focus:outline-none focus:text-gray-900"
                    id="blue-button"
                    type="button"
                    @click="addColumn()"
                  >
                    <span class="inline-flex">
                      <PlusIcon class="h-5 w-5" />Add column</span
                    >
                  </button>
                </div>
              </td>
              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
              >
                <!-- <a
                  href="#"
                  class="text-indigo-600 hover:text-indigo-900 text-xs font-medium leading-4 tracking-wider uppercase"
                  @click="toggleEditing()"
                >
                  <span v-if="!isEditing">Edit</span>
                  <span v-else>Cancel</span>
                </a> -->
                <!-- " -->
                <a
                  href="#"
                  class="text-indigo-600 hover:text-indigo-900"
                  v-if="isEditing"
                  @click="
                    updateTemplate(
                      template._id,
                      template.name,
                      template.description,
                      template.columns
                    )
                  "
                  >Save</a
                >
                <br />
                <br />
                <a
                  href="#"
                  class="text-red-600 hover:text-indigo-900"
                  @click="deleteTemplate(template._id)"
                  >Delete</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import templateCrud from '../modules/templateCrud';
import { onMounted, defineComponent, ref } from 'vue';
import { TrashIcon, PlusIcon } from '@heroicons/vue/solid';
export default defineComponent({
  async setup() {
    const { templateState, getAllTemplates, updateTemplate, deleteTemplate } =
      templateCrud();
    onMounted(() => {
      getAllTemplates();
    });

    const isEditing = ref(false);

    await getAllTemplates();

    return {
      templateState,
      updateTemplate,
      deleteTemplate,
      isEditing,
    };
  },
  components: {
    TrashIcon,
    PlusIcon,
  },
  methods: {
    toggleEditing() {
      this.isEditing = !this.isEditing;
    },
    addColumn() {
      this.templateState.templates[0].columns.push('');
    },
    removeColumn(index) {
      this.templateState.templates[0].columns.splice(index, 1);
    },
  },
});
</script>

<style scoped></style>

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
            </tr>
          </thead>

          <tbody class="bg-white">
            <tr v-for="template in templateState.templates" :key="template._id">
              <!-- title and description -->
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                <div
                  class="text-sm font-medium leading-5 text-gray-900"
                  v-if="template._id !== templateState.selectedTemplateId"
                >
                  {{ template.title }}
                </div>

                <div class="text-sm font-medium leading-5 text-gray-900" v-else>
                  <input type="text" v-model="template.title" />
                </div>

                <div
                  class="text-sm leading-5 text-gray-500"
                  v-if="template._id !== templateState.selectedTemplateId"
                >
                  {{ template.description }}
                </div>
                <div class="text-sm font-medium leading-5 text-gray-900" v-else>
                  <textarea type="text" v-model="template.description" />
                </div>
              </td>

              <!-- columns -->
              <td class="px-6 py-4 text-sm font-medium leading-5 text-gray-900 border-b border-gray-200 whitespace-nowrap">
                <div v-if="template._id !== templateState.selectedTemplateId">
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
                    @click="addColumn(template._id)"
                  >
                    <span class="inline-flex">
                      <PlusIcon class="h-5 w-5" />Add column</span
                    >
                  </button>
                </div>
              </td>
              <td
                class="relative px-4 py-4 text-right border-b border-gray-200 whitespace-nowrap"
              >
                <a
                  href="#"
                  class="absolute top-2 right-4 text-xs font-bold leading-4 tracking-wider uppercase"
                  v-if="template._id == templateState.selectedTemplateId"
                  @click="
                    updateTemplate(
                      template._id,
                      template.title,
                      template.description,
                      template.columns
                    ) && (templateState.selectedTemplateId = '')
                  "
                  ><span class="text-green-700 hover:text-green-600">Save</span>
                </a>
                <!-- cancel/edit  -->
                <a
                  href="#"
                  class="text-xs tracking-wider uppercase"
                  @click="editTemplateInfo(template._id)"
                >
                  <span
                    class="absolute bottom-2 right-4 text-gray-400 hover:text-gray-700 font-medium"
                    v-if="template._id === templateState.selectedTemplateId"
                  >
                    Cancel
                  </span>
                  <span
                    class="absolute top-2 right-4 text-indigo-600 hover:text-indigo-500"
                    v-else
                    >Edit</span
                  >
                </a>
                <a
                  v-if="template._id !== templateState.selectedTemplateId"
                  href="#"
                  class="absolute bottom-2 right-4 text-red-700 hover:text-red-500 text-xs font-bold leading-4 tracking-wider uppercase"
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

    await getAllTemplates();

    return {
      templateState,
      updateTemplate,
      deleteTemplate,
    };
  },
  components: {
    TrashIcon,
    PlusIcon,
  },
  methods: {
    editTemplateInfo(id: string) {
      // this method checks if the template id is the same as the being selected.
      // if it is, it will set the selectedTemplateId to null.
      // if it is not, it will set the selectedTemplateId to the id of the template being clicked.

      if (this.templateState.selectedTemplateId === id) {
        this.templateState.selectedTemplateId = '';
        return true;
      } else {
        this.templateState.selectedTemplateId = id;
        return false;
      }
    },

    addColumn(templateId: string) {
      // this method adds a column to the template with the id of the template being clicked.
      // it will add a new column to the template with the id of the template being clicked.
      this.templateState.templates.forEach((template) => {
        if (template._id === templateId) {
          template.columns.push('');
        }
      });
    },
    removeColumn(index) {
      this.templateState.templates[0].columns.splice(index, 1);
    },
  },
});
</script>

<style scoped></style>

<template>
  <div class="bg-white rounded max-w-full shadow-sm p-4 mr-2 space-y-4"
  >
    <!-- title -->
    <div class="grid grid-cols-3 gap-6">
      <div class="col-span-3 sm:col-span-2">
        <label for="title" class="block text-sm  font-medium text-gray-700"
          >Title</label
        >
        <div class="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            name="project-title"
            v-model="projectState.title"
            id="project-title"
            class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
            placeholder="Project title"
          />
        </div>
      </div>
    </div>

    <!------------ Description ------------>
    <div>
      <label for="about" class="block text-sm font-medium text-gray-700"
        >Description</label
      >
      <div class="mt-1">
        <textarea
          id="about"
          name="about"
          rows="3"
          v-model="projectState.description"
          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          placeholder="Brief description of the project..."
        />
      </div>
      <!-- <p class="mt-2 text-sm text-gray-500">Brief description of the project.</p> -->
    </div>

    <!------------ Tags------------>
    <div>
      <label for="about" class="block text-sm font-medium text-gray-700"
        >Tags</label
      >
      <!-- :options="tagState.tags.map((tag ) => tag.title)" -->
      <VueMultiselect
        v-model="projectState.tags"
        :options="tagState.tags"
        :value="tagState.tags"
        :multiple="true"
        :close-on-select="true"
        placeholder="Pick some"
        label="title"
        track-by="title"
      />
    </div>

    <!------------ Assigned ------------>
    <div>
      <label for="about" class="block text-sm font-medium text-gray-700"
        >Assign members</label
      >
      <VueMultiselect
        v-model="projectState.assigned"
        :options="state.users"
        :value="state.users"
        :multiple="true"
        :close-on-select="false"
        placeholder="Pick some"
        label="name"
        track-by="name"
      />
    </div>

    <!------------ Columns ------------>
    <div>
      <label for="about" class="block text-sm font-medium text-gray-700"
        >Project template</label
      >
      <VueMultiselect
        v-model="projectState.columns"
        :options="templateState.templates"
        :value="templateState.templates"
        :multiple="false"
        :close-on-select="true"
        label="title"
        track-by="title"
      />
    </div>

    <!------------ Deadline ------------>
    <div class="mt-6">
      <label for="deadline" class="block text-sm font-medium text-gray-700"
        >Deadline</label
      >
      <div class="mt-1">
        <input
          type="date"
          name="deadline"
          v-model="projectState.deadline"
          id="deadline"
          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          placeholder="Deadline"
        />
      </div>
    </div>
    <div class="px-4 py-3 text-right sm:px-6">
      <button
        type="submit"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        @click="createProject()"
      >
        Create
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid';
import VueMultiselect from 'vue-multiselect';
import projectCrud from '../../modules/projectCrud';
import userCrud from '../../modules/userCrud';
import tagCrud from '../../modules/tagCrud';
import templateCrud from '../../modules/templateCrud';
// tailwind
export default defineComponent({
  components: {
    CheckIcon,
    SelectorIcon,
    VueMultiselect,
  },
  async setup() {
    const { projectState, createProject } = projectCrud();
    const { state, userId, getAllUsers } = userCrud();
    const { tagState, tagId, getAllTags } = tagCrud();
    const { templateState, getAllTemplates } = templateCrud();
    // const { columnState, columnId, getAllColumns } = columnCrud();

    onMounted(() => {
      getAllTags();
      getAllUsers();
      getAllTemplates();
    });

    await getAllTags();
    await getAllUsers();
    await getAllTemplates();

    return {
      createProject,
      projectState,
      tagState,
      state,
      templateState,
      userId,
      tagId,
    };
  },
  methods: {},
});
</script>

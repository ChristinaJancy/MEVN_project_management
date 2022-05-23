<template>
  <div class="bg-white rounded max-w-full shadow-sm p-4 mr-2 space-y-4">
    <!-- title -->
    <div class="grid grid-cols-3 gap-6">
      <div class="col-span-12">
        <label for="title" class="block text-sm font-medium text-gray-700"
          >Name</label
        >
        <div class="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            name="template-name"
            v-model="templateState.name"
            id="template-name"
            placeholder="Template name"
          />
        </div>
      </div>

      <!------------ Description ------------>

      <div class="col-span-12">
        <label for="title" class="block text-sm font-medium text-gray-700"
          >Description</label
        >
        <textarea
          type="text"
          class="text-sm font-medium leading-5 text-gray-900"
          v-model="templateState.description"
        />
      </div>

      <!------------ Columns ------------>
      <div class="col-span-12">
        <label for="title" class="block text-sm font-medium text-gray-700"
          >Column titles</label
        >
        <VueMultiselect
          v-model="templateState.columns"
          :value="templateState.columns"
          :options="options"
          :multiple="true"
          :taggable="true"
          :close-on-select="false"
          placeholder="Name of columns..."
          :showNoOptions="false"
          :label="title"
          :track-by="title"
          @remove="removeTag"
          @tag="addTag"
        />
      </div>
    </div>
    <div class="px-2 pt-3 text-right sm:px-6">
      <button
        type="submit"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        @click="createTemplate()"
      >
        Create
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TrashIcon, PlusIcon } from '@heroicons/vue/solid';
import templateCrud from '../../modules/templateCrud';
import VueMultiselect from 'vue-multiselect';
// tailwind
export default defineComponent({
  components: {
    VueMultiselect,
    TrashIcon,
    PlusIcon,
  },
  setup() {
    const { templateState, createTemplate } = templateCrud();

    return {
      templateState,
      createTemplate,
      value: [''],
      options: [],
    };
  },
  methods: {
    addTag(newTag) {
      this.templateState.columns.push(newTag);
    },
    removeTag(newTag) {
      const index = this.value.indexOf(newTag);
      this.value.splice(index, 1);
    },
  },
});
</script>

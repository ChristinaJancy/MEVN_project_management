<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Create a new project</h3>
    <div class="mt-8"></div>
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="mt-5 md:mt-0 md:col-span-2">
        <!-- form -->
        <div>
          <div class="shadow sm:rounded-md">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <!-- title -->
              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-3 sm:col-span-2">
                  <label
                    for="title"
                    class="block text-sm font-medium text-gray-700"
                    >Title</label
                  >
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="project-title"
                      v-model="projectState.title"
                      id="project-title"
                      class="
                        focus:ring-indigo-500 focus:border-indigo-500
                        flex-1
                        block
                        w-full
                        rounded-md
                        sm:text-sm
                        border-gray-300
                      "
                      placeholder="Project title"
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
                    v-model="projectState.description"
                    class="
                      shadow-sm
                      focus:ring-indigo-500 focus:border-indigo-500
                      mt-1
                      block
                      w-full
                      sm:text-sm
                      border border-gray-300
                      rounded-md
                    "
                    placeholder="Brief description of the project..."
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
                <Multiselect
                  v-model="projectState.tags"
                  mode="tags"
                  placeholder="Select tags"
                  :close-on-select="false"
                  :searchable="true"
                  :create-option="true"
                  :options="tagState.tags.map((tag) => tag.name)"
                />
              </div>

              <!------------ Assigned ------------>
              <div>
                <label
                  for="about"
                  class="block text-sm font-medium text-gray-700"
                  >Assign members</label
                >
                <Multiselect
                  v-model="projectState.assigned"
                  mode="tags"
                  placeholder="Assign members"
                  :close-on-select="false"
                  :searchable="true"
                  :create-option="true"
                  label="name"
                  :options="state.users.map((user) => user.name)"
                >
                </Multiselect>
              </div>

              <!------------ Columns ------------>
              <div>
                <label
                  for="about"
                  class="block text-sm font-medium text-gray-700"
                  >Assign members</label
                >
                <Multiselect
                  v-model="projectState.columns"
                  mode="tags"
                  placeholder="Columns"
                  :close-on-select="false"
                  :searchable="true"
                  :create-option="true" 
                  label="title"
                  :options="columnState.columns.map((column) => column.title)"
                >
                </Multiselect>
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
                    v-model="projectState.deadline"
                    id="deadline"
                    class="
                      shadow-sm
                      focus:ring-indigo-500 focus:border-indigo-500
                      mt-1
                      block
                      w-full
                      sm:text-sm
                      border border-gray-300
                      rounded-md
                    "
                    placeholder="Deadline"
                  />
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-indigo-500
                "
                @click="createProject()"
              >
                Create
              </button>
            </div>
          </div>
        </div>
        <!-- /form end -->
      </div>
    </div>
  </div>
</template>


<script lang="ts" >
import { defineComponent, onMounted } from "vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import Multiselect from "@vueform/multiselect";
import projectCrud from "../modules/projectCrud";
import userCrud from "../modules/userCrud";
import tagCrud from "../modules/tagCrud";
import columnCrud from "../modules/columnCrud";

// tailwind

export default defineComponent({
  components: {
    CheckIcon,
    SelectorIcon,
    Multiselect,
  },
  setup() {
    const { projectState, createProject } = projectCrud();
    const { state, userId, getAllUsers } = userCrud();
    const { tagState, tagId, getAllTags } = tagCrud();
    const { columnState, columnId, getAllColumns } = columnCrud();

    onMounted(() => {
      getAllTags();
      getAllUsers();
      getAllColumns();
    });

    getAllTags();
    getAllUsers();
    getAllColumns();

    return {
      createProject,
      projectState,
      tagState,
      state,
      columnState,
      userId,
      tagId,
      columnId,
    };
  },

  methods: {
    // columns() {
    //   let title = this.columnState.columns.map((column: any) => column.title);
    //   return title;
    // },
    // tags() {
    //   let name = this.tagState.tags.map((tag: any) => tag.name);
    //   return name;
    // },
    // assigned() {
    //   let name = this.state.users.map((user: any) => user.name);
    //   return name;
    // },
  },
});
</script>


<style src="@vueform/multiselect/themes/default.css"></style>
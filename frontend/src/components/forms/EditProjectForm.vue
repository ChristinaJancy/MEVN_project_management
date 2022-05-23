<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div v-for="project in projectState" :key="project._id">
      <div class="max-w-md w-full space-y-8">
        <h2 class="font-bold text-3xl text-gray-900">
          Update project info✍️(◔◡◔)
        </h2>

        <div class="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <!------ User name ------>
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label class="font-bold text-sm text-gray-700" for="title"
                >Title</label
              >
              <input
                id="title"
                title="title"
                type="text"
                v-model="project.title"
                required
                class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <!------ User email ------>
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label class="font-bold text-sm text-gray-700" for="description"
                >Description</label
              >
              <input
                id="description"
                name="description"
                type="text"
                v-model="project.description"
                required
                class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>
          <!-- deadline -->
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label class="font-bold text-sm text-gray-700" for="deadline"
                >Deadline</label
              >
              <input
                id="deadline"
                name="deadline"
                type="date"
                v-model="project.deadline"
                required
                class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>
          <!------------ Tags------------>
          <div>
            <label for="about" class="block text-sm font-medium text-gray-700"
              >Tags</label
            >
            <!-- <div v-for="tag in tagState.tags" :key="tag._id" :value="tag">
              <input
                type="checkbox"
                name=""
                :value="tag"
                v-model="project.tags"
                class="btn-check"
                :id="tag.id"
                autocomplete="off"
              />
              <label class="btn btn-outline-primary" :for="tag.id">
                {{ tag.name }}</label
              >
            </div> -->

            <!-- tags -->
            <VueMultiselect
              v-model="project.tags"
              :options="tagState.tags"
              :value="project.tags"
              :multiple="true"
              :close-on-select="true"
              placeholder="Pick some"
              label="title"
              track-by="title"
            />
          </div>
          <!------------ Tags------------>
          <div>
            <label for="about" class="block text-sm font-medium text-gray-700"
              >Assigned</label
            >
            <!-- assigned -->
            <VueMultiselect
              v-model="project.assigned"
              :options="state.users"
              :value="project.assigned"
              :multiple="true"
              :close-on-select="true"
              placeholder="Pick some"
              label="title"
              track-by="title"
            />
          </div>
          <div>
            <!-- edit button -->
            <button
              @click="
                updateProjectDetails(
                  project._id,
                  project.title,
                  project.description,
                  project.deadline,
                  project.tags,
                  project.assigned
                )
              "
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Update info
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import projectCrud from '../../modules/projectCrud';
import userCrud from '../../modules/userCrud';
import tagCrud from '../../modules/tagCrud';
import { LockClosedIcon } from '@heroicons/vue/solid';
import { defineComponent, onMounted } from 'vue';
import VueMultiselect from 'vue-multiselect';
export default defineComponent({
  components: {
    LockClosedIcon,
    VueMultiselect,
  },
  async setup() {
    const {
      projectState,
      projectId,
      getSpecificProject,
      updateProjectDetails,
    } = projectCrud();
    const { state, userId, getAllUsers } = userCrud();
    const { tagState, tagId, getAllTags } = tagCrud();

    onMounted(() => {
      getAllTags();
      getAllUsers();
    });
    await getAllTags();
    await getAllUsers();
    await getSpecificProject();

    return {
      projectState,
      state,
      tagState,
      projectId,
      tagId,
      updateProjectDetails,
      userId,
    };
  },
});
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

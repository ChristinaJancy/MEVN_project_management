<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div>
      <div class="max-w-md w-full space-y-8">
        <h2 class="font-bold text-3xl text-gray-900">
          Update task info✍️(◔◡◔)
        </h2>

        <div class="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <!------ User name ------>
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label class="font-bold text-sm text-gray-700" for="title"
                >Name</label
              >
              <input
                id="title"
                title="title"
                type="text"
                v-model="taskState.name"
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
                v-model="taskState.description"
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
            <VueMultiselect
              v-model="taskState.tags"
              :options="tagState.tags"
              :value="taskState.tags"
              :multiple="true"
              :close-on-select="true"
              placeholder="Pick some"
              label="name"
              track-by="name"
            />
          </div>
          <!------- deadline ------->
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label class="font-bold text-sm text-gray-700" for="deadline"
                >Deadline</label
              >
              <input
                id="deadline"
                name="deadline"
                type="date"
                v-model="taskState.deadline"
                required
                class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <!------------ Assigned ------------>
          <div>
            <label for="about" class="block text-sm font-medium text-gray-700"
              >Assigned</label
            >
            <!-- assigned -->
            <VueMultiselect
              v-model="taskState.assigned"
              :options="state.users"
              :value="taskState.assigned"
              :multiple="true"
              :close-on-select="true"
              placeholder="Pick some"
              label="name"
              track-by="name"
            />
          </div>

          <!------------ Status ------------>
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700"
              >Status</label
            >
            <select name="status" id="" v-model="taskState.status">
              <option :value="taskState.status" disabled selected>
                <span class="text-xs">{{ taskState.status }}</span>
              </option>
              <option
                v-for="status in statusOptions"
                :key="status"
                :value="status.status"
              >
                <span>{{ status.status }}</span>
              </option>
            </select>
          </div>
          <div>
            <!-- edit button -->
            <button
              @click="
                updateTask(
                  taskId,
                  taskState.name,
                  taskState.description,
                  taskState.deadline,
                  taskState.tags,
                  taskState.assigned,
                  taskState.status
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
import userCrud from '../modules/userCrud';
import tagCrud from '../modules/tagCrud';
import taskCrud from '../modules/taskCrud';
import { LockClosedIcon } from '@heroicons/vue/solid';
import { defineComponent, onMounted } from 'vue';
import VueMultiselect from 'vue-multiselect';
export default defineComponent({
  components: {
    LockClosedIcon,
    VueMultiselect,
  },
  async setup() {
    const { taskState, taskId, updateTask, getSpecificTask } = taskCrud();
    const { state, userId, getAllUsers } = userCrud();
    const { tagState, tagId, getAllTags } = tagCrud();

    onMounted(() => {
      getAllTags();
      getAllUsers();
    });

    await getSpecificTask();
    await getAllTags();
    await getAllUsers();

    const statusOptions = [
      { status: 'Not started' },
      { status: 'In Progress' },
      { status: 'Done' },
    ];
    return {
      state,
      taskState,
      tagState,
      taskId,
      tagId,
      userId,
      updateTask,
      statusOptions,
    };
  },
});
</script>

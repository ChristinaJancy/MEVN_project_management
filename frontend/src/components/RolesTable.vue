<template>
  <div class="flex flex-col mt-8">
    <div>
      <router-link to="/roles/new-role">
        <button
          type="button"
          class="button mb-2 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
        >
          Create Roles
        </button>
      </router-link>
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
               Role
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
                  v-if="!isEditing"
                  >Edit tags</a
                >
                <a
                  href="#"
                  class="text-indigo-600 hover:text-indigo-900"
                  @click="stopEditing()"
                  v-else
                  >Stop editing</a
                >
              </div>
            </tr>
          </thead>

          <tbody class="bg-white">
            <tr v-for="role in roleState.roles" :key="role._id">
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="rounded-full w-10 h-10 relative"
                    style="overflow: hidden"
                  >
                    <input
                      class="w-20 h-20 absolute -bottom-4 -left-4"
                      type="color"
                      id="head"
                      name="head"
                      v-model="role.color"
                    />
                  </div>

                  <div class="ml-4">
                    <div
                      class="text-sm font-medium leading-5 text-gray-900"
                      v-if="!isEditing"
                    >
                      {{ role.title }}
                    </div>

                    <div
                      class="text-sm font-medium leading-5 text-gray-900"
                      v-else
                    >
                      <input type="text" v-model="role.title" />
                    </div>

                    <div class="text-sm leading-5 text-gray-500">
                      {{ role.color }}
                    </div>
                  </div>
                </div>
              </td>
              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
              >
                <a
                  href="#"
                  class="text-indigo-600 hover:text-indigo-900"
                  v-if="isEditing"
                  @click="updateRole(role._id, role.title, role.color)"
                  >Save</a
                >
                <br />
                <br />
                <a
                  href="#"
                  class="text-red-600 hover:text-indigo-900"
                  @click="deleteRole(role._id)"
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
import roleCrud from '../modules/roleCrud';
import { onMounted, defineComponent, ref } from 'vue';

export default defineComponent({
  async setup() {
    const { roleState, roleId, getAllRoles, deleteRole, updateRole } =
      roleCrud();
    onMounted(() => {
      getAllRoles();
    });

    const isEditing = ref(false);

    await getAllRoles();

    return {
      roleState,
      roleId,
      getAllRoles,
      deleteRole,
      updateRole,
      isEditing,
    };
  },

  methods: {
    toggleEditing() {
      this.isEditing = true;
    },
    stopEditing() {
      this.isEditing = false;
    },
  },
});
</script>

<style scoped></style>

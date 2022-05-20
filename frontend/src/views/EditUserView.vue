<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-6 bg-white shadow-lg rounded-lg p-8">

      <h2 class="font-bold text-3xl my-1 text-gray-900">Update info ✍️(◔◡◔)</h2>

      <div class="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />

        <!------ User name ------>
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label class="font-bold text-sm text-gray-700" for="name">Name</label>
            <input id="name" name="name" type="name" v-model="state.name" required
              class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          </div>
        </div>

        <!------ User email ------>
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label class="font-bold text-sm text-gray-700" for="email-address">Email address</label>
            <input id="email-address" name="email" type="email" v-model="state.email" required
              class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          </div>
        </div>
        <!------------ Tags------------>
        <div>
          <label for="about" class="block text-sm font-medium text-gray-700">Roles</label>
          <VueMultiselect v-model="state.roles" :options="roleState.roles" :value="state.roles" :multiple="true"
            :close-on-select="true" placeholder="Pick some" label="title" track-by="title"/>
        </div>
        <div>
          <button @click="updateUser(userId, state.name, state.email, state.roles)" type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            Update info
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import userCrud from '../modules/userCrud';
import roleCrud from '../modules/roleCrud';
import { LockClosedIcon } from '@heroicons/vue/solid';
import VueMultiselect from 'vue-multiselect';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  components: {
    LockClosedIcon,
    VueMultiselect,
  },

  setup() {
    const { state, userId, getSpecificUser, updateUser } = userCrud();
    const { roleState, roleId, getAllRoles } = roleCrud();

    onMounted(() => {
      getAllRoles();
    });

    getAllRoles();
    getSpecificUser();

    return { state, roleState, userId, roleId, updateUser };
  },
});
</script>

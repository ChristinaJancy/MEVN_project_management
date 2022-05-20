<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-6 bg-white shadow-lg rounded-lg p-8">
      <div class="flex justify-between">
        <h2 class="font-bold my-1 text-3xl text-gray-900">Profile</h2>
        <div :style="'background-color:' + state.roles[0].color"
          class="relative block w-12 h-12 overflow-hidden rounded-full shadow focus:outline-none flex-shrink-0 flex items-center justify-center">
        <div
              class="text-center text-lg font-bold text-white"
              v-if="state.initials"
            >
              {{ state.initials }}
            </div>
        </div>
      </div>

      <div class="mt-8 space-y-6">
        <!------ User name ------>
        <div class="rounded-md -space-y-px">
          <label class="font-bold text-sm text-gray-700" for="email-address">Name</label>
          <div>
            <p class="text-gray-900">{{ state.name }}</p>
          </div>
        </div>
        <!------ User email ------>
        <div class="rounded-md -space-y-px">
          <label class="font-bold text-sm text-gray-700" for="email-address">Email</label>
          <div>
            <p class="text-gray-900">{{ state.email }}</p>
          </div>
        </div>
        <div class="rounded-md -space-y-px">
          <label class="font-bold text-sm text-gray-700" for="email-address">Roles</label>
          <div>
            <div v-for="(role, index) in state.roles" :key="index" class="text-gray-900 inline-flex">
              {{ role.title }}
              <span v-if="index != Object.keys(state.roles).length - 1">,&nbsp;</span>
            </div>
          </div>
        </div>

        <div>
          <router-link :to="{
            name: 'user',
            params: {
              id: userId as string
            },
          }">
            <button type="button"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Edit
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import userCrud from '../modules/userCrud';
import { defineComponent } from 'vue';
import { LockClosedIcon } from "@heroicons/vue/solid";

export default defineComponent({
  components: {
    LockClosedIcon,
  },
  setup() {
    const { state, userId, getSpecificUser } = userCrud();

    getSpecificUser();

    return { state, userId };
  },
});
</script>

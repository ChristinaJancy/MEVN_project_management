<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Dashboard</h3>

    <div class="mt-8"></div>

    <div class="flex flex-col mt-8">
      <h4 class="text-1xl font-bold text-gray-700">All users</h4>
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="
            inline-block
            min-w-full
            overflow-hidden
            align-middle
            border-b border-gray-200
            shadow
            sm:rounded-lg
          "
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="
                    px-6
                    py-3
                    text-xs
                    font-medium
                    leading-4
                    tracking-wider
                    text-left text-gray-500
                    uppercase
                    border-b border-gray-200
                    bg-gray-50
                  "
                >
                  Name
                </th>
                <th
                  class="
                    px-6
                    py-3
                    text-xs
                    font-medium
                    leading-4
                    tracking-wider
                    text-left text-gray-500
                    uppercase
                    border-b border-gray-200
                    bg-gray-50
                  "
                >
                  Title
                </th>
                <th
                  class="
                    px-6
                    py-3
                    text-xs
                    font-medium
                    leading-4
                    tracking-wider
                    text-left text-gray-500
                    uppercase
                    border-b border-gray-200
                    bg-gray-50
                  "
                >
                  Role
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
              </tr>
            </thead>

            <tbody class="bg-white">
              <!-- <tr v-for="(u, index) in users" :key="index"> -->
              <tr v-for="user in state.users" :key="user._id">
                <td
                  class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                >
                  <div class="flex items-center">
                    <div
                      class="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <!-- <img
                        class="w-10 h-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                        style="opacity: 0"
                      /> -->
                      <div
                        class="text-center text-sm font-bold text-white"
                        v-if="user.initials"
                      >
                        {{ user.initials }}
                      </div>

                    </div>

                    <div class="ml-4">
                      <div class="text-sm font-medium leading-5 text-gray-900">
                        {{ user.name }}
                      </div>
                      <div class="text-sm leading-5 text-gray-500">
                        {{ user.email }}
                      </div>
                    </div>
                  </div>
                </td>

                <td
                  class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                >
                  <div class="text-sm leading-5 text-gray-900">
                    {{ user.title }} title
                  </div>
                </td>

                <td
                  class="
                    px-6
                    py-4
                    text-sm
                    leading-5
                    text-gray-500
                    border-b border-gray-200
                    whitespace-nowrap
                  "
                >
                  <p v-if="user.roles">
                    <span v-for="roles in user.roles" :key="roles">
                      {{ roles.title }}</span
                    >
                  </p>
                  <p v-else>No roles</p>
                </td>

                <td
                  class="
                    px-6
                    py-4
                    text-sm
                    font-medium
                    leading-5
                    text-right
                    border-b border-gray-200
                    whitespace-nowrap
                  "
                >
                  <a href="#" class="text-indigo-600 hover:text-indigo-900"
                    >Edit</a
                  ><br />
                  <a
                    href="#"
                    class="text-red-600 hover:text-indigo-900"
                    @click="deleteUser(user._id)"
                    >Delete</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<!--
<script setup lang="ts">
import { ref } from "vue";
interface User {
  name: string;
  email: string;
  title: string;
  title2: string;
  status: string;
  role: string;
}

// Temporary table with static data
const testUser: User = {
  name: "John Doe",
  email: "john@example.com",
  title: "Software Engineer",
  title2: "Web dev",
  status: "Active",
  role: "Owner",
};


const users = ref<User[]>([...Array(5).keys()].map(() => testUser));
</script>-->

<script lang="ts">
import userCrud from "../modules/userCrud";
import { onMounted } from "vue";

export default {
  setup() {
    const { state, getAllUsers, getSpecificUser, deleteUser } = userCrud();
    onMounted(() => {
      getAllUsers();
      getSpecificUser();
    });

    return { state, getAllUsers, getSpecificUser, deleteUser };
  },
};
</script>
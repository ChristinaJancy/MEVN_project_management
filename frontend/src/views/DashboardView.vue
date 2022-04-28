<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Dashboard</h3>

    <div class="mt-8"></div>

    <div class="grid grid-cols-12 mx-auto">
      <div class="col-span-6 mx-auto">
        <h3>All users</h3>
        <div v-for="user in state.users" :key="user._id">
          <router-link
            :to="{
              name: 'user',
              params: {
                id: user._id,
                email: user.email,
              },
            }"
          >
            <div class="flex items-center">
              <div class="w-1/4">
                <img :src="user.avatar" class="w-16 h-16 rounded-full" />
              </div>
              <div class="w-3/4">
                <h4 class="text-gray-700">{{ user.name }}</h4>
                <p class="text-gray-600">{{ user.email }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="col-span-6 mx-auto">
        <h3>User currently logged in</h3>
        <div></div>
      </div>
    </div>
    <div class="flex flex-col mt-8">
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
                  Status
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
              <tr v-for="(u, index) in users" :key="index">
                <td
                  class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                >
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <img
                        class="w-10 h-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>

                    <div class="ml-4">
                      <div class="text-sm font-medium leading-5 text-gray-900">
                        {{ u.name }}
                      </div>
                      <div class="text-sm leading-5 text-gray-500">
                        {{ u.email }}
                      </div>
                    </div>
                  </div>
                </td>

                <td
                  class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                >
                  <div class="text-sm leading-5 text-gray-900">
                    {{ u.title }}
                  </div>
                  <div class="text-sm leading-5 text-gray-500">
                    {{ u.title2 }}
                  </div>
                </td>

                <td
                  class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                >
                  <span
                    class="
                      inline-flex
                      px-2
                      text-xs
                      font-semibold
                      leading-5
                      text-green-800
                      bg-green-100
                      rounded-full
                    "
                    >{{ u.status }}</span
                  >
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
                  {{ u.role }}
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
    const { state, getAllUsers, getSpecificUser } = userCrud();
    onMounted(() => {
      getAllUsers();
      getSpecificUser();
    });

    return { state, getAllUsers, getSpecificUser };
  },
};
</script>
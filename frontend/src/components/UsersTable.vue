<template>
  <div class="flex flex-col mt-8">
    <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div
        class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
      >
        <table class="min-w-full">
          <thead>
            <tr>
              <!-- name -->
              <th
                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Name
              </th>
              <!-- title -->
              <th
                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Title
              </th>
              <!-- role -->
              <th
                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Role
              </th>
              <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
            </tr>
          </thead>

          <tbody class="bg-white">
            <!-- <tr v-for="(u, index) in users" :key="index"> -->
            <tr v-for="user in state.users" :key="user._id">
              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                <router-link
                  :to="{
                    name: 'profile',
                    params: {
                      id: user._id,
                    },
                  }"
                >
                  <div class="flex items-center">
                    <div v-if="user.roles[0]"
                      :style=" 'background-color:'+ user.roles[0].color "
                      class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    >
                      <div
                        class="text-center text-sm font-bold text-white"
                        v-if="user.initials"
                      >
                        {{ user.initials }}
                      </div>
                    </div>
                    <div v-else class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-indigo-600" >
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
                </router-link>
              </td>

              <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                <div class="text-sm leading-5 text-gray-900">
                  {{ user.title }}
                </div>
              </td>

              <td
                class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
              >
                <p v-if="user.roles">
                  <span v-for="roles in user.roles" :key="roles">
                    {{ roles.title }} <br
                  /></span>
                </p>
                <p v-else>No roles</p>
              </td>

              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
              >
                <router-link
                  :to="{
                    name: 'user',
                    params: {
                      id: user._id,
                    },
                  }"
                  class="text-indigo-600 hover:text-indigo-900"
                  >Edit</router-link
                ><br /><br />
                <a
                  href="#"
                  class="text-red-600 hover:text-indigo-900"
                  @click="deleteAUser(user._id)"
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
import userCrud from '../modules/userCrud';
import { onMounted, defineComponent, ref } from 'vue';
import { getCookie } from '../modules/cookie';

export default defineComponent({
  async setup() {
    const { state, userId, getAllUsers, deleteUser } = userCrud();
    onMounted(() => {
      getAllUsers();
    });

    await getAllUsers();

    return { state, userId, getAllUsers, deleteUser, getCookie };
  },
  methods: {
    deleteAUser(id: string) {
      //if logged in user === user to be deleted,
      //then js confirm to prevent accidental deletion of self
      let currentUserId = this.getCookie('id');
      if (currentUserId === id) {
        //if yes delete user, else do nothing
        if (confirm('Are you sure you want to delete your account?')) {
          this.deleteUser(id);
        }
      }
      //if it is not the same user, delete user without confirming
      else {
        this.deleteUser(id);
      }
    },
  },
});
</script>

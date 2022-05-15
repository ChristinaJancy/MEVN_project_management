<template>
  <div
    class="
      min-h-full
      flex
      items-center
      justify-center
      py-12
      px-4
      sm:px-6
      lg:px-8
    "
  >
    <div v-for="user in state" :key="user._id">
      <div class="max-w-md w-full space-y-8">
        <h2 class="font-bold text-3xl text-gray-900">Profile</h2>
    
          <div class="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <!------ User name ------>
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                <label
                  class="font-bold text-sm text-gray-700"
                  for="email-address"
                  >Name</label
                >
                <p class="text-gray-900">{{ user.name }}</p>
              </div>
            </div>
            <!------ User email ------>
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                <label
                  class="font-bold text-sm text-gray-700"
                  for="email-address"
                  >Email</label
                >
                <p class="text-gray-900">{{ user.email }}</p>
              </div>
            </div>

            <div>
              <router-link
                :to="{
                  name: 'user',
                  params: {
                    id: user._id,
                  },
                }"
              >
                <button
                  type="button"
                  class="
                    group
                    relative
                    w-full
                    flex
                    justify-center
                    py-2
                    px-4
                    border border-transparent
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
                >
                  <span
                    class="absolute left-0 inset-y-0 flex items-center pl-3"
                  >
                    <LockClosedIcon
                      class="
                        h-5
                        w-5
                        text-indigo-500
                        group-hover:text-indigo-400
                      "
                      aria-hidden="true"
                    />
                  </span>
                  Edit
                </button>
              </router-link>
            </div>
          </div>
      
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import userCrud from "../modules/userCrud";
import { defineComponent } from "vue";
// import { LockClosedIcon } from "@heroicons/vue/solid";

export default defineComponent({
  components: {
    // LockClosedIcon,
  },
  setup() {
    const { state, userId, getSpecificUser } = userCrud();

    getSpecificUser();

    return { state, userId };
  },
});
</script>
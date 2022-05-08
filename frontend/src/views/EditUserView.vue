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
    <div v-for="user in user" :key="user._id">
      <div class="max-w-md w-full space-y-8">
        <h2 class="font-bold text-3xl text-gray-900">Update info ✍️(◔◡◔)</h2>
        <!-- <form class="mt-8 space-y-6" action="#" method="POST"> -->

        <div class="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <!------ User name ------>
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label class="font-bold text-sm text-gray-700" for="name"
                >Name</label
              >

              <!--   v-model="state.newName"
                :placeholder="user.name" -->
              <input
                id="name"
                name="name"
                type="name"
                v-model="state.name"
                :placeholder="user.name"
                required
                class="
                  relative
                  block
                  w-full
                  px-3
                  py-2
                  border border-gray-300
                  placeholder-gray-500
                  text-gray-900
                  rounded-t-md
                  focus:outline-none
                  focus:ring-indigo-500
                  focus:border-indigo-500
                  focus:z-10
                  sm:text-sm
                "
              />
            </div>
          </div>
          <!------ User email ------>
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label class="font-bold text-sm text-gray-700" for="email-address"
                >Email address</label
              >
              <input
                id="email-address"
                name="email"
                type="email"
                v-model="state.email"
                :placeholder="user.email"
                required
                class="
                  appearance-none
                  rounded-none
                  relative
                  block
                  w-full
                  px-3
                  py-2
                  border border-gray-300
                  placeholder-gray-500
                  text-gray-900
                  rounded-t-md
                  focus:outline-none
                  focus:ring-indigo-500
                  focus:border-indigo-500
                  focus:z-10
                  sm:text-sm
                "
              />
            </div>
          </div>

          <div>
            <button
              @click="updateUser(user._id)"
              type="submit"
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
import userCrud from "../modules/userCrud";

// import LockClosedIcon from "@heroicons/vue/solid";

export default {
  // components: {
  //   LockClosedIcon,
  // },

  setup() {
    const { state, user, userId, getSpecificUser, updateUser } = userCrud();
    getSpecificUser();

    return { state, user, userId, updateUser };
  },
};
</script>
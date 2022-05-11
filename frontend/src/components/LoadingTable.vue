<template>
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
                Loading...
              </th>
            </tr>
          </thead>

          <tbody class="bg-white">
            <Loading
              style="display: block; margin-left: auto; margin-right: auto"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Loading from "./Loading.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Loading,
  },
  setup() {
    return {};
  },
});
</script>
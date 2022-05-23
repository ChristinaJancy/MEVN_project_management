<template>
   <h5 class="m-1 text-1xl font-bold text-gray-700" v-text="title"></h5>
    <div class="max-h-96 overflow-y-scroll space-y-3 w-full">
      <div class="bg-white rounded max-w-full shadow-sm p-4 mr-2 space-y-2">
        <p class="font-medium text-xl"></p>
        <p class="font-light"></p>
        <p class="italic font-normal"></p>
        <Loading />
        <div class="flex w-full justify-end flex-wrap">
          <div
            style="
              display: flex;
              justify-content: space-between;
              flex-direction: row-reverse;
              align-items: flex-end;
            "
          >
            <p class="text-sm font-medium px-2 mt-1 mr-2 py-0.5 rounded-full">
              <span> </span>
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Loading from './Loading.vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    Loading,
  },
});
</script>

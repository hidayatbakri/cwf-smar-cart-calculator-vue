<template>
  <div
    class="fixed flex justify-center items-center w-screen h-screen backdrop-opacity-15 bg-black/20 left-0 top-0 z-999"
  >
    <div class="modal bg-white w-xl p-5 rounded">
      <div class="header border-b border-slate-200 pb-3 flex justify-between">
        <h1 class="text-slate-700 font-semibold">Change Data</h1>
        <button
          @click="emit('handle-modal')"
          class="border rounded w-8 h-8 border-slate-300 text-slate-700 hover:bg-slate-200 cursor-pointer"
        >
          <i class="bi bi-x"></i>
        </button>
      </div>
      <div class="content py-10">
        <div class="form-group flex flex-col gap-3 mb-3">
          <label for="tax" class="text-slate-700 font-light">Tax (%)</label>
          <input
            type="text"
            class="outline -outline-offset-2 outline-slate-400 h-10 p-2 rounded text-slate-600"
            placeholder="Enter tax"
            v-model="prop.orderSummarySettings.tax"
          />
        </div>
      </div>
      <div class="footer flex justify-end">
        <button
          @click="emit('handle-modal')"
          class="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const prop = defineProps(["orderSummarySettings"]);
const emit = defineEmits(["handle-modal"]);
</script>

<style lang="scss" scoped></style>

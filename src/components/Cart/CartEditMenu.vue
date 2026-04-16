<template>
  <div class="flex flex-col items-start w-32 ps-3" v-show="show">
    <button
      @click="showModal"
      class="flex-1 w-full text-start p-2 text-sm bg-slate-200 hover:bg-slate-300 cursor-pointer"
    >
      Edit
    </button>
    <button
      @click="handleDelete(item.id)"
      class="flex-1 bg-red-500 text-white w-full text-start p-2 text-sm hover:bg-red-600 cursor-pointer"
    >
      Delete
    </button>
  </div>

  <div
    v-show="is_show_modal"
    class="fixed flex justify-center items-center w-screen h-screen backdrop-opacity-15 bg-black/20 left-0 top-0 z-999"
  >
    <div class="modal bg-white w-xl p-5 rounded">
      <div class="header border-b border-slate-200 pb-3 flex justify-between">
        <h1 class="text-slate-700 font-semibold">Change Data</h1>
        <button
          @click="showModal"
          class="border rounded w-8 h-8 border-slate-300 text-slate-700 hover:bg-slate-200 cursor-pointer"
        >
          <i class="bi bi-x"></i>
        </button>
      </div>
      <div class="content py-10">
        <div class="form-group flex flex-col gap-3 mb-3">
          <label for="name" class="text-slate-700 font-light">Name</label>
          <input
            type="text"
            class="outline -outline-offset-2 outline-slate-400 h-10 p-2 rounded text-slate-600"
            placeholder="Enter name"
            v-model="item.name"
          />
        </div>
        <div class="form-group flex flex-col gap-3 mb-3">
          <label for="price" class="text-slate-700 font-light">Price</label>
          <input
            type="number"
            class="outline -outline-offset-2 outline-slate-400 h-10 p-2 rounded text-slate-600"
            placeholder="Enter price"
            ref="priceInput"
            v-model="item.price"
          />
        </div>
      </div>
      <div class="footer flex justify-end">
        <button
          @click="showModal"
          class="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["item", "show"]);
const emits = defineEmits(["handle-delete-item"]);
const is_show_modal = ref<boolean>(false);

function showModal() {
  is_show_modal.value = !is_show_modal.value;
}

function handleDelete(id: number) {
  emits("handle-delete-item", id);
}
</script>

<style lang="scss" scoped></style>

<template>
  <div class="container mx-auto max-w-6xl px-5 md:px-0">
    <h1 class="text-xl font-bold text-slate-800 py-6">Shopping Cart</h1>

    <div class="grid grid-cols-3 my-5 gap-5 items-start">
      <div class="col-span-2">
        <div class="flex justify-between mb-5">
          <p class="text-slate-700 text-sm">{{ items.length }} Items</p>

          <div class="flex gap-4">
            <button
              class="text-slate-700 text-sm hover:text-blue-700 cursor-pointer"
              @click="handleGenerateOrder"
            >
              <i class="bi bi-bag-plus"></i> Generate Random Order
            </button>
            <button
              @click="handleDeleteAll"
              class="text-slate-700 text-sm hover:text-red-700 cursor-pointer"
            >
              <i class="bi bi-trash"></i> Remove All
            </button>
          </div>
        </div>
        <CartList v-model="items" />
      </div>
      <OrderSummary v-model="items" @handle-clear="handleDeleteAll" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CartList from "./CartList.vue";
import { ref } from "vue";
import type { items_type } from "../../lib/types/Items";
import OrderSummary from "./OrderSummary.vue";

const items = ref<items_type[]>([]);
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function generateRandomString(length: number) {
  let result = "";
  const character_length = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * character_length));
  }
  return result;
}

function generateRandomNumber(min: number = 1, max: number = 1000) {
  return Math.floor(Math.random() * (max - min) + min);
}

let id = 1;
function handleGenerateOrder() {
  items.value.push({
    id: id++,
    name: `Ikan ${generateRandomString(3)}`,
    qty: generateRandomNumber(1, 20),
    price: generateRandomNumber(1, 100),
  });
}

function handleDeleteAll() {
  items.value.splice(0, items.value.length);
}
</script>

<style scoped></style>

<template>
  <div class="container mx-auto max-w-6xl px-5 md:px-0">
    <h1 class="text-xl font-medium text-slate-800 py-6">Your Cart</h1>

    <div class="grid md:grid-cols-3 gap-5 items-start">
      <div class="col-span-2">
        <CartList v-model="items" />
      </div>
      <OrderSummary v-model="items" />
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderSummary from "./OrderSummary.vue";
import CartList from "./CartList.vue";
import { provide, reactive } from "vue";
import type { ItemsType } from "../lib/types/Items";

const items = reactive<ItemsType[]>([
  {
    id: 1,
    name: "Ikan A",
    qty: 2,
    price: 10,
  },
  {
    id: 2,
    name: "Ikan B",
    qty: 4,
    price: 5,
  },
]);

provide("items", items);
</script>

<style scoped></style>

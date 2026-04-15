<template>
  <div v-for="item in items" class="mb-2">
    <div
      class="card rounded-xl border border-slate-300 flex gap-5 p-3"
      :key="item.id"
    >
      <div
        class="card-image flex items-center justify-center w-32 h-32 bg-slate-200/50 rounded"
      >
        <i class="bi bi-cart text-xl text-slate-800"></i>
      </div>
      <div class="flex items-center w-full">
        <div class="flex-1">
          <input
            type="text"
            placeholder="Masukkan nama produk"
            class="active:outline-0 outline-0 outline-slate-50 text-slate-700 font-semibold mb-2"
            v-model="item.name"
          /><br />
          <div>
            <label for="price">$</label>
            <input
              type="text"
              placeholder="Masukkan nama produk"
              class="active:outline-0 outline-0 outline-slate-50 text-slate-700 text-sm font-light mb-2"
              v-model="item.price"
            />
          </div>

          <div class="stock flex items-center justify-start mt-5">
            <button
              class="bg-slate-600 text-white w-8 h-8"
              @click="handleClickDecrement(item.id)"
            >
              <i class="bi bi-dash"></i>
            </button>
            <input
              type="number"
              class="border w-20 border-slate-400 h-8 py-1 text-center"
              v-model="item.qty"
            />
            <button
              class="bg-slate-600 text-white w-8 h-8"
              @click="handleClickIncrement(item.id)"
            >
              <i class="bi bi-plus"></i>
            </button>
          </div>
        </div>
        <div class="stock flex items-center justify-start">
          <h1 class="text-slate-800 font-bold text-lg">
            ${{ item.qty * item.price }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import type { ItemsType } from "../lib/types/Items";

const items = inject<ItemsType[]>("items");

function handleClickIncrement(id: number) {
  if (!items) return;
  const index = items.findIndex((item) => item.id === id);
  if (index !== -1) {
    items[index].qty += 1;
  }
}

function handleClickDecrement(id: number) {
  if (!items) return;
  const index = items.findIndex((item) => item.id === id);
  if (index !== -1) {
    if (items[index].qty <= 0) {
      items[index].qty = 1;
    }
    items[index].qty -= 1;
  }
}
</script>

<style scoped></style>

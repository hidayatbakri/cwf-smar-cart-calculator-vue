<template>
  <draggable
    v-model="items"
    item-key="id"
    tag="div"
    ghost-class="ghost"
    :disabled="active_edit_id !== 0"
  >
    <template #item="{ element }">
      <div class="flex gap-5 border-b border-slate-300 py-5" :key="element.id">
        <div
          class="card-image flex items-center justify-center w-44 h-28 bg-slate-200/50 rounded"
        >
          <i class="bi bi-cart text-xl text-slate-800"></i>
        </div>
        <div class="flex-1">
          <h1 class="font-bold text-slate-800 mb-3">
            {{ element.name }}
          </h1>
          <h2 class="font-semibold text-sm text-slate-700">
            ${{ element.price }}
          </h2>
        </div>
        <div class="flex justify-end">
          <div>
            <div class="flex justify-end mb-3">
              <div v-if="active_edit_id === element.id">
                <button
                  @click="handleActiveEditId(element.id, false)"
                  class="text-slate-700 text-sm w-6 h-6 rounded border hover:bg-slate-200 border-slate-300 cursor-pointer"
                >
                  <i class="bi bi-x"></i>
                </button>
              </div>
              <div v-else>
                <button
                  @click="handleActiveEditId(element.id, true)"
                  class="text-slate-700 text-sm w-6 h-6 rounded border hover:bg-slate-200 border-slate-300 cursor-pointer"
                >
                  <i class="bi bi-three-dots"></i>
                </button>
              </div>
            </div>
            <div class="border-slate-300 border rounded h-6 overflow-hidden">
              <button
                @click="handleClickDecrement(element.id)"
                class="rounded-l w-6 h-6 text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <i class="bi bi-dash"></i>
              </button>
              <input
                type="number"
                class="text-center font-light w-12 h-6 text-sm"
                v-model="element.qty"
                @change="
                  () => {
                    element.qty < 1 ? (element.qty = 0) : '';
                  }
                "
              />
              <button
                @click="handleClickIncrement(element.id)"
                class="rounded-r w-6 h-6 text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <i class="bi bi-plus"></i>
              </button>
            </div>
          </div>
          <CartEditMenu
            :key="element.id"
            :item="element"
            :show="active_edit_id === element.id"
            @handle-delete-item="handleDeleteItem"
          />
        </div>
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { items_type } from "../../lib/types/Items";
import CartEditMenu from "./CartEditMenu.vue";
import draggable from "vuedraggable";

const items = defineModel<items_type[]>({
  default: {
    id: 1,
    name: "",
    qty: 1,
    price: 1,
  },
});

const active_edit_id = ref<number>(0);

function handleActiveEditId(id: number, show: boolean) {
  show ? (active_edit_id.value = id) : (active_edit_id.value = 0);
}

function handleClickIncrement(id: number) {
  if (!items) return;
  const index = items.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    items.value[index].qty += 1;
  }
}

function handleClickDecrement(id: number) {
  if (!items) return;
  const index = items.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    if (items.value[index].qty <= 0) {
      items.value[index].qty = 1;
    }
    items.value[index].qty -= 1;
  }
}

function handleDeleteItem(id: number) {
  const index = items.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    items.value.splice(index, 1);
    active_edit_id.value = 0;
  }
}
</script>

<style scoped></style>

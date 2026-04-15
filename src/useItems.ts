// const items = reactive<ItemsType[]>([
//   {
//     name: "Nama Produk",
//     qty: 0,
//     price: 10,
//   },
// ]);

import { defineStore } from "pinia";
import { reactive } from "vue";
import type { ItemsType } from "./lib/types/Items";

let id = 0;

export const useItems = defineStore("items", () => {
  const items = reactive<ItemsType[]>([]);

  function add(itemData: ItemsType) {
    items.push({
      id: id++,
      name: itemData.name,
      qty: itemData.qty,
      price: itemData.price,
    });
  }
  function get(id: number) {
    return items.find((item) => item.id === id);
  }
  function remove(id: number) {
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      items.splice(index, 1);
    }
  }
  function update(itemData: ItemsType) {
    const index = items.findIndex((item) => item.id === itemData.id);
    if (index !== -1) {
      items[index].name = itemData.name;
      items[index].qty = itemData.qty;
      items[index].price = itemData.price;
    }
  }

  return { items, add, get, remove, update };
});

<template>
  <div class="border border-slate-300 p-5 rounded-xl">
    <h1 class="font-semibold text-slate-700 mb-4">OrderSummary</h1>

    <table class="w-full">
      <tr>
        <td class="w-1/2 text-slate-700 text-sm pb-2">
          Sub Total (Sebelum Diskon)
        </td>
        <td class="text-end text-slate-700 text-sm pb-2">
          ${{
            subTotalData ? subTotalData.subTotal + subTotalData.discount : ""
          }}
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <hr class="border-slate-300 mb-3" />
        </td>
      </tr>
      <tr>
        <td class="w-1/2 text-slate-700 text-sm pb-2">Diskon</td>
        <td class="text-end text-red-700 text-sm pb-2">
          -${{ subTotalData ? subTotalData.discount : "" }}
        </td>
      </tr>
      <tr>
        <td class="w-1/2 text-slate-700 text-sm pb-2">Sub Total</td>
        <td class="text-end text-slate-700 text-sm pb-2">
          ${{ subTotalData ? subTotalData.subTotal : "" }}
        </td>
      </tr>
      <tr>
        <td class="w-1/2 text-slate-700 text-sm pb-2">Pajak (11%)</td>
        <td class="text-end text-slate-700 text-sm pb-2">+${{ tax }}</td>
      </tr>
      <tr>
        <td class="w-1/2 text-slate-700 text-sm pb-2">Total</td>
        <td class="text-end font-black text-slate-700 text-sm pb-2">
          ${{ total }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import type { ItemsType } from "../lib/types/Items";

const items = inject<ItemsType[]>("items");

const subTotalData = computed(() => {
  let subTotal = 0;
  let discount = 0;
  const requirementSubTotalDisc = 50;

  if (!items) return;
  items.forEach((item: ItemsType) => {
    if (!validationQuantityError(item.qty)) {
      subTotal += item.price * item.qty;
    }

    if (subTotal > requirementSubTotalDisc) {
      discount = subTotal * 0.1;
    }
  });

  if (subTotal > requirementSubTotalDisc) {
    discount = subTotal * 0.1;
  }

  return { subTotal: subTotal - discount, discount: discount };
});

const tax = computed(() => {
  const tax = 0.11;

  if (!subTotalData.value) return;

  return subTotalData.value.subTotal * tax;
});

const total = computed(() => {
  if (!subTotalData.value) return;
  if (!tax.value) return;

  return subTotalData.value.subTotal + tax.value;
});

function validationQuantityError(qty: number) {
  if (qty < 0) {
    return true;
  }
  return false;
}
</script>

<style scoped></style>

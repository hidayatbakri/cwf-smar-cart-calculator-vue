<template>
  <div class="border border-slate-300 p-5 rounded-xl">
    <h1 class="font-semibold text-slate-700 mb-4">OrderSummary</h1>

    <div class="grid grid-cols-3 gap-3">
      <div class="col-span-2">
        <p class="text-slate-700 text-sm">Sub Total (Sebelum Diskon)</p>
      </div>
      <div>
        <p class="text-slate-700 text-end text-sm">
          ${{
            subTotalData ? subTotalData.subTotal + subTotalData.discount : ""
          }}
        </p>
      </div>
      <div class="col-span-3 border-b border-slate-300 border-dashed"></div>
      <div class="col-span-2 flex gap-3 items-center">
        <p class="text-slate-700 text-sm">
          Diskon ({{ order_summary_settings.discount }}%)
        </p>
        <button
          @click="handleToggleModalDiscount"
          class="text-xs border w-6 h-6 rounded border-slate-300 text-slate-600 cursor-pointer hover:text-slate-800 hover:bg-slate-400"
        >
          <i class="bi bi-pencil"></i>
        </button>
      </div>
      <div>
        <p class="text-red-700 text-end text-sm">
          -${{ subTotalData ? subTotalData.discount : "" }}
        </p>
      </div>
      <div class="col-span-2">
        <p class="text-slate-700 text-sm">Sub Total</p>
      </div>
      <div>
        <p class="text-slate-700 text-end text-sm">
          ${{ subTotalData ? subTotalData.subTotal : "" }}
        </p>
      </div>
      <div class="col-span-2 flex gap-3 items-center">
        <p class="text-slate-700 text-sm">
          Pajak ( {{ order_summary_settings.tax }} %)
        </p>
        <button
          @click="handleToggleModalTax"
          class="text-xs border w-6 h-6 rounded border-slate-300 text-slate-600 cursor-pointer hover:text-slate-800 hover:bg-slate-400"
        >
          <i class="bi bi-pencil"></i>
        </button>
      </div>
      <div>
        <p class="text-slate-700 text-end text-sm">+${{ tax }}</p>
      </div>
      <div class="col-span-2">
        <p class="text-slate-700 text-sm font-bold">Total</p>
      </div>
      <div>
        <p class="text-slate-700 text-end text-sm font-bold">${{ total }}</p>
      </div>
      <div class="col-span-3">
        <button
          @click="handleExecuteOrder"
          class="bg-blue-600 w-full text-white py-2 rounded mt-6 relative cursor-pointer hover:bg-blue-700 group"
        >
          Execute order

          <i
            class="bi bi-arrow-right-circle absolute right-5 group-hover:right-2 ease-in-out duration-150"
          ></i>
        </button>
      </div>
    </div>
  </div>

  <TaxModal
    v-show="is_show_modal_tax"
    :order-summary-settings="order_summary_settings"
    @handle-modal="handleToggleModalTax"
  />

  <DiscountModal
    v-show="is_show_modal_discount"
    :order-summary-settings="order_summary_settings"
    @handle-modal="handleToggleModalDiscount"
  />
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type { items_type } from "../../lib/types/Items";
import TaxModal from "../modal/TaxModal.vue";
import type { order_settings } from "../../lib/types/OrderSettings";
import DiscountModal from "../modal/DiscountModal.vue";
import { alertError, alertSuccess } from "../../lib/alerts";

const items = defineModel<items_type[]>({
  default: {
    id: 1,
    name: "",
    qty: 1,
    price: 1,
  },
});

const emits = defineEmits(["handle-clear"]);

const is_show_modal_tax = ref<boolean>(false);
const is_show_modal_discount = ref<boolean>(false);

const order_summary_settings = reactive<order_settings>({
  tax: 11,
  discountRequirement: 50,
  discount: 10,
});

function handleExecuteOrder() {
  if (Number(total.value) > 0) {
    emits("handle-clear");
    alertSuccess("Successfully execute order!");
  } else {
    alertError("Total value does not match");
  }
}

function handleToggleModalTax() {
  is_show_modal_tax.value = !is_show_modal_tax.value;
}

function handleToggleModalDiscount() {
  is_show_modal_discount.value = !is_show_modal_discount.value;
}

const subTotalData = computed(() => {
  let subTotal = 0;
  let discount = 0;
  const requirement_sub_total_disc = order_summary_settings.discountRequirement;
  const discount_multiplication = order_summary_settings.discount / 100;

  if (!items) return;
  items.value.forEach((item: items_type) => {
    if (!validationQuantityError(item.qty)) {
      subTotal += item.price * item.qty;
    }

    if (subTotal > requirement_sub_total_disc) {
      discount = subTotal * discount_multiplication;
    }
  });

  if (subTotal > requirement_sub_total_disc) {
    discount = Number((subTotal * discount_multiplication).toFixed(2));
  }

  return { subTotal: subTotal - discount, discount: discount };
});

const tax = computed(() => {
  const tax = order_summary_settings.tax / 100;

  if (!subTotalData.value) return;

  return Number((subTotalData.value.subTotal * tax).toFixed(2));
});

const total = computed(() => {
  if (!subTotalData.value) return;
  if (!tax.value) return;

  return Number(subTotalData.value.subTotal + tax.value).toFixed(2);
});

function validationQuantityError(qty: number) {
  if (qty < 0) {
    return true;
  }
  return false;
}
</script>

<style scoped></style>

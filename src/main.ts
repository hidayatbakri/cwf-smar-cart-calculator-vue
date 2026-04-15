import { createApp } from "vue";
import "./style.css";
import Cart from "./components/Cart.vue";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(Cart).use(pinia).mount("#app");

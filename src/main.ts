import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vant from "vant";
import "vant/lib/index.css";
import "tailwindcss/tailwind.css";
import "@/styles/style.css";

const app = createApp(App);

app.use(router);
app.use(Vant);
app.mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vant from "vant";
import "vant/lib/index.css";
import "tailwindcss/tailwind.css";
import SimpleTypeahead from "vue3-simple-typeahead";
import "vue3-simple-typeahead/dist/vue3-simple-typeahead.css";

const app = createApp(App);

app.use(router);
app.use(Vant);
app.use(SimpleTypeahead);

app.mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vant from "vant";
import "vant/lib/index.css";
import "tailwindcss/tailwind.css";
import SimpleTypeahead from "vue3-simple-typeahead";
import "vue3-simple-typeahead/dist/vue3-simple-typeahead.css";
import { getExternalService } from "./action/common/handle";

const app = createApp(App);

const processFn = async () => {
  const externalService = await getExternalService().toPromise();
  window.externalService = externalService.data;
};

processFn();

app.use(router);
app.use(Vant);
app.use(SimpleTypeahead);

app.mount("#app");

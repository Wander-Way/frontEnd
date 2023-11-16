//import './assets/main.css'

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

//vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
const vuetify = createVuetify({
  components,
  directives,
});

//antDesign
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(Antd);
app.mount("#app");
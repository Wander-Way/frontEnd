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

import vueAwesomeSidebar from "vue-awesome-sidebar";
import "vue-awesome-sidebar/dist/vue-awesome-sidebar.css";

//fint awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// 설치했던 fontawesome-svg-core와 vue-fontawesome
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(
  fas,
  far,
  fab
)

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(Antd);
app.use(vueAwesomeSidebar);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount("#app");

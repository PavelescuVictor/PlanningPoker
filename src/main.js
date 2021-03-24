import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {db, auth} from "./scripts/firebase-config";
import FontAwesomeIcon from "./plugins/font-awesome.js";


createApp(App)
  .use(store)
  .use(router)
  .use(db)
  .use(auth)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

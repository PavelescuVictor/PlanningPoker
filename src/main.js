import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import firebaseConfig from "./scripts/firebase-config.js";
import FontAwesomeIcon from "./plugins/font-awesome.js";

firebase.initializeApp(firebaseConfig);

createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

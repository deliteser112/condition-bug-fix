import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import service from "@/services/service.js";
import VueCollapse from "vue2-collapse";
require("@/store/subscriber");

store.dispatch("auth/attempt", localStorage.getItem("token"));

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.response.data);

    if (error.response.status === 401) {
      router.push({ name: "Login" });
    }
    return Promise.reject(error);
  }
);

import "vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css";
import VModal from "vue-js-modal";
import Vuelidate from "vuelidate";

Vue.use(VModal);
Vue.use(Vuelidate);
Vue.use(VueCollapse);

window.datepickerOptions = function () {
  var obj = {};
  return obj;
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

window.validateFocusElement = function () {
  var elm = document.querySelector(
    ".form-group--error input,.form-group--error textarea,.form-group--error select"
  );
  if (elm) {
    elm.focus();
  }
};

import store from "@/store";
import service from "@/services/service.js";

store.subscribe((mutation) => {
  switch (mutation.type) {
    case "auth/SET_TOKEN":
      if (mutation.payload) {
        service.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${mutation.payload}`;
        localStorage.setItem("token", mutation.payload);
      } else {
        service.defaults.headers.common["Authorization"] = null;
        localStorage.removeItem("token", mutation.payload);
      }
      break;
  }
});

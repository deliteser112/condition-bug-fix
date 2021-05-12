import axios from "axios";

const baseURL = "http://api-viajaydescubre.pcaingenieria.co/";

export default axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

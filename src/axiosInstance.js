import axios from "axios";

const instance = axios.create({
  baseURL: "https://dummyapi.io/data/v1/",
});
instance.defaults.headers.common["app-id"] = process.env.REACT_APP_SECRET_KEY;
export default instance;

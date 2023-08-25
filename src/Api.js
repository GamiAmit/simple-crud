import axios from "axios";

function callApi(method, url, data, headers = {}) {
  axios({
    method: method,
    url: url,
    data: data,
    headers: headers,
  })
    .then((response) => {
      console.log("Request successful:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error in request:", error);
      throw error;
    });
}

export default callApi;

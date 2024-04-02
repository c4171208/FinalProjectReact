import axios from "axios";
let baseUrl = "http://localhost:5000/api/order";

export const saveOrderInServer = (order, token) => {

  return axios.post(baseUrl, order, {
    headers: {
      "my-token": token,
    },
  });
};

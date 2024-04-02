import axios from "axios";

let baseUrl = "http://localhost:5000/api/user";


export const login = (user) => {
  return axios.post(`${baseUrl}/login`, user);

};
export const sighIn = (user) => {

  return axios.post(`${baseUrl}`, user);
};
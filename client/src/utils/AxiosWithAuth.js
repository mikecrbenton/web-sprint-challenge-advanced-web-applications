import axios from 'axios';

export const axiosWithAuth = () => {
  // get the token from localstorage
  const token = window.localStorage.getItem('token');

  // **create a new "instance" of axios with the config object built into it**
  // **THIS IS WHERE THE HEADER IS INCLUDED IN THE AXIOS POST CALL**

  return axios.create({
    headers: {
      authorization: token
    },
    baseURL: 'http://localhost:5000'
  });
};

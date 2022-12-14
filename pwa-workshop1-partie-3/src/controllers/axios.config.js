import axios from 'axios';

const uriGateway =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8081/'
    : 'https://web-mobile-tp-niveau.herokuapp.com/';

let axiosApi = axios.create({
  baseURL: uriGateway,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});

axiosApi.interceptors.response.use(
  /* RESPONSE */
  (response) => {
    return Promise.resolve(response);
  },

  /* ERROR */
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosApi;

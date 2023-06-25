import axios from "axios";

const API_SERVER = process.env.REACT_APP_API_SERVER;

const customAxios = axios.create({
    baseURL: API_SERVER,
    // timeout: 2000,
});

customAxios.interceptors.request.use(
    (response) => {
      console.log('인터셉터 req')
      console.log(response);
      if(urlCheck()) {

      }
      return response;
    },
    error => {
        return Promise.reject(error);
    }
);

function urlCheck(): boolean {
  console.log('펑션테스트');
  const hasToken: boolean = true;
  return hasToken;
}

customAxios.interceptors.response.use(
    response => {
      console.log('인터셉터 res')
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default customAxios;
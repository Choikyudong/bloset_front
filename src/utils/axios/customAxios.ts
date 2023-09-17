import axios from "axios";

const API_SERVER = process.env.REACT_APP_API_SERVER;

/**
 * 표준으로 사용할 axios 생성 부분입니다.
 */
const customAxios = axios.create({
    baseURL: API_SERVER,
    timeout: 10000,
    withCredentials: true,
});

/**
 * 요청 인터셉터
 */
customAxios.interceptors.request.use(
    (response) => {
      return response;
    },
    error => {
      return Promise.reject(error);
    }
);


/**
 * 응답 인터셉터
 */
customAxios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      return Promise.reject(error);
    }
);

export default customAxios;
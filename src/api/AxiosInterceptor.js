import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8080";

axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        await axios.post("/api/auth/refresh"); // 쿠키 자동 전송됨
        return axios(original); // 원래 요청 다시 시도
      } catch (e) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default axios;

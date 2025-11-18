import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8080";

axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (original.url === "/api/auth/refresh") {
      return Promise.reject(err); // 여기서 끝 → AuthProvider의 .catch로 감
    }

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        await axios.post("/api/auth/refresh"); // 쿠키 자동 전송됨
        return axios(original); // 원래 요청 다시 시도
      } catch (e) {}
    }

    return Promise.reject(err);
  }
);

export default axios;

import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "";

// ✅ 요청 인터셉터 추가 (디버깅용)
axios.interceptors.request.use(
  (config) => {
    /* console.log(`🚀 [REQUEST] ${config.method.toUpperCase()} ${config.url}`);  // ✅ 괄호 수정
    console.log('📦 Headers:', config.headers);
    console.log('🍪 withCredentials:', config.withCredentials); */
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (res) => {
    // console.log(`✅ [RESPONSE] ${res.status} ${res.config.url}`);  // ✅ 괄호 수정
    return res;
  },
  async (err) => {
    const original = err.config;
    
    // console.error(`❌ [ERROR] ${err.response?.status || 'NO_RESPONSE'} ${original?.url}`);  // ✅ 괄호 수정

    if (original.url === "/api/auth/refresh") {
      // console.error("🔴 Refresh 실패 - 로그아웃 필요");
      return Promise.reject(err);
    }

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      console.log("🔄 토큰 갱신 시도...");
      
      try {
        await axios.post("/api/auth/refresh");
        // console.log("✅ 토큰 갱신 성공 - 원본 요청 재시도");
        return axios(original);
      } catch (e) {
        // console.error("🔴 토큰 갱신 실패:", e);
      }
    }

    return Promise.reject(err);
  }
);

export default axios;
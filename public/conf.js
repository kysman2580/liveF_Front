const URL_CONFIG = {
  // 1. 일반 API (인증, 회원 등)
  API_URL: "https://api.livef.store",

  // 2. Chat API (WebSocket)
  CHAT_URL: "https://api.livef.store",
};

// React 컴포넌트가 window 객체에서 이 설정을 참조할 수 있도록 전역으로 노출합니다.
window.URL_CONFIG = URL_CONFIG;
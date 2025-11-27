const URL_CONFIG = {
  // 1. 일반 API (인증, 회원 등)
  // Nginx의 location /api/ { proxy_pass http://gateway:8080/; } 규칙에 맞춤
  API_URL: "http://livef.store/",

  // 2. Chat API (WebSocket)
  // Nginx의 location /chat/ { proxy_pass http://gateway:8080/; } 규칙에 맞춤
  CHAT_URL: "http://livef.store/chat",
};

// React 컴포넌트가 window 객체에서 이 설정을 참조할 수 있도록 전역으로 노출합니다.
window.URL_CONFIG = URL_CONFIG;
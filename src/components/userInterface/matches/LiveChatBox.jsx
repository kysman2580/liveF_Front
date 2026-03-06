import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useAuth } from "../../../provider/AuthProvider";
import LogIn from "../member/LogIn";
import "./LiveChatBox.css";

const MAX_MESSAGES = 100;
const API_URL = import.meta.env.VITE_API_BASE_URL || window.URL_CONFIG?.API_URL || "";

const LiveChatBox = ({ leagueId = 39 }) => {
  const { auth } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [openLogInModal, setOpenLogInModal] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(true);

  const stompClientRef = useRef(null);
  const subscriptionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const isConnectingRef = useRef(false);
  const currentLeagueIdRef = useRef(leagueId);
  const isDisconnectingRef = useRef(false); // 🔍 LEAVE 메시지 중복 방지

  const isLoggedIn = auth.isAuthenticated;
  const currentUser = auth.memberInfo?.memberNickname || auth.memberInfo?.username || "익명";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 구독 해제 함수
  const unsubscribeFromLeague = (leagueIdToUnsubscribe) => {
    if (subscriptionRef.current) {
      try {
        console.log(`🔌 리그 ${leagueIdToUnsubscribe} 구독 해제 중...`);
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
        console.log(`✅ 리그 ${leagueIdToUnsubscribe} 구독 해제 완료`);
      } catch (e) {
        console.error("구독 해제 오류:", e);
        subscriptionRef.current = null;
      }
    }
  };

  // 연결 정리 함수
  const disconnectWebSocket = async (currentLeagueId, skipLeaveMessage = false) => {
    // 🔍 이미 LEAVE 메시지를 보낸 경우 중복 방지
    if (isDisconnectingRef.current) {
      console.log(`⚠️ 이미 연결 해제 중입니다. 중복 실행 방지`);
      return Promise.resolve();
    }

    isDisconnectingRef.current = true; // 🔍 플래그 설정
    console.log(`🔌 리그 ${currentLeagueId} WebSocket 연결 정리 시작...`);

    // 1. reconnect 타이머 정리
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    // 2. STOMP 연결 해제
    if (stompClientRef.current?.active) {
      const client = stompClientRef.current;

      try {
        // 🔍 LEAVE 메시지는 skipLeaveMessage가 false일 때만 전송
        if (!skipLeaveMessage) {
          console.log(`📤 LEAVE 메시지 전송: leagueId=${currentLeagueId}`);
          client.publish({
            destination: "/app/chat/leave",
            body: JSON.stringify({
              type: "LEAVE",
              leagueId: currentLeagueId,
              sender: currentUser,
            }),
          });
        }

        unsubscribeFromLeague(currentLeagueId);

        // deactivate()는 비동기 작업이며 소켓을 안전하게 닫습니다.
        return client.deactivate().then(() => {
          console.log(`✅ 리그 ${currentLeagueId} STOMP 연결 해제 완료`);
          stompClientRef.current = null;
          isDisconnectingRef.current = false;
        });
      } catch (e) {
        console.error("연결 해제 오류:", e);
        unsubscribeFromLeague(currentLeagueId);
        stompClientRef.current = null;
        isDisconnectingRef.current = false;
        return Promise.resolve();
      }
    }

    // 연결이 없는 경우에도 구독 해제
    unsubscribeFromLeague(currentLeagueId);
    stompClientRef.current = null;
    isDisconnectingRef.current = false;
    return Promise.resolve();
  };

  // WebSocket 연결 함수
  const connectWebSocket = () => {
    if (isConnectingRef.current) {
      console.log("⚠️ 이미 연결 중입니다. 중복 연결 방지");
      return;
    }

    isConnectingRef.current = true;
    console.log(`🚀 리그 ${leagueId} 채팅 연결 시작... (사용자: ${currentUser})`);

    try {
      const wsUrl = `${API_URL}/ws`;

      const client = new Client({
        webSocketFactory: () => new SockJS(wsUrl),
        connectHeaders: {
          "X-Username": currentUser,
        },
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,
        debug: (str) => {
          // console.log(str); // 필요한 경우 디버깅 로그 활성화
        },
        onConnect: (frame) => {
          console.log(`✅ STOMP 연결 성공! (리그 ${leagueId})`);
          setConnected(true);
          setConnectionError(null);
          stompClientRef.current = client;
          isConnectingRef.current = false;
          isDisconnectingRef.current = false;
          currentLeagueIdRef.current = leagueId;

          const destination = `/topic/league-${leagueId}`;
          console.log(`📡 구독 시작: ${destination}`);

          // 구독 시작
          const subscription = client.subscribe(destination, (msg) => {
            try {
              const data = JSON.parse(msg.body);
              if (data.leagueId !== currentLeagueIdRef.current) return;

              setMessages((prev) => {
                const newMsg = {
                  id: Date.now() + Math.random(),
                  user: data.sender,
                  message: data.message,
                  timestamp: new Date(data.timestamp).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  type: data.type.toLowerCase(),
                };
                const updated = [...prev, newMsg];
                return updated.length > MAX_MESSAGES ? updated.slice(-MAX_MESSAGES) : updated;
              });
            } catch (e) {
              console.error("❌ 메시지 파싱 실패:", e);
            }
          });

          subscriptionRef.current = subscription;

          // 입장 메시지 전송 (publish 사용)
          client.publish({
            destination: "/app/chat/enter",
            body: JSON.stringify({
              type: "ENTER",
              leagueId,
              sender: currentUser,
            }),
          });
        },
        onStompError: (frame) => {
          console.error("❌ STOMP 에러 발생:", frame.headers["message"]);
          setConnectionError(`STOMP 에러: ${frame.headers["message"]}`);
        },
        onWebSocketClose: () => {
          console.log("🔌 WebSocket 연결 닫힘");
          setConnected(false);
          isConnectingRef.current = false;
        },
      });

      client.activate(); // 연결 시작
      stompClientRef.current = client;

    } catch (error) {
      console.error("❌ WebSocket 초기화 실패:", error);
      setConnectionError("초기화 실패: " + error.message);
      isConnectingRef.current = false;
    }
  };

  // leagueId 변경 감지
  useEffect(() => {
    if (!isLoggedIn) {
      console.log("로그인 필요 - WebSocket 연결 생략");
      setConnected(false);
      setConnectionError(null);
      return;
    }

    let isMounted = true;
    const previousLeagueId = currentLeagueIdRef.current;

    const initConnection = async () => {
      console.log(`\n🔄 리그 변경 감지: ${previousLeagueId} → ${leagueId}`);

      // 🔍 같은 리그로 재연결하는 경우 LEAVE 메시지 스킵
      const isSameLeague = previousLeagueId === leagueId;

      // 기존 연결 완전 정리
      await disconnectWebSocket(previousLeagueId, isSameLeague);

      // 상태 초기화
      setMessages([]);
      setConnected(false);
      setConnectionError(null);

      // 서버 정리 시간 제공
      await new Promise(resolve => setTimeout(resolve, 200));

      if (isMounted) {
        connectWebSocket();
      }
    };

    initConnection();

    return () => {
      console.log(`\n🧹 Cleanup 실행 (리그 ${currentLeagueIdRef.current})`);
      isMounted = false;
      isConnectingRef.current = false;
      const cleanupLeagueId = currentLeagueIdRef.current;
      disconnectWebSocket(cleanupLeagueId);
    };
  }, [leagueId, currentUser, isLoggedIn]);

  const handleSend = () => {
    if (!connected || !input.trim() || !stompClientRef.current) return;

    const message = {
      type: "TALK",
      leagueId,
      sender: currentUser,
      message: input.trim(),
    };

    console.log("📤 메시지 전송:", message);
    stompClientRef.current.publish({
      destination: "/app/chat/send",
      body: JSON.stringify(message),
    });
    setInput("");
  };

  const handleInputChange = (e) => setInput(e.target.value);
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const handleLoginClick = () => setOpenLogInModal(true);

  const getLeagueName = (id) => {
    const names = {
      39: "프리미어 리그",
      140: "라리가",
      135: "세리에A",
      78: "분데스리가",
      61: "리그1",
      2: "챔피언스 리그",
    };
    return names[id] || `리그 ${id}`;
  };

  return (
    <>
      <div className="chat-box-wrap">
        <div className={`chat-container ${isChatOpen ? 'is-open' : 'is-closed'}`}>
          <div className="live-chat-box">
            <div className="chat-header">
              <div className="chat-title">
                <span>실시간 채팅</span>
                {isLoggedIn && (
                  <span className={`status-indicator ${connected ? "ON" : "OFF"}`}>
                    {connected ? "LIVE" : "OFFLINE"}
                  </span>
                )}
              </div>
              <div className="chat-match">
                {getLeagueName(leagueId)}
              </div>
            </div>

            <div className="chat-messages">
              {!isLoggedIn ? (
                <div className="chat-login-required">
                  <div className="login-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <p className="login-message">
                    채팅 참여를 위해 로그인이 필요합니다
                  </p>
                  <button className="chat-login-btn" onClick={handleLoginClick}>
                    로그인하기
                  </button>
                </div>
              ) : (
                <>
                  {connectionError && (
                    <div className="chat-notice" style={{ color: "#ef4444" }}>
                      {connectionError}
                    </div>
                  )}
                  {!connected && messages.length === 0 && !connectionError && (
                    <div className="chat-notice">연결을 시도 중입니다...</div>
                  )}
                  {messages.map((msg) => {
                    const isMe = msg.user === currentUser;
                    return (
                      <div key={msg.id} className={`chat-msg chat-msg-${msg.type} ${isMe ? 'is-me' : ''}`}>
                        {msg.type === "talk" ? (
                          <>
                            {!isMe && <span className="chat-user">{msg.user}</span>}
                            <div className="chat-text-wrapper">
                              <div className="chat-text">{msg.message}</div>
                              <span className="chat-time">{msg.timestamp}</span>
                            </div>
                          </>
                        ) : (
                          <span className="chat-system-message">{msg.message}</span>
                        )}
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {isLoggedIn && (
              <div className="chat-input-row">
                <input
                  className="chat-input"
                  type="text"
                  placeholder={connected ? "메시지를 입력하세요..." : "연결 대기 중..."}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  autoComplete="off"
                  disabled={!connected}
                />
                <button
                  className="chat-send-btn"
                  onClick={handleSend}
                  disabled={!connected || !input.trim()}
                  title="보내기"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            )}
          </div>

          <button
            className="chat-toggle-btn"
            onClick={() => setIsChatOpen(!isChatOpen)}
            title={isChatOpen ? "채팅 닫기" : "채팅 열기"}
          >
            {isChatOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {openLogInModal && <LogIn setOpenLogInModal={setOpenLogInModal} />}
    </>
  );
};

export default LiveChatBox;
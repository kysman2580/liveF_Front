<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useAuth } from '../../../provider/AuthProvider';
import LogIn from '../member/LogIn';
import './LiveChatBox.css';
=======
// LiveChatBox.jsx (최종 완성본 - CSRF 로직 제거)

import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useAuth } from "../../../provider/AuthProvider";
import LogIn from "../member/LogIn";
import "./LiveChatBox.css";
>>>>>>> d1a45383b6f8bad573feb52283ceb2dd909a59fb


const MAX_MESSAGES = 100;


const LiveChatBox = ({ leagueId = 39 }) => {
  const { auth } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [openLogInModal, setOpenLogInModal] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  const stompClient = useRef(null);
  const subscriptionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const isLoggedIn = auth.isAuthenticated;
  const currentUser = auth.memberInfo?.memberNickname || "익명";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("로그인 필요 - WebSocket 연결 생략");
      setConnected(false);
      setConnectionError(null);
      return;
    }

    console.log(`리그 ${leagueId} 채팅 연결 시작... (사용자: ${currentUser})`);
    console.log("현재 쿠키:", document.cookie);

    // 기존 연결 정리
    if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    if (subscriptionRef.current) subscriptionRef.current.unsubscribe();
    if (stompClient.current?.connected) {
      try {
        stompClient.current.send(
          "/app/chat/leave",
          {},
          JSON.stringify({
            type: "LEAVE",
            leagueId,
            sender: currentUser,
          })
        );
        stompClient.current.disconnect();
      } catch (e) {
        console.error("disconnect error:", e);
      }
    }

    setMessages([]);
    setConnected(false);
    setConnectionError(null);

    connectWebSocket();

    // useEffect cleanup에서 완전히 정리
    return () => {
      if (reconnectTimeoutRef.current)
        clearTimeout(reconnectTimeoutRef.current);
      if (subscriptionRef.current) subscriptionRef.current.unsubscribe();
      if (stompClient.current?.connected) {
        stompClient.current.send(
          "/app/chat/leave",
          {},
          JSON.stringify({
            type: "LEAVE",
            leagueId,
            sender: currentUser,
          })
        );
        stompClient.current.disconnect(() => {
          console.log("완전히 disconnect 완료");
        });
      }
      stompClient.current = null;
    };
  }, [leagueId, currentUser, isLoggedIn]);

  // LiveChatBox.jsx - connectWebSocket 함수 부분만 수정
  const connectWebSocket = () => {
    try {
      const wsUrl = "http://localhost:8080/ws";
      console.log(`연결 시도: ${wsUrl}`);

      // 💡 CSRF 토큰 관련 로직 제거

      // SockJS 옵션 단순화
      const socket = new SockJS(wsUrl);

      socket.onopen = () => console.log("✅ SockJS 소켓 열림");
      socket.onerror = (e) => {
        console.error("❌ SockJS 에러:", e);
        setConnectionError("소켓 연결 실패");
      };
      socket.onclose = (e) => {
        console.log("🔌 SockJS 소켓 닫힘:", e.code, e.reason);
        setConnected(false);
        if (!e.wasClean && isLoggedIn) {
          console.log("🔄 3초 후 재연결...");
          reconnectTimeoutRef.current = setTimeout(connectWebSocket, 3000);
        }
      };

      const client = Stomp.over(socket);
      client.debug = (str) => console.log("STOMP:", str);

      // 💡 CONNECT 헤더 설정 (CSRF 헤더 없음)
      const connectHeaders = {
        "X-Username": currentUser,
        "heart-beat": "10000,10000",
      };

      console.log("📤 CONNECT 헤더 (CSRF 없음):", connectHeaders);

      client.connect(
        connectHeaders,
        (frame) => {
          console.log("✅ STOMP 연결 성공!", frame);
          setConnected(true);
          setConnectionError(null);
          stompClient.current = client;

          const destination = `/topic/league-${leagueId}`;
          console.log(`📡 구독: ${destination}`);

          subscriptionRef.current = client.subscribe(destination, (msg) => {
            try {
              const data = JSON.parse(msg.body);
              console.log("📩 메시지 수신:", data);

<<<<<<< HEAD
            const client = Stomp.over(socket);
            // client.debug = (str) => console.log('STOMP:', str);

            // 💡 CONNECT 헤더 설정 (CSRF 헤더 없음)
            const connectHeaders = {
                'X-Username': currentUser,
                'heart-beat': '10000,10000'
            };

            console.log('📤 CONNECT 헤더 (CSRF 없음):', connectHeaders);

            client.connect(
                connectHeaders,
                (frame) => {
                    console.log('✅ STOMP 연결 성공!', frame);
                    setConnected(true);
                    setConnectionError(null);
                    stompClient.current = client;

                    const destination = `/topic/league-${leagueId}`;
                    console.log(`📡 구독: ${destination}`);

                    subscriptionRef.current = client.subscribe(destination, (msg) => {
                        try {
                            const data = JSON.parse(msg.body);
                            console.log('📩 메시지 수신:', data);

                            setMessages(prev => {
                                const newMsg = {
                                    id: Date.now() + Math.random(),
                                    user: data.sender,
                                    message: data.message,
                                    timestamp: new Date(data.timestamp).toLocaleTimeString('ko-KR', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }),
                                    type: data.type.toLowerCase()
                                };
                                const updated = [...prev, newMsg];
                                return updated.length > MAX_MESSAGES ? updated.slice(-MAX_MESSAGES) : updated;
                            });
                        } catch (e) {
                            console.error('❌ 메시지 파싱 실패:', e);
                        }
                    });

                    // 입장 메시지 전송
                    client.send('/app/chat/enter', {}, JSON.stringify({
                        type: 'ENTER',
                        leagueId,
                        sender: currentUser
                    }));
                },
                (error) => {
                    console.error('❌ STOMP 연결 실패:', error);
                    console.error('Error Frame:', error);

                    const errorMsg = error?.headers?.message || error?.body || 'Unknown error';
                    setConnected(false);
                    setConnectionError(`연결 실패: ${errorMsg}`);

                    // 5초 후 재연결
                    if (isLoggedIn) {
                        reconnectTimeoutRef.current = setTimeout(connectWebSocket, 5000);
=======
              setMessages((prev) => {
                const newMsg = {
                  id: Date.now() + Math.random(),
                  user: data.sender,
                  message: data.message,
                  timestamp: new Date(data.timestamp).toLocaleTimeString(
                    "ko-KR",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
>>>>>>> d1a45383b6f8bad573feb52283ceb2dd909a59fb
                    }
                  ),
                  type: data.type.toLowerCase(),
                };
                const updated = [...prev, newMsg];
                return updated.length > MAX_MESSAGES
                  ? updated.slice(-MAX_MESSAGES)
                  : updated;
              });
            } catch (e) {
              console.error("❌ 메시지 파싱 실패:", e);
            }
          });

          // 입장 메시지 전송
          client.send(
            "/app/chat/enter",
            {},
            JSON.stringify({
              type: "ENTER",
              leagueId,
              sender: currentUser,
            })
          );
        },
        (error) => {
          console.error("❌ STOMP 연결 실패:", error);
          console.error("Error Frame:", error);

          const errorMsg =
            error?.headers?.message || error?.body || "Unknown error";
          setConnected(false);
          setConnectionError(`연결 실패: ${errorMsg}`);

          // 5초 후 재연결
          if (isLoggedIn) {
            reconnectTimeoutRef.current = setTimeout(connectWebSocket, 5000);
          }
        }
      );
    } catch (error) {
      console.error("❌ WebSocket 초기화 실패:", error);
      setConnectionError("초기화 실패: " + error.message);
    }
  };

  const handleSend = () => {
    if (!connected || !input.trim() || !stompClient.current) return;

    const message = {
      type: "TALK",
      leagueId,
      sender: currentUser,
      message: input.trim(),
    };
    stompClient.current.send("/app/chat/send", {}, JSON.stringify(message));
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
    };
    return names[id] || `리그 ${id}`;
  };

  return (
    <>
      <div className="chat-box-wrap">
        <div className="live-chat-box">
          <div className="chat-header">
            <span className="chat-title">
              실시간 채팅
              {isLoggedIn && connected && (
                <span className="status-indicator">ON</span>
              )}
              {isLoggedIn && !connected && (
                <span className="status-indicator">OFF</span>
              )}
            </span>
            <span className="chat-match">
              {getLeagueName(leagueId)}{" "}
              {isLoggedIn && `(${messages.length}/${MAX_MESSAGES})`}
            </span>
          </div>

          <div className="chat-messages">
            {!isLoggedIn ? (
              <div className="chat-login-required">
                <div className="login-icon">Chat</div>
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
                  <div
                    className="chat-notice"
                    style={{ color: "red", padding: "10px" }}
                  >
                    {connectionError}
                  </div>
                )}
                {!connected && messages.length === 0 && !connectionError && (
                  <div className="chat-notice">연결 중...</div>
                )}
                {messages.map((msg) => (
                  <div key={msg.id} className={`chat-msg chat-msg-${msg.type}`}>
                    {msg.type === "talk" && (
                      <>
                        <span className="chat-user">{msg.user}</span>
                        <span className="chat-text">{msg.message}</span>
                        <span className="chat-time">{msg.timestamp}</span>
                      </>
                    )}
                    {(msg.type === "enter" || msg.type === "leave") && (
                      <span className="chat-system-message">{msg.message}</span>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {isLoggedIn && (
            <div className="chat-input-row">
              <input
                className="chat-input"
                type="text"
                placeholder={connected ? "메시지 입력..." : "연결 중..."}
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                autoComplete="off"
                disabled={!connected}
              />
              <button
                className="chat-send-btn"
                onClick={handleSend}
                disabled={!connected || !input.trim()}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 20L21 12L3 4V10L15 12L3 14V20Z" fill="white" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {openLogInModal && <LogIn setOpenLogInModal={setOpenLogInModal} />}
    </>
  );
};

export default LiveChatBox;

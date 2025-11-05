import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useAuth } from '../../../provider/AuthProvider';
import LogIn from '../member/LogIn'
import './LiveChatBox.css';

const MAX_MESSAGES = 100;

const LiveChatBox = ({ leagueId = 39 }) => {
    const { auth } = useAuth();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [connected, setConnected] = useState(false);
    const [openLogInModal, setOpenLogInModal] = useState(false);
    const [connectionError, setConnectionError] = useState(null); // ⭐ 에러 상태 추가

    const stompClient = useRef(null);
    const subscriptionRef = useRef(null);
    const messagesEndRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);

    const isLoggedIn = auth.isAuthenticated;
    const currentUser = auth.memberInfo?.memberNickname || '익명';

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!isLoggedIn) {
            console.log('⚠️ 로그인 필요 - WebSocket 연결 생략');
            return;
        }

        console.log(`🔌 리그 ${leagueId} 채팅 연결 시작... (사용자: ${currentUser})`);

        // ⭐ 쿠키 확인
        console.log('🍪 현재 쿠키:', document.cookie);

        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
        }

        if (subscriptionRef.current) {
            console.log('🔌 기존 구독 해제');
            try {
                subscriptionRef.current.unsubscribe();
            } catch (error) {
                console.error('구독 해제 실패:', error);
            }
            subscriptionRef.current = null;
        }

        if (stompClient.current?.connected) {
            console.log('🔌 기존 연결 종료');
            try {
                stompClient.current.send(
                    '/app/chat/leave',
                    {},
                    JSON.stringify({
                        type: 'LEAVE',
                        leagueId: leagueId,
                        sender: currentUser
                    })
                );
                stompClient.current.disconnect();
            } catch (error) {
                console.error('연결 종료 실패:', error);
            }
        }

        setMessages([]);
        setConnected(false);
        setConnectionError(null);

        connectWebSocket();

        return () => {
            console.log(`🧹 정리: 리그 ${leagueId}`);

            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }

            if (subscriptionRef.current) {
                try {
                    subscriptionRef.current.unsubscribe();
                } catch (error) {
                    console.error('구독 해제 실패:', error);
                }
            }

            if (stompClient.current?.connected) {
                try {
                    stompClient.current.send(
                        '/app/chat/leave',
                        {},
                        JSON.stringify({
                            type: 'LEAVE',
                            leagueId: leagueId,
                            sender: currentUser
                        })
                    );
                    stompClient.current.disconnect();
                } catch (error) {
                    console.error('연결 종료 실패:', error);
                }
            }
        };
    }, [leagueId, currentUser, isLoggedIn]);

    const connectWebSocket = () => {
        try {
            const wsUrl = 'http://localhost:8080/ws'; // Gateway
            console.log(`🔌 연결 시도: ${wsUrl}`);
            console.log('🍪 쿠키 전송 여부: true (withCredentials)');

            const socket = new SockJS(wsUrl, null, {
                transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
                withCredentials: true,
                debug: true
            });

            // ⭐ SockJS 이벤트 로깅
            socket.onopen = () => {
                console.log('✅ SockJS 소켓 열림');
            };

            socket.onerror = (error) => {
                console.error('❌ SockJS 에러:', error);
                setConnectionError('SockJS 연결 실패: ' + error);
            };

            socket.onclose = (event) => {
                console.log('🔌 SockJS 소켓 닫힘:', {
                    code: event.code,
                    reason: event.reason,
                    wasClean: event.wasClean
                });
                setConnected(false);

                if (!event.wasClean) {
                    console.log('🔄 비정상 종료 감지, 재연결 시도...');
                    reconnectTimeoutRef.current = setTimeout(() => {
                        connectWebSocket();
                    }, 3000);
                }
            };

            const client = Stomp.over(() => socket);

            // ⭐ STOMP 디버그 활성화
            client.debug = (str) => {
                console.log('STOMP:', str);
            };

            client.connect(
                { host: 'localhost' }, // ⭐ 여기가 중요! 빈 객체
                () => {
                    console.log(`✅ STOMP 연결 성공! (리그 ${leagueId})`);
                    setConnected(true);
                    setConnectionError(null);
                    stompClient.current = client;

                    const destination = `/topic/league-${leagueId}`;
                    console.log(`📡 구독 시작: ${destination}`);

                    subscriptionRef.current = client.subscribe(destination, (message) => {
                        try {
                            const receivedMsg = JSON.parse(message.body);
                            console.log('📩 받은 메시지:', receivedMsg);

                            setMessages(prev => {
                                const newMessage = {
                                    id: Date.now() + Math.random(),
                                    user: receivedMsg.sender,
                                    message: receivedMsg.message,
                                    timestamp: new Date(receivedMsg.timestamp).toLocaleTimeString('ko-KR', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }),
                                    type: receivedMsg.type.toLowerCase()
                                };

                                const updated = [...prev, newMessage];

                                if (updated.length > MAX_MESSAGES) {
                                    console.log(`📦 메시지 제한: ${updated.length} → ${MAX_MESSAGES}`);
                                    return updated.slice(-MAX_MESSAGES);
                                }

                                return updated;
                            });
                        } catch (error) {
                            console.error('❌ 메시지 파싱 실패:', error);
                        }
                    });

                    // 입장 메시지 전송
                    client.send(
                        '/app/chat/enter',
                        {},
                        JSON.stringify({
                            type: 'ENTER',
                            leagueId: leagueId,
                            sender: currentUser
                        })
                    );

                    console.log('✅ 입장 메시지 전송 완료');
                },
                (error) => {
                    console.error('❌ STOMP 연결 실패:', error);
                    console.error('에러 상세:', {
                        headers: error.headers,
                        body: error.body,
                        command: error.command
                    });

                    setConnected(false);
                    setConnectionError('STOMP 연결 실패: ' + (error.headers?.message || error));
                    stompClient.current = null;

                    reconnectTimeoutRef.current = setTimeout(() => {
                        console.log('🔄 재연결 시도...');
                        connectWebSocket();
                    }, 5000);
                }
            );

        } catch (error) {
            console.error('❌ WebSocket 초기화 실패:', error);
            setConnected(false);
            setConnectionError('초기화 실패: ' + error.message);
        }
    };

    const handleSend = () => {
        if (!connected || !input.trim() || !stompClient.current) {
            console.warn('⚠️ 전송 불가:', {
                connected,
                hasInput: !!input.trim(),
                hasClient: !!stompClient.current
            });
            return;
        }

        const message = {
            type: 'TALK',
            leagueId: leagueId,
            sender: currentUser,
            message: input.trim()
        };

        console.log('📤 메시지 전송:', message);

        try {
            stompClient.current.send(
                '/app/chat/send',
                {},
                JSON.stringify(message)
            );

            setInput('');
        } catch (error) {
            console.error('❌ 메시지 전송 실패:', error);
            alert('메시지 전송에 실패했습니다. 연결을 확인해주세요.');
        }
    };

    const handleInputChange = (e) => setInput(e.target.value);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleLoginClick = () => {
        setOpenLogInModal(true);
    };

    const getLeagueName = (id) => {
        const leagueNames = {
            39: '프리미어 리그',
            140: '라리가',
            135: '세리에A',
            78: '분데스리가',
            61: '리그1'
        };
        return leagueNames[id] || `리그 ${id}`;
    };

    return (
        <>
            <div className='chat-box-wrap'>
                <div className="live-chat-box">
                    <div className="chat-header">
                        <span className="chat-title">
                            실시간 채팅
                            {isLoggedIn && connected && <span className="status-indicator">🟢</span>}
                            {isLoggedIn && !connected && <span className="status-indicator">🔴</span>}
                        </span>
                        <span className="chat-match">
                            {getLeagueName(leagueId)} {isLoggedIn && `(${messages.length}/${MAX_MESSAGES})`}
                        </span>
                    </div>

                    <div className="chat-messages">
                        {!isLoggedIn ? (
                            <div className="chat-login-required">
                                <div className="login-icon">💬</div>
                                <p className="login-message">채팅에 참여하려면 로그인이 필요합니다</p>
                                <button className="chat-login-btn" onClick={handleLoginClick}>
                                    로그인하기
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* ⭐ 에러 메시지 표시 */}
                                {connectionError && (
                                    <div className="chat-notice" style={{ color: 'red', padding: '10px' }}>
                                        ⚠️ {connectionError}
                                    </div>
                                )}

                                {!connected && messages.length === 0 && !connectionError && (
                                    <div className="chat-notice">
                                        연결 중...
                                    </div>
                                )}

                                {messages.map(msg => (
                                    <div key={msg.id} className={`chat-msg chat-msg-${msg.type}`}>
                                        {msg.type === 'talk' && (
                                            <>
                                                <span className="chat-user">{msg.user}</span>
                                                <span className="chat-text">{msg.message}</span>
                                                <span className="chat-time">{msg.timestamp}</span>
                                            </>
                                        )}
                                        {(msg.type === 'enter' || msg.type === 'leave') && (
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
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
import React, { useState } from 'react';
import './LiveChatBox.css';
import { chatMessages } from '../../../utils/mockData.js';

const LiveChatBox = ({ match, isLoggedIn, onLoginClick }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState(chatMessages);

    const handleInputChange = (e) => setInput(e.target.value);
    const handleSend = () => {
        if (!isLoggedIn) return;
        if (input.trim() === '') return;
        setMessages([
            ...messages,
            {
                id: messages.length + 1,
                user: '나',
                message: input,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'message',
            },
        ]);
        setInput('');
    };

    return (
        <div className='chat-box-wrap'>
            <div className="live-chat-box">
                <div className="chat-header">
                    <span className="chat-title">실시간 채팅</span>
                    <span className="chat-match">{match.homeTeam} vs {match.awayTeam}</span>
                </div>
                <div className="chat-messages">
                    {messages.map(msg => (
                        <div key={msg.id} className={`chat-msg chat-msg-${msg.type}`}>
                            <span className="chat-user">{msg.user}</span>
                            <span className="chat-text">{msg.message}</span>
                            <span className="chat-time">{msg.timestamp}</span>
                        </div>
                    ))}
                </div>
                <div className="chat-input-row">
                    {isLoggedIn ? (
                        <>
                            <input
                                className="chat-input"
                                type="text"
                                placeholder="메시지 입력..."
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                                autoComplete="off"
                            />
                            <button className="chat-send-btn" onClick={handleSend} disabled={!input.trim()}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 20L21 12L3 4V10L15 12L3 14V20Z" fill="white" />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <button className="chat-login-btn chat-login-modern-btn" onClick={onLoginClick}>로그인</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LiveChatBox;

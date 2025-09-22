
import React, { useState, useCallback } from 'react';
import { allMatches, teamKoreanNames, getTeamLogo, teams, chatMessages } from '../../../utils/mockData.js';
import './LiveMatchList.css';

// 간단한 로그인 상태 관리 (실제 서비스에서는 context/provider 사용)
const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // 실제로는 로그인 로직 필요
    return { isLoggedIn, setIsLoggedIn };
};

// 라이브 채팅 UI 컴포넌트 (심플/기본 스타일)
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
            <div className="chat-input-row chat-input-row-modern">
                {isLoggedIn ? (
                    <>
                        <input
                            className="chat-input"
                            type="text"
                            placeholder="메시지를 입력하세요..."
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                            autoComplete="off"
                        />
                        <button className="chat-send-btn" onClick={handleSend} disabled={!input.trim()}>
                            <span role="img" aria-label="send">📨</span>
                        </button>
                    </>
                ) : (
                    <button className="chat-login-btn chat-login-modern-btn" onClick={onLoginClick}>로그인</button>
                )}
            </div>
        </div>
    );
};

const LiveMatchList = () => {
    // 나중에 API로 대체될 부분
    // const [matches, setMatches] = useState([]);
    // useEffect(() => {
    //   fetch('/api/live-matches').then(...)
    // }, []);
    // 지금은 mockData 사용
    // 한 번에 보여줄 경기 수

    const PAGE_SIZE = 3;
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [modalMatch, setModalMatch] = useState(null);

    const handleShowMore = useCallback(() => {
        setVisibleCount((prev) => prev + PAGE_SIZE);
    }, []);

    const visibleMatches = allMatches.slice(0, visibleCount);

    const handleCardClick = (match) => {
        setModalMatch(match);
    };

    const handleCloseModal = () => {
        setModalMatch(null);
    };

    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const [loginModal, setLoginModal] = useState(false);
    const handleLoginClick = () => {
        setLoginModal(true);
    };
    const handleDoLogin = () => {
        setIsLoggedIn(true);
        setLoginModal(false);
    };
    const handleCloseLoginModal = () => setLoginModal(false);

    return (
        <div className="LiveMatchListWrap" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
            <div className="LiveMatchList" style={{ flex: 1 }}>
                {allMatches.length === 0 ? (
                    <div className="no-matches">경기 정보가 없습니다.</div>
                ) : (
                    <>
                        {visibleMatches.map(match => (
                            <div
                                className="LiveMatchCard"
                                key={match.id}
                                tabIndex={0}
                                onClick={() => handleCardClick(match)}
                                onKeyDown={e => { if (e.key === 'Enter') handleCardClick(match); }}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="lmc-top-row">
                                    <span className="lmc-league">{match.league}</span>
                                    <div className="lmc-status-block">
                                        <span className="lmc-time"><i className="fa-regular fa-clock"></i> {match.time || '--'}</span>
                                        <span className={`lmc-status ${match.isLive ? 'live' : 'end'}`}>{match.isLive ? 'LIVE' : (match.status === 'FT' ? '종료' : match.status)}</span>
                                    </div>
                                </div>
                                <div className="lmc-main-row">
                                    <div className="lmc-team lmc-home">
                                        <img src={getTeamLogo(match.homeTeam)} alt={match.homeTeam + ' 로고'} className="lmc-team-logo" />
                                        <span className="lmc-team-name">{match.homeTeam}</span>
                                    </div>
                                    <div className="lmc-score-block">
                                        <span className="lmc-score">{match.homeScore !== null ? match.homeScore : '-'}</span>
                                        <span className="lmc-score-sep">-</span>
                                        <span className="lmc-score">{match.awayScore !== null ? match.awayScore : '-'}</span>
                                    </div>
                                    <div className="lmc-team lmc-away">
                                        <img src={getTeamLogo(match.awayTeam)} alt={match.awayTeam + ' 로고'} className="lmc-team-logo" />
                                        <span className="lmc-team-name">{match.awayTeam}</span>
                                    </div>
                                </div>
                                <div className="lmc-info-row">
                                    <span className="lmc-info lmc-possession">
                                        <span className="lmc-dot lmc-dot-blue"></span>
                                        점유율 64%
                                    </span>
                                    <span className="lmc-info lmc-shots">
                                        <span className="lmc-dot lmc-dot-green"></span>
                                        슛 12회
                                    </span>
                                    <span className="lmc-info lmc-yellow">
                                        <span className="lmc-dot lmc-dot-yellow"></span>
                                        경고 3장
                                    </span>
                                </div>
                            </div>
                        ))}
                        {visibleCount < allMatches.length && (
                            <button className="show-more-btn" onClick={handleShowMore}>경기 더보기</button>
                        )}
                        {modalMatch && (
                            <div className="MatchModalOverlay" onClick={handleCloseModal}>
                                <div className="MatchModal" onClick={e => e.stopPropagation()}>
                                    <button className="close-modal-btn" onClick={handleCloseModal}>&times;</button>
                                    <h2>{modalMatch.league}</h2>
                                    <div className="modal-teams modal-teams-logos">
                                        <div className="modal-team-block">
                                            {getTeamLogo(modalMatch.homeTeam) && (
                                                <img src={getTeamLogo(modalMatch.homeTeam)} alt={modalMatch.homeTeam + ' 로고'} className="modal-team-logo" />
                                            )}
                                            <span className="modal-team-ko">{teamKoreanNames[modalMatch.homeTeam] || modalMatch.homeTeam}</span>
                                            <span className="modal-team-en">{modalMatch.homeTeam}</span>
                                        </div>
                                        <span className="modal-score">{modalMatch.homeScore} : {modalMatch.awayScore}</span>
                                        <div className="modal-team-block">
                                            {getTeamLogo(modalMatch.awayTeam) && (
                                                <img src={getTeamLogo(modalMatch.awayTeam)} alt={modalMatch.awayTeam + ' 로고'} className="modal-team-logo" />
                                            )}
                                            <span className="modal-team-ko">{teamKoreanNames[modalMatch.awayTeam] || modalMatch.awayTeam}</span>
                                            <span className="modal-team-en">{modalMatch.awayTeam}</span>
                                        </div>
                                    </div>
                                    <div className="modal-info">
                                        <div><span>경기 상태</span> <b>{modalMatch.status}</b></div>
                                        <div><span>진행 시간</span> <b>{modalMatch.time}</b></div>
                                        <div><span>경기장</span> <b>{modalMatch.stadium}</b></div>
                                        <div><span>일자</span> <b>{modalMatch.date}</b></div>
                                        <div><span>시작 시간</span> <b>{modalMatch.startTime}</b></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* 로그인 모달 */}
                        {loginModal && (
                            <div className="login-modal-overlay" onClick={handleCloseLoginModal}>
                                <div className="login-modal" onClick={e => e.stopPropagation()}>
                                    <h3>로그인이 필요합니다</h3>
                                    <button className="chat-login-btn" onClick={handleDoLogin}>간편 로그인</button>
                                    <button className="chat-login-btn chat-login-cancel" onClick={handleCloseLoginModal}>취소</button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
            {/* 채팅 박스를 오른쪽에 고정 */}
            <div className="LiveMatchChatAside" style={{ minWidth: 340, marginLeft: 32 }}>
                <LiveChatBox match={visibleMatches[0] || allMatches[0]} isLoggedIn={isLoggedIn} onLoginClick={handleLoginClick} />
            </div>
        </div>
    );
};

export default LiveMatchList;

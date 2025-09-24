
import React, { useState, useCallback } from 'react';
import { allMatches, teamKoreanNames, getTeamLogo, teams } from '../../../utils/mockData.js';
import './LiveMatchList.css';
import LiveChatBox from './LiveChatBox.jsx';

// 간단한 로그인 상태 관리 (실제 서비스에서는 context/provider 사용)
const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return { isLoggedIn, setIsLoggedIn };
};

const LiveMatchList = () => {
    // 나중에 API로 대체될 부분
    // const [matches, setMatches] = useState([]);
    // useEffect(() => {
    //   fetch('/api/live-matches').then(...)
    // }, []);
    // 지금은 mockData 사용
    // 한 번에 보여줄 경기 수

    const PAGE_SIZE = 6;
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
                        {visibleMatches.slice(0, 6).map(match => (
                            <div
                                className="LiveMatchCard"
                                key={match.id}
                                tabIndex={0}
                                onClick={() => handleCardClick(match)}
                                onKeyDown={e => { if (e.key === 'Enter') handleCardClick(match); }}
                                style={{ cursor: 'pointer', position: 'relative' }}
                            >
                                <div className="card-gradient" />
                                <div className="card-content">
                                    <div className="lmc-top-row">
                                        <span className="lmc-badge">
                                            <span className="lmc-badge-dot"></span>
                                            LIVE
                                        </span>
                                        <div className="lmc-time">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play w-4 h-4 text-red-500" aria-hidden="true"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path></svg>
                                            <span className="font-medium">{match.time || '--'}분</span>
                                        </div>
                                    </div>
                                    <div className="lmc-main">
                                        <div className="lmc-team-row">
                                            <div className="lmc-team-block">
                                                <div className="lmc-team-logo">
                                                    <div className="lmc-team-logo-inner">
                                                        {getTeamLogo(match.homeTeam) && <img src={getTeamLogo(match.homeTeam)} alt={match.homeTeam + ' 로고'} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '6px' }} />}
                                                    </div>
                                                </div>
                                                <div className="lmc-team-info">
                                                    <div className="lmc-team-name">{teamKoreanNames[match.homeTeam] || match.homeTeam}</div>
                                                    <div className="lmc-team-type">홈</div>
                                                </div>
                                            </div>
                                            <div className="lmc-score">{match.homeScore !== null ? match.homeScore : '-'}</div>
                                        </div>
                                        <div className="lmc-vs-row">
                                            <div className="lmc-vs-line"></div>
                                            <span className="lmc-vs">VS</span>
                                            <div className="lmc-vs-line"></div>
                                        </div>
                                        <div className="lmc-team-row">
                                            <div className="lmc-team-block">
                                                <div className="lmc-team-logo" >
                                                    <div className="lmc-team-logo-inner">
                                                        {getTeamLogo(match.awayTeam) && <img src={getTeamLogo(match.awayTeam)} alt={match.awayTeam + ' 로고'} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '6px' }} />}
                                                    </div>
                                                </div>
                                                <div className="lmc-team-info">
                                                    <div className="lmc-team-name">{teamKoreanNames[match.awayTeam] || match.awayTeam}</div>
                                                    <div className="lmc-team-type">어웨이</div>
                                                </div>
                                            </div>
                                            <div className="lmc-score">{match.awayScore !== null ? match.awayScore : '-'}</div>
                                        </div>
                                    </div>
                                    <div className="lmc-stadium-row">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-4 h-4 text-blue-500" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                        <span className="lmc-stadium-name">{match.stadium || '-'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {visibleCount < allMatches.length && (
                            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center' }}>
                                <button className="show-more-btn" onClick={handleShowMore}>경기 더보기</button>
                            </div>
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
            <div className="LiveMatchChatAside" style={{ minWidth: 340, marginLeft: 32 }}>
                <LiveChatBox match={visibleMatches[0] || allMatches[0]} isLoggedIn={isLoggedIn} onLoginClick={handleLoginClick} />
            </div>
        </div>
    );
};

export default LiveMatchList;

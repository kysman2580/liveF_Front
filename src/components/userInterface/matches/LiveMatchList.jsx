import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import LiveChatBox from './LiveChatBox.jsx';
import { useLocation } from 'react-router-dom';
import './LiveMatchList.css';

const DEFAULT_LEAGUE_ID = 39; // 기본 리그: Premier League
const API_URL = URL_CONFIG.API_URL; // 환경 변수로 설정된 API URL
const PAGE_SIZE = 6;

const LiveMatchList = () => {
    const [matches, setMatches] = useState([]);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [modalMatch, setModalMatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    // 로그인 상태 관리
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const [currentUser, setCurrentUser] = useState('익명'); // 사용자명

    const handleLoginClick = () => setLoginModal(true);

    const handleDoLogin = () => {
        setIsLoggedIn(true);
        // 임시 사용자명 생성 (실제로는 로그인 API에서 받아와야 함)
        setCurrentUser('사용자' + Math.floor(Math.random() * 1000));
        setLoginModal(false);
    };

    const handleCloseLoginModal = () => setLoginModal(false);

    // 현재 리그 ID 추출
    const queryParams = new URLSearchParams(location.search);
    const currentLeagueId = parseInt(queryParams.get('leagueId') || DEFAULT_LEAGUE_ID);

    useEffect(() => {
        setLoading(true);

        axios.get(`${API_URL}/api/v1/feed/fixtures?leagueId=${currentLeagueId}`)
            .then(res => {
                setMatches(Array.isArray(res.data) ? res.data : []);
                setError(null);
            })
            .catch(error => {
                console.error("Error fetching fixtures:", error);
                setMatches([]);
                setError('경기 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [location.search, currentLeagueId]);

    const handleShowMore = useCallback(() => {
        setVisibleCount((prev) => prev + PAGE_SIZE);
    }, []);

    const visibleMatches = Array.isArray(matches) ? matches.slice(0, visibleCount) : [];

    const handleCardClick = (match) => setModalMatch(match);
    const handleCloseModal = () => setModalMatch(null);

    return (
        <div className="LiveMatchListWrap" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
            {/* 경기 목록 */}
            <div className="LiveMatchList" style={{ flex: 1 }}>
                {loading ? (
                    <div className="no-matches">경기 정보를 불러오는 중...</div>
                ) : error ? (
                    <div className="no-matches" style={{ color: 'red' }}>{error}</div>
                ) : matches.length === 0 ? (
                    <div className="no-matches">경기 정보가 없습니다.</div>
                ) : (
                    <>
                        {visibleMatches.map(match => (
                            <div
                                className="LiveMatchCard"
                                key={match.fixtureId || Math.random()}
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
                                            {match.status || 'NS'}
                                        </span>
                                        <div className="lmc-time">
                                            <span className="font-medium">{match.time || '--'}</span>
                                        </div>
                                    </div>
                                    <div className="lmc-main">
                                        <div className="lmc-team-row">
                                            <div className="lmc-team-block">
                                                <div className="lmc-team-logo-inner">
                                                    {match.homeTeamLogoUrl && (
                                                        <img
                                                            src={match.homeTeamLogoUrl}
                                                            alt={`${match.homeTeamName || 'Unknown'} 로고`}
                                                            style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '6px' }}
                                                        />
                                                    )}
                                                </div>
                                                <div className="lmc-team-info">
                                                    <div className="lmc-team-name">{match.homeTeamName || 'Unknown'}</div>
                                                    <div className="lmc-team-type">홈</div>
                                                </div>
                                            </div>
                                            <div className="lmc-score">{match.score ? match.score.split(' - ')[0] || '-' : '-'}</div>
                                        </div>
                                        <div className="lmc-vs-row">
                                            <div className="lmc-vs-line"></div>
                                            <span className="lmc-vs">VS</span>
                                            <div className="lmc-vs-line"></div>
                                        </div>
                                        <div className="lmc-team-row">
                                            <div className="lmc-team-block">
                                                <div className="lmc-team-logo-inner">
                                                    {match.awayTeamLogoUrl && (
                                                        <img
                                                            src={match.awayTeamLogoUrl}
                                                            alt={`${match.awayTeamName || 'Unknown'} 로고`}
                                                            style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '6px' }}
                                                        />
                                                    )}
                                                </div>
                                                <div className="lmc-team-info">
                                                    <div className="lmc-team-name">{match.awayTeamName || 'Unknown'}</div>
                                                    <div className="lmc-team-type">어웨이</div>
                                                </div>
                                            </div>
                                            <div className="lmc-score">{match.score ? match.score.split(' - ')[1] || '-' : '-'}</div>
                                        </div>
                                    </div>
                                    <div className="lmc-stadium-row">
                                        <span className="lmc-stadium-name">{match.venue || '-'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {visibleCount < matches.length && (
                            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center' }}>
                                <button className="show-more-btn" onClick={handleShowMore}>경기 더보기</button>
                            </div>
                        )}

                        {/* 경기 상세 모d달 */}
                        {modalMatch && (
                            <div className="MatchModalOverlay" onClick={handleCloseModal}>
                                <div className="MatchModal" onClick={e => e.stopPropagation()}>
                                    <button className="close-modal-btn" onClick={handleCloseModal}>&times;</button>
                                    <h2>{modalMatch.leagueName || 'Unknown League'}</h2>
                                    <div className="modal-teams modal-teams-logos">
                                        <div className="modal-team-block">
                                            {modalMatch.homeTeamLogoUrl && (
                                                <img
                                                    src={modalMatch.homeTeamLogoUrl}
                                                    alt={`${modalMatch.homeTeamName || 'Unknown'} 로고`}
                                                    className="modal-team-logo"
                                                />
                                            )}
                                            <span className="modal-team-ko">{modalMatch.homeTeamName || 'Unknown'}</span>
                                        </div>
                                        <span className="modal-score">{modalMatch.score || '0 - 0'}</span>
                                        <div className="modal-team-block">
                                            {modalMatch.awayTeamLogoUrl && (
                                                <img
                                                    src={modalMatch.awayTeamLogoUrl}
                                                    alt={`${modalMatch.awayTeamName || 'Unknown'} 로고`}
                                                    className="modal-team-logo"
                                                />
                                            )}
                                            <span className="modal-team-ko">{modalMatch.awayTeamName || 'Unknown'}</span>
                                        </div>
                                    </div>
                                    <div className="modal-info">
                                        <div><span>경기 상태</span> <b>{modalMatch.status || 'NS'}</b></div>
                                        <div><span>경기장</span> <b>{modalMatch.venue || '-'}</b></div>
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

            {/* 채팅창 - 리그ID 전달 ⭐ 핵심 변경 부분! */}
            <div className="LiveMatchChatAside" style={{ minWidth: 340, marginLeft: 32 }}>
                <LiveChatBox
                    leagueId={currentLeagueId}      // ← match 대신 leagueId 전달!
                    isLoggedIn={isLoggedIn}
                    onLoginClick={handleLoginClick}
                    currentUser={currentUser}       // ← 사용자명 전달
                />
            </div>
        </div>
    );
};

export default LiveMatchList;
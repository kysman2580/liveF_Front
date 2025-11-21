import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./LiveMatchList.css";
import {
    allMatches,
    getTeamLogo,
    teamKoreanNames,
} from "../../../utils/mockData";

const DEFAULT_LEAGUE_ID = 39;
const API_URL = URL_CONFIG.API_URL;
const PAGE_SIZE = 6;

const USE_MOCK = false;

const getMatchDay = (dateStr, timeStr) => {
    // 🔍 유효성 검사 강화
    if (!dateStr || dateStr === 'null' || dateStr === 'undefined') {
        return null; // 또는 "날짜미정"
    }

    if (!timeStr) {
        return dateStr; // 시간이 없으면 날짜만 반환
    }

    try {
        const [year, month, day] = dateStr.split("-").map(Number);
        const [hour] = timeStr.split(":").map(Number);

        // 새벽 0시 ~ 5시 59분 경기는 전날로 분류
        if (hour < 6) {
            const date = new Date(year, month - 1, day);
            date.setDate(date.getDate() - 1);
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, "0");
            const d = String(date.getDate()).padStart(2, "0");
            return `${y}-${m}-${d}`;
        }

        return dateStr;
    } catch (error) {
        console.error("getMatchDay 오류:", dateStr, timeStr, error);
        return null;
    }
};

const formatDateDisplay = (dateStr) => {
    if (!dateStr) return "--";
    return dateStr.substring(5, 10).replace("-", "/");
};

const getRelativeDateText = (dateStr, today) => {
    if (dateStr === today) return "오늘";

    const date = new Date(dateStr);
    const todayDate = new Date(today);
    const diffDays = Math.floor((date - todayDate) / (1000 * 60 * 60 * 24));

    if (diffDays === -1) return "어제";
    if (diffDays === 1) return "내일";

    return formatDateDisplay(dateStr);
};

const sortMatchesByDateAsc = (a, b) => {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    if (a.time < b.time) return -1;
    if (a.time > b.time) return 1;
    return 0;
};

const LiveMatchList = () => {
    const [matches, setMatches] = useState([]);
    const [modalMatch, setModalMatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const [currentUser, setCurrentUser] = useState("익명");

    const handleLoginClick = () => setLoginModal(true);

    const handleDoLogin = () => {
        setIsLoggedIn(true);
        setCurrentUser("사용자" + Math.floor(Math.random() * 1000));
        setLoginModal(false);
    };

    const handleCloseLoginModal = () => setLoginModal(false);

    const queryParams = new URLSearchParams(location.search);
    const currentLeagueId = parseInt(
        queryParams.get("leagueId") || DEFAULT_LEAGUE_ID
    );

    const convertMockToApiFormat = (mockMatches) => {
        return mockMatches.map((match) => {
            const matchDay = getMatchDay(match.date, match.startTime);

            return {
                fixtureId: match.id,
                date: match.date,
                fixtureDate: match.date,
                time: match.startTime,
                matchDay: matchDay, // 경기일
                status: match.status,
                homeTeamName: teamKoreanNames[match.homeTeam] || match.homeTeam,
                awayTeamName: teamKoreanNames[match.awayTeam] || match.awayTeam,
                homeTeamLogoUrl: getTeamLogo(match.homeTeam),
                awayTeamLogoUrl: getTeamLogo(match.awayTeam),
                score:
                    match.homeScore !== null && match.awayScore !== null
                        ? `${match.homeScore} - ${match.awayScore}`
                        : "0 - 0",
                venue: match.stadium,
                leagueName: match.league,
            };
        });
    };

    useEffect(() => {
        setLoading(true);

        if (USE_MOCK) {
            console.log("📦 Mock 데이터 로딩 중...");
            setTimeout(() => {
                let convertedData = convertMockToApiFormat(allMatches);
                convertedData = convertedData.sort(sortMatchesByDateAsc);

                setMatches(convertedData);
                setError(null);
                setLoading(false);
                console.log("✅ Mock 데이터 로드 완료:", convertedData);
            }, 500);
        } else {
            axios
                .get(`${API_URL}/api/v1/feed/fixtures?leagueId=${currentLeagueId}`)
                .then((res) => {
                    let fetchedData = Array.isArray(res.data) ? res.data : [];

                    fetchedData = fetchedData.map((match) => {
                        // kickoffTime 변환
                        let matchDate = null;
                        let matchTime = null;

                        if (match.kickoffTime && Array.isArray(match.kickoffTime)) {
                            const [year, month, day, hour, minute] = match.kickoffTime;
                            matchDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                            matchTime = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
                        }

                        // 🔥 score 파싱 ("5 - 1" → homeScore: 5, awayScore: 1)
                        let homeScore = null;
                        let awayScore = null;

                        if (match.score && typeof match.score === 'string') {
                            const scores = match.score.split('-').map(s => s.trim());
                            if (scores.length === 2) {
                                homeScore = parseInt(scores[0]) || null;
                                awayScore = parseInt(scores[1]) || null;
                            }
                        }

                        return {
                            ...match,
                            date: matchDate,
                            time: matchTime,
                            matchDay: getMatchDay(matchDate, matchTime),
                            homeScore,
                            awayScore,
                        };
                    });

                    fetchedData = fetchedData.sort(sortMatchesByDateAsc);

                    setMatches(fetchedData);
                    setError(null);
                })
                .catch((error) => {
                    console.error("Error fetching fixtures:", error);
                    setMatches([]);
                    setError(
                        "경기 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요."
                    );
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [location.search, currentLeagueId]);

    const getTodayMatchDay = () => {
        const now = new Date();
        const hour = now.getHours();

        // 새벽 0~5시면 어제로 간주
        if (hour < 6) {
            now.setDate(now.getDate() - 1);
        }
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, "0");
        const d = String(now.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    };

    const getGroupedMatches = () => {
        if (!Array.isArray(matches)) return {};

        const grouped = {};
        matches.forEach((match) => {
            const matchDay = match.matchDay || match.date || "날짜미정";

            if (!grouped[matchDay]) {
                grouped[matchDay] = [];
            }
            grouped[matchDay].push(match);
        });

        return grouped;
    };


    const formatDateHeader = (dateStr) => {
        if (!dateStr || dateStr === 'undefined') return "날짜 미정";

        try {
            const [year, month, day] = dateStr.split("-");
            if (!month || !day) return "날짜 미정";
            return `${month}/${day}`;
        } catch (error) {
            console.error("날짜 포맷 오류:", dateStr, error);
            return "날짜 미정";
        }
    };

    const handleCardClick = (match) => setModalMatch(match);
    const handleCloseModal = () => setModalMatch(null);

    const groupedMatches = getGroupedMatches();
    const sortedDates = Object.keys(groupedMatches).sort();

    return (
        <div
            className="LiveMatchListWrap"
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
            }}
        >
            <div style={{ flex: 1 }}>
                {/* 경기 목록 */}
                <div className="LiveMatchList">
                    {loading ? (
                        <div className="no-matches">경기 정보를 불러오는 중...</div>
                    ) : error ? (
                        <div className="no-matches" style={{ color: "red" }}>
                            {error}
                        </div>
                    ) : matches.length === 0 ? (
                        <div className="no-matches">경기 정보가 없습니다.</div>
                    ) : (
                        <>
                            {sortedDates.map((date) => (
                                <React.Fragment key={date}>
                                    {/* 날짜 헤더 */}
                                    <div className="date-group-header">
                                        <h3 className="date-group-title">
                                            {formatDateHeader(date)} 경기
                                        </h3>
                                    </div>

                                    {/* 해당 날짜의 경기 카드들 */}
                                    {groupedMatches[date].map((match) => (
                                        <div
                                            className="LiveMatchCard"
                                            key={match.fixtureId || Math.random()}
                                            tabIndex={0}
                                            onClick={() => handleCardClick(match)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") handleCardClick(match);
                                            }}
                                            style={{ cursor: "pointer", position: "relative" }}
                                        >
                                            <div className="card-gradient" />
                                            <div className="card-content">
                                                <div className="lmc-top-row">
                                                    <span className="lmc-badge">
                                                        <span className="lmc-badge-dot"></span>
                                                        {match.status || "NS"}
                                                    </span>
                                                    <div className="lmc-time">
                                                        <span className="font-medium">
                                                            {match.time || "--"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lmc-main">
                                                    <div className="lmc-team-row">
                                                        {/* 홈 팀 블록 */}
                                                        <div className="lmc-team-block">
                                                            <div className="lmc-team-logo-inner">
                                                                {match.homeTeamLogoUrl && (
                                                                    <img
                                                                        src={
                                                                            match.homeTeamLogoUrl ||
                                                                            "/placeholder.svg"
                                                                        }
                                                                        alt={`${match.homeTeamName || "Unknown"} 로고`}
                                                                        style={{
                                                                            width: "100%",
                                                                            height: "100%",
                                                                            objectFit: "contain",
                                                                            borderRadius: "6px",
                                                                        }}
                                                                    />
                                                                )}
                                                            </div>
                                                            <div className="lmc-team-info">
                                                                <div className="lmc-team-name">
                                                                    {match.homeTeamName || "Unknown"}
                                                                </div>
                                                                <div className="lmc-team-type">홈</div>
                                                            </div>
                                                        </div>
                                                        {/* 🌟 수정된 부분: match.homeScore 사용 */}
                                                        <div className="lmc-score">
                                                            {match.homeScore !== null ? match.homeScore : "-"}
                                                        </div>
                                                    </div>
                                                    <div className="lmc-vs-row">
                                                        <div className="lmc-vs-line"></div>
                                                        <span className="lmc-vs">VS</span>
                                                        <div className="lmc-vs-line"></div>
                                                    </div>
                                                    <div className="lmc-team-row">
                                                        {/* 원정 팀 블록 */}
                                                        <div className="lmc-team-block">
                                                            <div className="lmc-team-logo-inner">
                                                                {match.awayTeamLogoUrl && (
                                                                    <img
                                                                        src={
                                                                            match.awayTeamLogoUrl ||
                                                                            "/placeholder.svg"
                                                                        }
                                                                        alt={`${match.awayTeamName || "Unknown"} 로고`}
                                                                        style={{
                                                                            width: "100%",
                                                                            height: "100%",
                                                                            objectFit: "contain",
                                                                            borderRadius: "6px",
                                                                        }}
                                                                    />
                                                                )}
                                                            </div>
                                                            <div className="lmc-team-info">
                                                                <div className="lmc-team-name">
                                                                    {match.awayTeamName || "Unknown"}
                                                                </div>
                                                                <div className="lmc-team-type">어웨이</div>
                                                            </div>
                                                        </div>
                                                        {/* 🌟 수정된 부분: match.awayScore 사용 */}
                                                        <div className="lmc-score">
                                                            {match.awayScore !== null ? match.awayScore : "-"}
                                                        </div>
                                                    </div>
                                                    <div className="lmc-stadium-row">
                                                        <span className="lmc-stadium-name">
                                                            {match.venue || "-"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}

                            {modalMatch && (
                                <div className="MatchModalOverlay" onClick={handleCloseModal}>
                                    <div
                                        className="MatchModal"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button
                                            className="close-modal-btn"
                                            onClick={handleCloseModal}
                                        >
                                            &times;
                                        </button>
                                        <h2>{modalMatch.leagueName || "Unknown League"}</h2>
                                        <div className="modal-teams modal-teams-logos">
                                            <div className="modal-team-block">
                                                {modalMatch.homeTeamLogoUrl && (
                                                    <img
                                                        src={
                                                            modalMatch.homeTeamLogoUrl || "/placeholder.svg"
                                                        }
                                                        alt={`${modalMatch.homeTeamName || "Unknown"} 로고`}
                                                        className="modal-team-logo"
                                                    />
                                                )}
                                                <span className="modal-team-ko">
                                                    {modalMatch.homeTeamName || "Unknown"}
                                                </span>
                                            </div>
                                            <span className="modal-score">
                                                {modalMatch.score || "0 - 0"}
                                            </span>
                                            <div className="modal-team-block">
                                                {modalMatch.awayTeamLogoUrl && (
                                                    <img
                                                        src={
                                                            modalMatch.awayTeamLogoUrl || "/placeholder.svg"
                                                        }
                                                        alt={`${modalMatch.awayTeamName || "Unknown"} 로고`}
                                                        className="modal-team-logo"
                                                    />
                                                )}
                                                <span className="modal-team-ko">
                                                    {modalMatch.awayTeamName || "Unknown"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="modal-info">
                                            <div>
                                                <span>경기 상태</span>{" "}
                                                <b>{modalMatch.status || "NS"}</b>
                                            </div>
                                            <div>
                                                <span>경기장</span> <b>{modalMatch.venue || "-"}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {loginModal && (
                                <div
                                    className="login-modal-overlay"
                                    onClick={handleCloseLoginModal}
                                >
                                    <div
                                        className="login-modal"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <h3>로그인이 필요합니다</h3>
                                        <button className="chat-login-btn" onClick={handleDoLogin}>
                                            간편 로그인
                                        </button>
                                        <button
                                            className="chat-login-btn chat-login-cancel"
                                            onClick={handleCloseLoginModal}
                                        >
                                            취소
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LiveMatchList;

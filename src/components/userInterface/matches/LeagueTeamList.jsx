import React, { useState, useEffect } from 'react';
import axios from "axios";
import './LeagueTeamList.css';

const LeagueTeamList = ({ leagueName }) => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = URL_CONFIG.API_URL;

    // 리그명 → 리그 ID 매핑
    const leagueIdMap = {
        'Premier League': 39,
        'La Liga': 140,
        'Ligue 1': 61,
        'Serie A': 135,
        'Bundesliga': 78
    };

    // 한글 팀명 매핑 (API 응답의 팀명을 한글로 변환)
    const teamKoreanNames = {
        'Arsenal': '아스널',
        'Aston Villa': '애스턴 빌라',
        'AFC Bournemouth': '본머스',
        'Brentford': '브렌트포드',
        'Brighton & Hove Albion': '브라이튼',
        'Chelsea': '첼시',
        'Crystal Palace': '크리스털 팰리스',
        'Everton': '에버턴',
        'Fulham': '풀럼',
        'Ipswich Town': '입스위치 타운',
        'Leicester City': '레스터 시티',
        'Liverpool': '리버풀',
        'Manchester City': '맨체스터 시티',
        'Manchester United': '맨체스터 유나이티드',
        'Newcastle United': '뉴캐슬 유나이티드',
        'Nottingham Forest': '노팅엄 포레스트',
        'Southampton': '사우샘프턴',
        'Tottenham Hotspur': '토트넘 홋스퍼',
        'West Ham United': '웨스트햄 유나이티드',
        'Wolverhampton Wanderers': '울버햄프턴 원더러스',
    };

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                setLoading(true);
                const leagueId = leagueIdMap[leagueName];

                if (!leagueId) {
                    setError('알 수 없는 리그입니다.');
                    return;
                }

                const response = await axios.get(
                    `${API_URL}/api/v1/feed/teams?leagueId=${leagueId}`
                );

                // Redis에서 받은 JSON 문자열을 파싱
                const teamsData = typeof response.data === 'string'
                    ? JSON.parse(response.data)
                    : response.data;

                setTeams(teamsData);
                setError(null);
            } catch (err) {
                console.error('팀 목록 로딩 실패:', err);
                setError('팀 목록을 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, [leagueName]);

    if (loading) {
        return <div className="loading">팀 목록을 불러오는 중...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="LeagueTeamList">
            {teams.length === 0 ? (
                <div className="no-teams">팀 정보가 없습니다.</div>
            ) : (
                teams.map((teamData, idx) => {
                    // API-Football 응답 구조: { team: { id, name, logo, ... } }
                    const team = teamData.team;
                    const teamName = team.name;
                    const teamLogo = team.logo;

                    return (
                        <div className="TeamCard" key={team.id || idx}>
                            {teamLogo && (
                                <img
                                    src={teamLogo}
                                    alt={teamName + ' 로고'}
                                    className="team-logo"
                                />
                            )}
                            <span className="team-name-ko">
                                {teamKoreanNames[teamName] || teamName}
                            </span>
                            <span className="team-name-en">{teamName}</span>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default LeagueTeamList;
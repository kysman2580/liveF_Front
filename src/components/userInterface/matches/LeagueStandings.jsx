import React, { useState, useEffect } from 'react';
import axios from "axios";
import './LeagueStandings.css';
import { getKoreanTeamName } from '../../../utils/teamKoreanNames';

const LeagueStandings = ({ leagueId, variant = 'default' }) => {
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isCompact = variant === 'sidebar';
    const API_URL = URL_CONFIG.API_URL;

    useEffect(() => {
        const fetchStandings = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${API_URL}/api/v1/feed/standings?leagueId=${leagueId}`
                );

                // API 응답 구조: { league: {...}, standings: [[ {rank, team, points...}, ... ]] }
                const data = typeof response.data === 'string'
                    ? JSON.parse(response.data)
                    : response.data;

                // 보통 리그 순위는 standings[0]에 담겨 있음
                if (data && data.standings && data.standings.length > 0) {
                    setStandings(data.standings[0]);
                } else {
                    setStandings([]);
                }
                setError(null);
            } catch (err) {
                console.error('순위표 로딩 실패:', err);
                setError('순위표를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        if (leagueId) {
            fetchStandings();
        }
    }, [leagueId, API_URL]);

    if (loading) {
        return <div className={`standings-loading ${isCompact ? 'compact' : ''}`}>순위표 로딩 중...</div>;
    }

    if (error) {
        return <div className={`standings-error ${isCompact ? 'compact' : ''}`}>오류 발생</div>;
    }

    return (
        <div className={`StandingsContainer ${isCompact ? 'compact' : ''}`}>
            <div className="development-placeholder">
                <div className="placeholder-content">
                    <div className="placeholder-icon">🚧</div>
                    <h3>리그 순위표 개발 예정</h3>
                    <p>현재 API 플랜 준비 중입니다.<br />유료 플랜 전환 후 데이터가 제공될 예정입니다.</p>
                </div>
            </div>
            <table className="StandingsTable" style={{ display: 'none' }}>
                <thead>
                    <tr>
                        <th className="th-rank">#</th>
                        <th className="th-team">팀</th>
                        {!isCompact && (
                            <>
                                <th className="th-played">경기</th>
                                <th className="th-win">승</th>
                                <th className="th-draw">무</th>
                                <th className="th-lose">패</th>
                            </>
                        )}
                        <th className="th-gd">득실</th>
                        <th className="th-pts">승점</th>
                    </tr>
                </thead>
                <tbody>
                    {standings.length === 0 ? (
                        <tr>
                            <td colSpan={isCompact ? "4" : "8"} className="no-data">순위 정보 없음</td>
                        </tr>
                    ) : (
                        standings.map((item) => (
                            <tr key={item.team.id} className="standing-row">
                                <td className="td-rank">
                                    <span className={`rank-badge rank-${item.rank}`}>
                                        {item.rank}
                                    </span>
                                </td>
                                <td className="td-team">
                                    <div className="team-info">
                                        <img src={item.team.logo} alt={item.team.name} className="standings-logo" />
                                        <div className="team-names">
                                            <span className="team-name-ko">{getKoreanTeamName(item.team.name)}</span>
                                            {!isCompact && <span className="team-name-en">{item.team.name}</span>}
                                        </div>
                                    </div>
                                </td>
                                {!isCompact && (
                                    <>
                                        <td className="td-played">{item.all.played}</td>
                                        <td className="td-win">{item.all.win}</td>
                                        <td className="td-draw">{item.all.draw}</td>
                                        <td className="td-lose">{item.all.lose}</td>
                                    </>
                                )}
                                <td className="td-gd">{item.goalsDiff > 0 ? `+${item.goalsDiff}` : item.goalsDiff}</td>
                                <td className="td-pts"><strong>{item.points}</strong></td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LeagueStandings;

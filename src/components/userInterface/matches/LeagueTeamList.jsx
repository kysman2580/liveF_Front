import React, { useState, useEffect } from 'react';
import axios from "axios";
import './LeagueTeamList.css';
import { getKoreanTeamName } from '../../../utils/teamKoreanNames';

const LeagueTeamList = ({ leagueName }) => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = URL_CONFIG.API_URL;

    const leagueIdMap = {
        'Premier League': 39,
        'La Liga': 140,
        'Ligue 1': 61,
        'Serie A': 135,
        'Bundesliga': 78,
        'Champions League': 2
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
                                {getKoreanTeamName(teamName)}
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
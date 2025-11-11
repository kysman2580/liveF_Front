import React from 'react';
import { teamsByLeague, teams } from '../../../utils/mockData';
import './LeagueTeamList.css';

const LeagueTeamList = ({ leagueName }) => {
    const leagueTeams = teamsByLeague[leagueName] || [];

    // 팀명(대소문자 무관)으로 teams 배열에서 로고 찾기
    const getTeamLogo = (teamName) => {
        const found = teams.find(t => t.name.replace(/\s/g, '').toLowerCase() === teamName.replace(/\s/g, '').toLowerCase());
        return found ? found.logo : null;
    };
    // 한글 발음 매핑
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
    return (
        <div className="LeagueTeamList">
            {leagueTeams.length === 0 ? (
                <div className="no-teams">팀 정보가 없습니다.</div>
            ) : (
                leagueTeams.map((team, idx) => (
                    <div className="TeamCard" key={team + idx}>
                        {getTeamLogo(team) && (
                            <img src={getTeamLogo(team)} alt={team + ' 로고'} className="team-logo" />
                        )}
                        <span className="team-name-ko">{teamKoreanNames[team] || team}</span>
                        <span className="team-name-en">{team}</span>
                    </div>
                ))
            )}
        </div>
    );
};

export default LeagueTeamList;

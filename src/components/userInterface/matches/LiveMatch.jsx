
import LiveTvIcon from '@mui/icons-material/LiveTv';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LiveMatchList from './LiveMatchList';
import LeagueTeamList from './LeagueTeamList';
import './LiveMatch.css';

const LiveMatch = () => {
    return (
        <>
            <div className='main-top'>
                <div className='LeagueNameWrap'>
                    <div className='LeagueNameRow'>
                        <div className='TvIconWrap'>
                            <LiveTvIcon className="LiveTvIcon" fontSize="large" />
                        </div>
                        {/* 오른편에 텍스트 블록 */}
                        <div className='LeagueNameTextBlock'>
                            <h2 className='LeagueName'>Premier League</h2>
                            <div className='explain'>실시간 경기 정보를 확인하세요</div>
                        </div>
                    </div>
                </div>

                <div className='CalendarRow'>
                    <CalendarTodayIcon className='CalendarTodayIcon' />
                    <span className="TodayMatchTitle">오늘의 경기</span>
                </div>
            </div>

            <LiveMatchList />

            <div className='LeagueTeam'>
                <div className="LeagueTeamTitle">프리미어리그 팀 리스트</div>
                <LeagueTeamList leagueName="Premier League" />
            </div>
        </>
    );
}

export default LiveMatch;
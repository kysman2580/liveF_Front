import LiveTvIcon from "@mui/icons-material/LiveTv";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LiveMatchList from "./LiveMatchList";
import LeagueTeamList from "./LeagueTeamList";
import "./LiveMatch.css";

const LiveMatch = () => {
  return (
    <>
      <div className="LeagueNameWrap">
        <div className="TvIconWrap">
          <LiveTvIcon className="LiveTvIcon" fontSize="large" />
        </div>

        <div>
          <h2 className="LeagueName">각 리그명...</h2>
          <h2 className="explain">실기간 경기 정보를 확인하세요</h2>
        </div>
      </div>

      <div className="CalendarWrap">
        <CalendarTodayIcon className="CalendarTodayIcon" />
        <h2 className="TodayMatchTitle">오늘의 경기</h2>
      </div>
      <LiveMatchList />

      <div className="LeagueTeam">
        <div className="LeagueTeamTitle">프리미어리그 팀 리스트</div>
        <LeagueTeamList leagueName="Premier League" />
      </div>
    </>
  );
};

export default LiveMatch;

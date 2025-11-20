import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LiveMatchList from "./LiveMatchList";
import LeagueTeamList from "./LeagueTeamList";
import "./LiveMatch.css";
import { useLocation } from "react-router-dom";

const LEAGUE_MAP = {
  39: { displayName: "Premier League", listName: "Premier League" },
  140: { displayName: "La Liga", listName: "La Liga" },
  78: { displayName: "Bundesliga", listName: "Bundesliga" },
  135: { displayName: "Serie A", listName: "Serie A" },
  61: { displayName: "Ligue 1", listName: "Ligue 1" },
  10: { displayName: "친선 경기", listName: "FRIENDLIES" },
};

const LiveMatch = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const leagueIdParam = params.get("leagueId");
  const leagueId = leagueIdParam ? Number(leagueIdParam) : 39; // 기본 39
  const leagueInfo = LEAGUE_MAP[leagueId] || LEAGUE_MAP[39];

  return (
    <>
      <div className="LeagueNameWrap">
        <div>
          <h2 className="LeagueName" style={{ color: "black" }}>
            {leagueInfo.displayName}
          </h2>
          <h2 className="explain">실시간 경기 정보를 확인하세요</h2>
        </div>
      </div>

      <LiveMatchList />

      <div className="LeagueTeam">
        <div className="LeagueTeamTitle">
          {leagueInfo.displayName} 팀 리스트
        </div>
        <LeagueTeamList leagueName={leagueInfo.listName} />
      </div>
    </>
  );
};

export default LiveMatch;

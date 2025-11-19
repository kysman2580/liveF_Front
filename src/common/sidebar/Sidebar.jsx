import React from "react";
import {
  CSidebar,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
  CNavGroup,
  CNavTitle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPuzzle, cilCalendar } from "@coreui/icons";
import { Image, Item } from "./Sidebar.styles";
import { useNavigate, useLocation } from "react-router-dom";

const LEAGUE_IDS = {
  PL: 39,
  LALIGA: 140,
  BUNDESLIGA: 78,
  SERIEA: 135,
  LIGUE1: 61,
  FRIENDLIES: 10, // 친선 경기
};

const Sidebar = () => {
  const navi = useNavigate();
  const location = useLocation();

  // 현재 URL 쿼리에서 leagueId 읽기
  const params = new URLSearchParams(location.search);
  const selectedLeagueId = params.get('leagueId') || null;

  const navigateToLeague = (id) => {
    if (id === 'all') {
      navi('/'); // 모든 경기 보기
    } else {
      navi(`/?leagueId=${id}`);
    }
  }

  const isActive = (id) => {
    if (id === 'all') {
      return selectedLeagueId === null;
    }
    return selectedLeagueId === String(id);
  };

  return (
    <CSidebar position="static" className="border-end">
      <CSidebarNav>
        <CNavTitle>주요 리그</CNavTitle>

        <Item className={isActive(LEAGUE_IDS.PL) ? 'active' : ''} onClick={() => navigateToLeague(LEAGUE_IDS.PL)}>
          <Image src="/league icons/PL.png" alt="" />
          Premier League
        </Item>
        <Item className={isActive(LEAGUE_IDS.LALIGA) ? 'active' : ''} onClick={() => navigateToLeague(LEAGUE_IDS.LALIGA)}>
          <Image src="/league icons/laliga.png" alt="" /> La Liga
        </Item>
        <Item className={isActive(LEAGUE_IDS.BUNDESLIGA) ? 'active' : ''} onClick={() => navigateToLeague(LEAGUE_IDS.BUNDESLIGA)}>
          <Image src="/league icons/bundesliga.png" alt="" /> Bundesliga
        </Item>
        <Item className={isActive(LEAGUE_IDS.SERIEA) ? 'active' : ''} onClick={() => navigateToLeague(LEAGUE_IDS.SERIEA)}>
          <Image src="/league icons/serie A.png" alt="" /> Serie A
        </Item>
        <Item className={isActive(LEAGUE_IDS.LIGUE1) ? 'active' : ''} onClick={() => navigateToLeague(LEAGUE_IDS.LIGUE1)}>
          <Image src="/league icons/league 1.png" alt="" /> Ligue 1
        </Item>

        <Item className={isActive(LEAGUE_IDS.FRIENDLIES) ? 'active' : ''} onClick={() => navigateToLeague(LEAGUE_IDS.FRIENDLIES)}>
          <CIcon customClassName="nav-icon" icon={cilCalendar} style={{ marginRight: '8px' }} />
          친선 경기
        </Item>

        <CNavGroup
          toggler={
            <>
              <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
            </>
          }
        >
          <Item onClick={() => navi("/")}>
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>{" "}
            Nav dropdown item
          </Item>
          <Item onClick={() => navi("/")}>
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>{" "}
            Nav dropdown item
          </Item>
        </CNavGroup>
        <CNavTitle>My Team</CNavTitle>
        <Item onClick={() => navi("/")}>
          <Image src="/league icons/serie A.png" alt="" /> Serie A
        </Item>
      </CSidebarNav>
      <CSidebarHeader className="border-top">
        <CSidebarToggler />
      </CSidebarHeader>
    </CSidebar>
  );
};
export default Sidebar;
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
import { cilPuzzle } from "@coreui/icons";
import { Image, Item } from "./Sidebar.styles";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navi = useNavigate();
  return (
    <CSidebar position="static" className="border-end">
      <CSidebarNav>
        <CNavTitle>Nav Title</CNavTitle>
        <Item onClick={() => navi("/")}>
          <Image src="/league icons/PL.png" alt="" />
          Premier League
        </Item>
        <Item onClick={() => navi("/LaLiga")}>
          <Image src="/league icons/laliga.png" alt="" /> La Liga
        </Item>
        <Item onClick={() => navi("/Bundesliga")}>
          <Image src="/league icons/bundesliga.png" alt="" /> Bundesliga
        </Item>
        <Item onClick={() => navi("/SerieA")}>
          <Image src="/league icons/serie A.png" alt="" /> Serie A
        </Item>
        <Item onClick={() => navi("/Ligue1")}>
          <Image src="/league icons/league 1.png" alt="" /> Ligue 1
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

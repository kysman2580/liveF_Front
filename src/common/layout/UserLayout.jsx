import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import LiveChatBox from "../../components/userInterface/matches/LiveChatBox";

export default function UserLayout() {
  return (
    <>
      <div className="app-shell" style={{ minHeight: "100vh" }}>
        <Header />

        <div className="layout-grid">
          <div className="left-col">
            <Sidebar />
          </div>

          <main className="app-main">
            <Outlet />
          </main>

          <aside className="right-col">
            {/* Live chat panel on the right column. leagueId read from URL query */}
            <LiveChatBox leagueId={getLeagueIdFromLocation()} />
          </aside>
        </div>
      </div>
    </>
  );
}

function getLeagueIdFromLocation() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("leagueId");
    return id ? Number(id) : 39;
  } catch (e) {
    return 39;
  }
}

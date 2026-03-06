import { Outlet, useLocation } from "react-router-dom"; // 💡 useLocation 추가
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import LiveChatBox from "../../components/userInterface/matches/LiveChatBox";

// 💡 URL에서 leagueId를 가져오는 로직을 UserLayout 내부로 이동
const getLeagueIdFromLocation = (search) => {
  const params = new URLSearchParams(search);
  const id = params.get("leagueId");
  // URL에 leagueId가 없으면 기본값 39 사용
  return id ? Number(id) : 39;
};

export default function UserLayout() {
  // ✅ useLocation Hook을 사용하여 URL 쿼리 파라미터 변경 감지
  const location = useLocation();

  // location.search가 변경될 때마다 이 값이 새로 계산됩니다.
  const currentLeagueId = getLeagueIdFromLocation(location.search);

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

          {/* 채팅창은 플로팅 타입이므로 그리드 외부 혹은 독립적으로 배치 */}
          <LiveChatBox leagueId={currentLeagueId} />
        </div>
      </div>
    </>
  );
}
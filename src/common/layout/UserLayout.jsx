import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

export default function UserLayout() {
  return (
    <>
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* 상단 헤더 전체폭 */}
        <Header />

        {/* 헤더 아래에 사이드바 + 본문 나란히 */}
        <div style={{ flex: 1, display: "flex" }}>
          <Sidebar />
          <main
            style={{
              flex: 1,
              padding: "1rem",
              maxWidth: "1200px",
              margin: "0 auto",
              width: "100%",
              boxSizing: "border-box"
            }}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

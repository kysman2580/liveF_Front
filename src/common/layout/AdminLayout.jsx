import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet /> {/* 여기서 각 페이지 컴포넌트가 렌더링됨 */}
    </>
  );
}

import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

export default function AdminLayout() {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet /> {/* 여기서 각 페이지 컴포넌트가 렌더링됨 */}
    </>
  );
}

import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./common/layout/UserLayout";
import AdminLayout from "./common/layout/AdminLayout";
import UserMain from "./components/userInterface/main/UserMain";
import MyPage from "./components/userInterface/member/myPage";
import LogIn from "./components/userInterface/member/LogIn";
import CommunityDetail from "./components/userInterface/community/CommunityDetail";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<UserMain />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/community/:id" element={<UserMain />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}></Route>
      </Routes>
    </>
  );
}

export default App;

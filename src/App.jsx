import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./common/layout/UserLayout";
import AdminLayout from "./common/layout/AdminLayout";
import UserMain from "./components/userInterface/main/UserMain";
import MyPage from "./components/userInterface/member/myPage";
import TeamDetails from "./components/userInterface/teams/TeamDetails";
import { AuthProvider } from "./provider/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<UserLayout />}>
            <Route path="/" element={<UserMain />} />
            <Route path="/MyPage" element={<MyPage />} />
            <Route path="/community" element={<UserMain />} />
            <Route path="/community/:id" element={<UserMain />} />
            <Route path="/teamDetails" element={<TeamDetails />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}></Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;

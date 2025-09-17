import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./common/layout/UserLayout";
import AdminLayout from "./common/layout/AdminLayout";
import UserMain from "./components/userInterface/main/UserMain";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<UserMain />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}></Route>
      </Routes>
    </>
  );
}

export default App;

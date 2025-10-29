import { createContext, useContext, useState, useEffect, use } from "react";
import axios from "../api/AxiosInterceptor";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navi = useNavigate();
  const [auth, setAuth] = useState({
    memberInfo: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    axios
      .post("/api/auth/refresh", { withCredentials: true })
      .then((res) => {
        console.log(res);
        const memberInfo = res.data.data.memberInfo;
        login(memberInfo);
      })
      .catch(() => {
        // refresh 실패 → 비로그인 상태로
        setAuth({
          memberInfo: null,
          isAuthenticated: false,
        });
      });
  }, []);

  const login = (memberInfo) => {
    setAuth({
      memberInfo: memberInfo,
      isAuthenticated: true,
    });
    if (memberInfo !== null) {
      sessionStorage.setItem("memberInfo", JSON.stringify(memberInfo));
    }
    sessionStorage.setItem("isAuthenticated", true);
  };

  const logout = () => {
    axios
      .delete(`http://localhost:8080/api/auth/logout`, {
        withCredentials: true,
      })
      .then(() => {
        setAuth({
          memberInfo: null,
          isAuthenticated: false,
        });
        alert("로그아웃 되었습니다.");
      })
      .catch((err) => {
        alert(err);
      });
    sessionStorage.clear();
    setAuth({
      memberInfo: null,
      isAuthenticated: false,
    });
    sessionStorage.removeItem("memberInfo");
    sessionStorage.removeItem("isAuthenticated");
    navi("/");
  };

  const deleteAccount = () => {
    axios
      .delete(`http://localhost:8080/api/member/delete`, {
        withCredentials: true,
      })
      .finally(() => {
        setAuth({
          memberInfo: null,
          isAuthenticated: false,
        });
        alert("회원 탈퇴가 완료 되었습니다.");
        navi("/");
      });
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState, useEffect, use } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navi = useNavigate();
  const [auth, setAuth] = useState({
    memberInfo: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    if (isAuthenticated && loginInfo !== null) {
      setAuth({
        memberInfo: loginInfo,
        isAuthenticated: true,
      });
    } else {
      setAuth({
        memberInfo: loginInfo,
        isAuthenticated: true,
      });
    }
  }, []);

  const login = (memberInfo) => {
    setAuth({
      memberInfo: memberInfo,
      isAuthenticated: true,
    });
    if (loginInfo !== null) {
      sessionStorage.setItem("loginInfo", JSON.stringify(loginInfo));
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
      loginInfo: null,
      isAuthenticated: false,
    });
    sessionStorage.removeItem("loginInfo");
    sessionStorage.removeItem("isAuthenticated");
    navi("/");
  };

  // const cancel = () => {
  //   axios
  //     .post(`${apiUrl}/api/delete`, {}, { withCredentials: true })
  //     .finally(() => {
  //       setAuth({
  //         user: {
  //           memberNo: null,
  //           email: null,
  //           memberName: null,
  //           isAuthenticated: false,
  //         },
  //       });
  //       alert("회원 탈퇴가 완료 되었습니다.");
  //       window.location.href = "/";
  //     });
  // };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

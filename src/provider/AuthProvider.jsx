import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: {
      memberNo: null,
      email: null,
      memberPw: null,
      memberName: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false, // 기존 : isLoggedIn: true
    },
  });

  useEffect(() => {
    const memberNo = localStorage.getItem("memberNo");
    const email = localStorage.getItem("email");
    const memberName = localStorage.getItem("memberName");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (memberNo && email && memberName && accessToken && refreshToken) {
      setAuth({
        user: {
          memberNo,
          email,
          memberName,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        },
      });
    }
  }, []);

  const login = (memberNo, email, memberName, accessToken, refreshToken) => {
    setAuth({
      user: {
        memberNo,
        email,
        memberName,
        accessToken,
        refreshToken,
        isAuthenticated: true,
      },
    });
    localStorage.setItem("memberNo", memberNo);
    localStorage.setItem("email", email);
    localStorage.setItem("memberName", memberName);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const logout = () => {
    setAuth({
      user: {
        email: null,
        memberName: null,
        memberPw: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      },
    });
    localStorage.removeItem("memberNo");
    localStorage.removeItem("email");
    localStorage.removeItem("memberName");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("로그아웃 되었습니다.");
    window.location.href = "/";
  };

  const cancel = () => {
    setAuth({
      user: {
        email: null,
        memberName: null,
        memberPw: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      },
    });
    localStorage.removeItem("email");
    localStorage.removeItem("memberNo");
    localStorage.removeItem("memberName");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("회원 탈퇴가 완료 되었습니다.");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, cancel }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

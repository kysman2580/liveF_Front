import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: {
      memberNo: null,
      email: null,
      memberName: null,
      isAuthenticated: false,
    },
  });

  const apiUrl = window.ENV?.API_URL || "http://localhost:2580";

  useEffect(() => {
    axios
      .get(`${apiUrl}/auth/user`, { withCredentials: true })
      .then((res) => {
        console.log("Auth user response:", res.data);
        const { memberNo, email, nickname, role } = res.data;
        if (memberNo && email && nickname && role) {
          setAuth({
            user: {
              memberNo,
              email,
              memberName: nickname,
              isAuthenticated: true,
            },
          });
        }
      })
      .catch((e) => {
        console.error("Auth user fetch error:", e);
        setAuth({
          user: {
            memberNo: null,
            email: null,
            memberName: null,
            isAuthenticated: false,
          },
        });
      });
  }, [apiUrl]);

  const login = (email, nickname, memberNo) => {
    setAuth({
      user: {
        email,
        memberName: nickname,
        memberNo,
        isAuthenticated: true,
      },
    });
  };

  const logout = () => {
    axios
      .post(`${apiUrl}/auth/logout`, {}, { withCredentials: true })
      .finally(() => {
        setAuth({
          user: {
            memberNo: null,
            email: null,
            memberName: null,
            isAuthenticated: false,
          },
        });
        alert("로그아웃 되었습니다.");
        window.location.href = "/";
      });
  };

  const cancel = () => {
    axios
      .post(`${apiUrl}/api/delete`, {}, { withCredentials: true })
      .finally(() => {
        setAuth({
          user: {
            memberNo: null,
            email: null,
            memberName: null,
            isAuthenticated: false,
          },
        });
        alert("회원 탈퇴가 완료 되었습니다.");
        window.location.href = "/";
      });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, cancel }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

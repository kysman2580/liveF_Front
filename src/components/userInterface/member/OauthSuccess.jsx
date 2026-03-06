import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../provider/AuthProvider";
import axios from "../../../api/AxiosInterceptor";

const OauthSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // 쿠키가 브라우저에 저장될 시간 확보
    const timer = setTimeout(() => {
      axios
        .get("/api/member/myInfo", { withCredentials: true })
        .then((res) => {
          console.log("카카오 로그인 사용자:", res.data);
          login(res.data.data.member);
          navigate("/");
        })
        .catch((err) => {
          console.error("로그인 정보 확인 실패:", err);
          navigate("/login");
        });
    }, 500); // 0.5초 지연

    return () => clearTimeout(timer);
  }, []);

  return;
};

export default OauthSuccess;
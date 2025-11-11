import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../provider/AuthProvider";

const OauthSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/member/myInfo", { withCredentials: true })
      .then((res) => {
        console.log("카카오 로그인 사용자:", res.data);
        login(res.data.data.member); // 전역 상태에 로그인 정보 저장
        navigate("/"); // 메인으로 이동
      })
      .catch((err) => {
        console.error("로그인 정보 확인 실패:", err);
        navigate("/login");
      });
  }, []);

  return <div>로그인 중입니다... 잠시만 기다려주세요 😊</div>;
};
export default OauthSuccess;
SVGAnimateElement;

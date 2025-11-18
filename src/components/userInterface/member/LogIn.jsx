import {
  Actions,
  Field,
  HelperLink,
  Input,
  Label,
  ModalContent,
  ModalHeader,
  ModalLabel,
  ModalWrapper,
  PrimaryBtn,
  Row,
  SecondaryBtn,
} from "./LogIn.styles";
import axios from "../../../api/AxiosInterceptor";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../provider/AuthProvider";

const LogIn = ({ setOpenLogInModal }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navi = useNavigate();
  const { login } = useAuth();

  const loginHandler = () => {
    axios
      .post(
        "http://localhost:8080/api/auth/login",
        {
          memberId: id,
          memberPw: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        setOpenLogInModal(false);
        alert("로그인 되었습니다.");
        navi("/");
        login(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      });
  };

  const kakaoLoginHandler = () => {
    axios
      .get("http://localhost:8080/api/auth/kakao/url")
      .then((res) => {
        console.log(res.data.data);
        const kakaoUrl = res.data.data.loginUrl;
        window.location.href = kakaoUrl; // 카카오 로그인 페이지로 이동
      })
      .catch((err) => {
        console.error("카카오 로그인 URL 요청 실패:", err);
      });
  };

  return (
    <ModalWrapper>
      <ModalLabel>
        <ModalHeader>로그인</ModalHeader>

        <ModalContent>
          {/* 일반 로그인 */}
          <Field>
            <Label htmlFor="id">아이디</Label>
            <Input
              id="id"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디 입력"
              required
            />
          </Field>

          <Field>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </Field>

          <Row>
            <HelperLink
              onClick={() => {
                setOpenLogInModal(false);
                navi("/changePassword");
              }}
            >
              비밀번호 찾기
            </HelperLink>
          </Row>

          <Actions>
            <PrimaryBtn type="button" onClick={loginHandler}>
              로그인
            </PrimaryBtn>
            <SecondaryBtn
              type="button"
              onClick={() => setOpenLogInModal(false)}
            >
              취소
            </SecondaryBtn>
          </Actions>

          {/* ✅ 카카오 로그인 버튼 추가 */}
          <Row style={{ justifyContent: "center", marginTop: 20 }}>
            <button
              onClick={kakaoLoginHandler}
              style={{
                backgroundColor: "#FEE500",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <img
                src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_large_wide.png"
                alt="카카오 로그인"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </button>
          </Row>
        </ModalContent>
      </ModalLabel>
    </ModalWrapper>
  );
};

export default LogIn;

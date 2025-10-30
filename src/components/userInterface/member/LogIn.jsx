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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../provider/AuthProvider";

const LogIn = ({ setOpenLogInModal }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navi = useNavigate();
  const { login } = useAuth();

  console.log(id, password);

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
      });
  };

  return (
    <>
      <ModalWrapper>
        <ModalLabel>
          <ModalHeader>로그인</ModalHeader>

          <ModalContent>
            <Field>
              <Label htmlFor="id">로그인</Label>
              <Input
                id="id"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="youㄴㅇㄹ"
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
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="checkbox" />
                <span>로그인 상태 유지</span>
              </label>
              <HelperLink href="#">비밀번호 찾기</HelperLink>
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

            <Row style={{ justifyContent: "center", gap: 12, marginTop: 12 }}>
              <span aria-hidden>·</span>
              <HelperLink href="#">Kakao로 계속하기</HelperLink>
            </Row>
          </ModalContent>
        </ModalLabel>
      </ModalWrapper>
    </>
  );
};

export default LogIn;

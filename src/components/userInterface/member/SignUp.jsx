import {
  Actions,
  CloseBtn,
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
} from "./SignUp.styles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { use, useState } from "react";
import axios from "../../../api/AxiosInterceptor";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setOpenSignUpModal }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [nickname, setNickname] = useState("");
  const navi = useNavigate();

  const signUpHandler = () => {
    axios
      .post(
        "/api/member/sign-up",
        {
          memberName: name,
          memberNickname: nickname,
          memberId: id,
          memberPw: password,
          memberPhone: phone,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        setOpenSignUpModal(false);
        alert("회원가입 되었습니다.");
        navi("/");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert(error.response.data.message);
      });
  };

  return (
    <>
      <ModalWrapper>
        <CloseBtn onClick={() => setOpenSignUpModal(false)}>
          <CloseRoundedIcon style={{ fontSize: "28px" }} />
        </CloseBtn>

        <ModalLabel>
          <ModalHeader>회원가입</ModalHeader>

          <ModalContent>
            <Field>
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                required
              />
            </Field>

            <Field>
              <Label htmlFor="nickname">닉네입</Label>
              <Input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임"
                required
              />
            </Field>

            <Field>
              <Label htmlFor="id">아이디</Label>
              <Input
                id="id"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="youasd"
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
                placeholder="8자 이상, 영문/숫자 포함"
                required
              />
            </Field>

            <Field>
              <Label htmlFor="confirm">비밀번호 확인</Label>
              <Input
                id="confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호를 다시 입력"
                required
              />
            </Field>

            <Field>
              <Label htmlFor="phone">휴대전화 (선택)</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-1234-5678"
                inputMode="tel"
              />
            </Field>

            <Row>
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input id="terms" type="checkbox" required />
                <span>이용약관 및 개인정보 처리방침에 동의합니다</span>
              </label>
              <HelperLink href="#">약관 보기</HelperLink>
            </Row>

            <Actions>
              <PrimaryBtn type="button" onClick={signUpHandler}>
                회원가입
              </PrimaryBtn>
              <SecondaryBtn
                type="button"
                onClick={() => setOpenSignUpModal(false)}
              >
                취소
              </SecondaryBtn>
            </Actions>

            <Row style={{ justifyContent: "center", gap: 8, marginTop: 12 }}>
              <span>이미 계정이 있나요?</span>
              <HelperLink href="/login">로그인</HelperLink>
            </Row>
          </ModalContent>
        </ModalLabel>
      </ModalWrapper>
    </>
  );
};

export default SignUp;

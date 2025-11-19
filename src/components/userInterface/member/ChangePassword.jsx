import React, { useState } from "react";
import axios from "../../../api/AxiosInterceptor";
import {
  Container,
  Logo,
  SubText,
  Form,
  Input,
  Button,
  LinkBox,
  FindLink,
  Footer,
  FooterText,
} from "./ChangePassword.styles";

const FindPassword = () => {
  const [memberId, setMemberId] = useState("");
  const [isMemberValid, setIsMemberValid] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  // 아이디 확인 요청
  const handleCheckId = () => {
    if (!memberId.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }

    axios
      .get("http://localhost:8080/api/member/check-id", {
        params: { memberId },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          alert(res.data.message);
          setIsMemberValid(true);
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
        setIsMemberValid(false);
      });
  };

  // 비밀번호 변경 요청
  const handleChangePassword = (e) => {
    e.preventDefault();

    if (!memberId.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (!isMemberValid) {
      alert("아이디 확인을 먼저 해주세요.");
      return;
    }
    if (!newPw.trim() || !confirmPw.trim()) {
      alert("새 비밀번호를 입력해주세요.");
      return;
    }
    if (newPw !== confirmPw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    axios
      .post("http://localhost:8080/api/member/change-password", {
        memberId: memberId,
        memberPw: newPw,
      })
      .then(() => {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        window.location.href = "/";
      })
      .catch(() => {
        alert("비밀번호 변경 중 오류가 발생했습니다.");
      });
  };

  return (
    <Container>
      <Logo>LiveF</Logo>
      <SubText>비밀번호를 찾고자 하는 아이디를 입력해주세요.</SubText>

      {/*  아이디 확인 폼 */}
      <Form onSubmit={(e) => e.preventDefault()}>
        <div style={{ display: "flex", gap: "8px" }}>
          <Input
            type="text"
            placeholder="LiveF 아이디"
            value={memberId}
            onChange={(e) => {
              setMemberId(e.target.value);
              setIsMemberValid(false); // 아이디 바뀌면 다시 확인 필요
            }}
          />
          <Button
            type="button"
            style={{ width: "120px" }}
            onClick={handleCheckId}
          >
            아이디 확인
          </Button>
        </div>
      </Form>

      <Form onSubmit={handleChangePassword}>
        <Input
          type="password"
          placeholder="새 비밀번호"
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
        />
        <Button type="submit">비밀번호 변경</Button>
      </Form>

      {/* <LinkBox>
        <span>아이디가 기억나지 않는다면? </span>
        <FindLink href="/find-id">아이디 찾기</FindLink>
      </LinkBox> */}

      <Footer>
        <FooterText>LiveF | 회원정보 고객센터</FooterText>
      </Footer>
    </Container>
  );
};

export default FindPassword;

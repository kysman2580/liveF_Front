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

const SignUp = ({ setOpenSignUpModal }) => {
  return (
    <>
      <ModalWrapper>
        <CloseBtn onClick={() => setOpenSignUpModal(false)}>
          <CloseRoundedIcon style={{ fontSize: "28px" }} />
        </CloseBtn>

        <ModalLabel>
          <ModalHeader>회원가입</ModalHeader>

          <ModalContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: 회원가입 요청 로직 연결
              }}
            >
              <Field>
                <Label htmlFor="name">이름</Label>
                <Input id="name" type="text" placeholder="홍길동" required />
              </Field>

              <Field>
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="8자 이상, 영문/숫자 포함"
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="confirm">비밀번호 확인</Label>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="비밀번호를 다시 입력"
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="phone">휴대전화 (선택)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="010-1234-5678"
                  inputMode="tel"
                />
              </Field>

              <Row>
                <label
                  style={{ display: "flex", gap: 8, alignItems: "center" }}
                >
                  <input id="terms" type="checkbox" required />
                  <span>이용약관 및 개인정보 처리방침에 동의합니다</span>
                </label>
                <HelperLink href="#">약관 보기</HelperLink>
              </Row>

              <Actions>
                <PrimaryBtn type="submit">회원가입</PrimaryBtn>
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
            </form>
          </ModalContent>
        </ModalLabel>
      </ModalWrapper>
    </>
  );
};

export default SignUp;

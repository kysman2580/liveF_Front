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

const LogIn = ({ setOpenLogInModal }) => {
  return (
    <>
      <ModalWrapper>
        <ModalLabel>
          <ModalHeader>로그인</ModalHeader>

          <ModalContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
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
                  placeholder="••••••••"
                  required
                />
              </Field>

              <Row>
                <label
                  style={{ display: "flex", gap: 8, alignItems: "center" }}
                >
                  <input type="checkbox" />
                  <span>로그인 상태 유지</span>
                </label>
                <HelperLink href="#">비밀번호 찾기</HelperLink>
              </Row>

              <Actions>
                <PrimaryBtn type="submit">로그인</PrimaryBtn>
                <SecondaryBtn
                  type="button"
                  onClick={() => setOpenLogInModal(false)}
                >
                  취소
                </SecondaryBtn>
              </Actions>

              <Row style={{ justifyContent: "center", gap: 12, marginTop: 12 }}>
                <HelperLink href="#">Google로 계속하기</HelperLink>
                <span aria-hidden>·</span>
                <HelperLink href="#">Kakao로 계속하기</HelperLink>
              </Row>
            </form>
          </ModalContent>
        </ModalLabel>
      </ModalWrapper>
    </>
  );
};

export default LogIn;

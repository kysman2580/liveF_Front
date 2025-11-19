import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import LogIn from "../../components/userInterface/member/LogIn";
import SignUp from "../../components/userInterface/member/SignUp";
import { useAuth } from "../../provider/AuthProvider";
import { Brand, LogoDot, NavAction, RightControls } from "./Header.styles";

const Header = () => {
  const navi = useNavigate();

  const [openLogInModal, setOpenLogInModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const { auth, logout } = useAuth();

  return (
    <>
      <CHeader position="sticky" className="mb-4 border-bottom">
        <div className="d-flex align-items-center w-100 px-3 justify-content-between">
          <CHeaderBrand className="mb-0" onClick={() => navi("/")}>
            <Brand>
              <LogoDot />
              LiveF
            </Brand>
          </CHeaderBrand>

          <CHeaderNav className="ms-auto">
            {/* 로그인 상태에 따라 토글 */}
            {auth.isAuthenticated ? (
              <RightControls>
                <CNavItem>
                  <NavAction onClick={() => navi("/MyPage")}>MyPage</NavAction>
                </CNavItem>
                <CNavItem>
                  <NavAction onClick={logout}>LogOut</NavAction>
                </CNavItem>
              </RightControls>
            ) : (
              <RightControls>
                <CNavItem>
                  <NavAction onClick={() => setOpenLogInModal(true)}>
                    LogIn
                  </NavAction>
                </CNavItem>
                <CNavItem>
                  <NavAction
                    className="primary"
                    onClick={() => setOpenSignUpModal(true)}
                  >
                    SignUp
                  </NavAction>
                </CNavItem>
              </RightControls>
            )}
          </CHeaderNav>
        </div>
      </CHeader>

      {openLogInModal && <LogIn setOpenLogInModal={setOpenLogInModal} />}
      {openSignUpModal && <SignUp setOpenSignUpModal={setOpenSignUpModal} />}
    </>
  );
};

export default Header;

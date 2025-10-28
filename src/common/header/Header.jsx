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

const Header = () => {
  const [visible, setVisible] = useState(false);
  const navi = useNavigate();
  const [openLogInModal, setOpenLogInModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const { auth, logout } = useAuth();

  return (
    <>
      <CHeader position="sticky" className="mb-4 border-bottom">
        <div className="d-flex align-items-center w-100 px-3 justify-content-between">
          <CHeaderBrand
            className="mb-0"
            onClick={() => navi("/")}
            style={{ cursor: "pointer" }}
          >
            LiveF
          </CHeaderBrand>

          <CHeaderNav className="ms-auto">
            {/* 로그인 상태에 따라 토글 */}
            {auth.isAuthenticated ? (
              <>
                <CNavItem>
                  <CNavLink
                    onClick={() => navi("/MyPage")}
                    style={{ cursor: "pointer" }}
                    title="마이페이지"
                  >
                    MyPage
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    onClick={logout} // 바로 컨텍스트의 logout 호출
                    style={{ cursor: "pointer" }}
                    title="로그아웃"
                  >
                    LogOut
                  </CNavLink>
                </CNavItem>
              </>
            ) : (
              <>
                <CNavItem>
                  <CNavLink
                    onClick={() => setOpenLogInModal(true)}
                    style={{ cursor: "pointer" }}
                  >
                    LogIn
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    onClick={() => setOpenSignUpModal(true)}
                    style={{ cursor: "pointer" }}
                  >
                    SignUp
                  </CNavLink>
                </CNavItem>
              </>
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

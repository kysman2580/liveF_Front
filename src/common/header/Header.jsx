import { use, useState } from "react";
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

const Header = () => {
  const [visible, setVisible] = useState(false);
  const navi = useNavigate();
  const [openLogInModal, setOpenLogInModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);

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
            <CNavItem>
              <CNavLink
                onClick={() => {
                  setOpenLogInModal(true);
                }}
                style={{ cursor: "pointer" }}
              >
                LogIn
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                onClick={() => {
                  setOpenSignUpModal(true);
                }}
                style={{ cursor: "pointer" }}
              >
                SignUp
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                onClick={() => navi("/logout")}
                style={{ cursor: "pointer" }}
              >
                LogOut
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                onClick={() => navi("/MyPage")}
                style={{ cursor: "pointer" }}
              >
                MyPage
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
        </div>
      </CHeader>
      {openLogInModal && <LogIn setOpenLogInModal={setOpenLogInModal} />}
      {openSignUpModal && <SignUp setOpenSignUpModal={setOpenSignUpModal} />}
    </>
  );
};

export default Header;

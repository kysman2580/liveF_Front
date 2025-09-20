import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const navi = useNavigate();

  return (
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
              onClick={() => navi("/features")}
              style={{ cursor: "pointer" }}
            >
              Login
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              onClick={() => navi("/pricing")}
              style={{ cursor: "pointer" }}
            >
              Signin
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              onClick={() => navi("/pricing")}
              style={{ cursor: "pointer" }}
            >
              Logout
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              onClick={() => navi("/pricing")}
              style={{ cursor: "pointer" }}
            >
              Mypage
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
      </div>
    </CHeader>
  );
};

export default Header;

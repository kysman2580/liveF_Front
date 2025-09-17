import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  //const { auth, logout } = useContext(AuthContext);

  // const handleLogoClick = () => navigate("/");
  // const handleAuthClick = () =>
  //   auth.isAuthenticated
  //     ? auth.loginInfo.memberRole !== "ROLE_ADMIN"
  //       ? navigate("/mypage")
  //       : navigate("/admin/users")
  //     : navigate("/login");
  // const handleLogoutClick = () =>
  //   auth.isAuthenticated ? logout() : navigate("/sign-up");
  return (
    <>
      {/* <header className="sticky top-0 z-50 bg-gradient-to-r from-[#e65c00]/90 to-[#ff9a3c]/90 backdrop-blur-sm shadow-lg"> 
        <div className="max-w-6xl mx-auto flex items-center justify-between h-20 px-6">
          

          <nav className="flex items-center space-x-6">
            <button
              onClick={handleAuthClick}
              className={`${linkBase} ${underline} hover:text-[#ffd08c] hover:after:scale-x-100`}
            >
              {auth.isAuthenticated
                ? auth.loginInfo?.memberRole === "ROLE_ADMIN"
                  ? "관리자 페이지"
                  : "마이 페이지"
                : "로그인"}
            </button>
            <button
              onClick={handleLogoutClick}
              className={`${linkBase} ${underline} hover:text-[#ffd08c] hover:after:scale-x-100`}
            >
              {auth.isAuthenticated ? "로그아웃" : "회원가입"}
            </button>
          </nav>
        </div>
      </header>
      */}
    </>
  );
};
export default Header;

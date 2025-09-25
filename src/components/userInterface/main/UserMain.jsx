import LiveMatch from "../matches/LiveMatch";
import Community from "../community/community";
import { useLocation, useNavigate } from "react-router-dom";

const UserMain = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLive, setIsLive] = useState(true);
  const [isCommunityList, setIsCommunityList] = useState(false);

  return (
    <>
      <div className="category" style={{ marginBottom: 32 }}>
        <button
          className={`category-btn${isLive ? " active" : ""}`}
          onClick={() => {
            setIsLive(true);
            setIsCommunityList(false);
          }}
        >
          <span className="category-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="15" rx="3" />
              <path d="M17 2l-5 5-5-5" />
            </svg>
          </span>
          <span className="category-label">라이브</span>
        </button>
        <button
          className={`category-btn${isCommunityList ? " active" : ""}`}
          onClick={() => {
            setIsLive(false);
            setIsCommunityList(true);
          }}
        >
          <span className="category-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="7" width="18" height="13" rx="2" />
              <path d="M8 11h8" />
              <path d="M8 15h6" />
            </svg>
          </span>
          <span className="category-label">커뮤니티</span>
        </button>
      </div>

      {isLive && <LiveMatch />}
      {isCommunityList && <Community />}
    </>
  );
};

export default UserMain;

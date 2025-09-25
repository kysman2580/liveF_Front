import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./community.css";
import { dummyPosts, initialComments } from "./communityData";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const categories = [
  { key: "all", label: "전체" },
  { key: "notice", label: "공지사항" },
  { key: "free", label: "자유게시판" },
  { key: "EPL", label: "EPL" },
  { key: "laliga", label: "라리가" },
  { key: "bundesliga", label: "분데스리가" },
  { key: "seriea", label: "세리에A" },
  { key: "league1", label: "리그1" },
];
const filters = [
  { key: "latest", label: "최신순" },
  { key: "popular", label: "인기순" },
  { key: "views", label: "조회순" },
];
const PAGE_SIZE = 6;

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("latest");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showWrite, setShowWrite] = useState(false);
  const [posts, setPosts] = useState(dummyPosts);
  const [writeForm, setWriteForm] = useState({
    title: "",
    content: "",
    category: selectedCategory,
  });
  const [comments, setComments] = useState(initialComments);
  const [commentInput, setCommentInput] = useState("");
  const [replyInput, setReplyInput] = useState({});
  const navigate = useNavigate();

  const filtered = posts.filter(
    (post) =>
      (selectedCategory === "all" ||
        post.category === selectedCategory ||
        post.tags.includes(
          categories.find((c) => c.key === selectedCategory)?.label
        )) &&
      (search === "" ||
        post.title.includes(search) ||
        post.content.includes(search))
  );
  const sorted = [...filtered].sort((a, b) => {
    if (selectedFilter === "latest") return b.id - a.id;
    if (selectedFilter === "popular") return b.likes - a.likes;
    if (selectedFilter === "views") return b.views - a.views;
    return 0;
  });
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // 글쓰기 폼 제출
  const handleWriteSubmit = (e) => {
    e.preventDefault();
    if (!writeForm.title.trim() || !writeForm.content.trim()) return;
    setPosts([
      {
        id: posts.length + 1,
        category: writeForm.category,
        title: writeForm.title,
        content: writeForm.content,
        user: "나",
        time: "방금 전",
        views: 0,
        likes: 0,
        comments: 0,
        isNotice: false,
        isHot: false,
        tags: [
          writeForm.category === "all"
            ? "자유게시판"
            : categories.find((c) => c.key === writeForm.category)?.label,
        ],
      },
      ...posts,
    ]);
    setShowWrite(false);
    setWriteForm({ title: "", content: "", category: selectedCategory });
  };

  // 댓글 등록
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setComments([
      ...comments,
      {
        id: comments.length + 1,
        user: "나",
        content: commentInput,
        time: "방금 전",
        likes: 0,
        dislikes: 0,
        replies: [],
      },
    ]);
    setCommentInput("");
  };

  // 대댓글 등록
  return (
    <div className="community-wrap">
      <div className="community-header">
        <div className="community-title-row">
          <div className="community-title-icon">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="10" fill="#7B61FF" />
              <path
                d="M11 13.5C11 12.1193 12.1193 11 13.5 11H22.5C23.8807 11 25 12.1193 25 13.5V22.5C25 23.8807 23.8807 25 22.5 25H13.5C12.1193 25 11 23.8807 11 22.5V13.5Z"
                fill="white"
              />
            </svg>
          </div>
          <div>
            <h2 className="community-title">축구 커뮤니티</h2>
            <div className="community-desc">
              축구 팬들과 함께 이야기를 나누세요
            </div>
          </div>
        </div>
        <div className="community-header-actions">
          <input
            className="community-search"
            placeholder="게시글 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="community-filter"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            {filters.map((f) => (
              <option key={f.key} value={f.key}>
                {f.label}
              </option>
            ))}
          </select>
          <button
            className="community-write-btn"
            onClick={() => setShowWrite(true)}
          >
            <span role="img" aria-label="write">
              📝
            </span>{" "}
            글쓰기
          </button>
        </div>
        <div className="community-categories">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`community-category-btn${
                selectedCategory === cat.key ? " selected" : ""
              }`}
              onClick={() => {
                setSelectedCategory(cat.key);
                setPage(1);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      <div className="community-list">
        {paged.map((post) => (
          <div
            key={post.id}
            className={`community-post${post.isNotice ? " notice" : ""}`}
            onClick={() => navigate(`/community/${post.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="community-post-top">
              <div className="community-post-tags">
                {post.isHot && <span className="tag hot">HOT</span>}
                {post.tags &&
                  post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`tag${tag === "공지" ? " notice" : ""}`}
                    >
                      {tag}
                    </span>
                  ))}
              </div>
              <div className="community-post-title">{post.title}</div>
            </div>
            <div className="community-post-content">{post.content}</div>
            <div className="community-post-bottom">
              <span className="community-post-user">{post.user}</span>
              <span className="community-post-time">{post.time}</span>
              <span className="community-post-views">
                <RemoveRedEyeIcon
                  style={{
                    fontSize: "1.18rem",
                    verticalAlign: "middle",
                    marginRight: 4,
                    color: "#64748b",
                  }}
                />{" "}
                {post.views}
              </span>
              <span className="community-post-likes">
                <ThumbUpOffAltIcon
                  style={{
                    fontSize: "1.18rem",
                    verticalAlign: "middle",
                    marginRight: 4,
                    color: "#64748b",
                  }}
                />{" "}
                {post.likes}
              </span>
              <span className="community-post-comments">
                <ChatBubbleOutlineIcon
                  style={{
                    fontSize: "1.18rem",
                    verticalAlign: "middle",
                    marginRight: 4,
                    color: "#64748b",
                  }}
                />{" "}
                {post.comments}
              </span>
              <span className="community-post-arrow">&gt;</span>
            </div>
          </div>
        ))}
        {paged.length === 0 && (
          <div className="community-empty">게시글이 없습니다.</div>
        )}
      </div>
      <div className="community-pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            className={`community-page-btn${num === page ? " selected" : ""}`}
            onClick={() => setPage(num)}
          >
            {num}
          </button>
        ))}
      </div>
      {/* 글쓰기 모달 - 세련된 UI, 카테고리 선택 포함 */}
      {showWrite && (
        <div className="community-modal-bg" onClick={() => setShowWrite(false)}>
          <div className="community-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="community-modal-close"
              onClick={() => setShowWrite(false)}
            >
              &times;
            </button>
            <form className="community-write-form" onSubmit={handleWriteSubmit}>
              <div className="community-write-title">새 글 작성</div>
              <div className="select-input">
                <select
                  className="community-write-input"
                  value={writeForm.category}
                  onChange={(e) =>
                    setWriteForm((f) => ({ ...f, category: e.target.value }))
                  }
                  style={{ marginBottom: 8 }}
                >
                  {categories
                    .filter((c) => c.key !== "all")
                    .map((cat) => (
                      <option key={cat.key} value={cat.key}>
                        {cat.label}
                      </option>
                    ))}
                </select>
                <input
                  className="community-write-input"
                  name="title"
                  placeholder="제목"
                  maxLength={40}
                  required
                  value={writeForm.title}
                  onChange={(e) =>
                    setWriteForm((f) => ({ ...f, title: e.target.value }))
                  }
                />
                <textarea
                  className="community-write-textarea"
                  name="content"
                  placeholder="내용"
                  maxLength={500}
                  required
                  value={writeForm.content}
                  onChange={(e) =>
                    setWriteForm((f) => ({ ...f, content: e.target.value }))
                  }
                />
              </div>
              <div className="community-write-actions">
                <button
                  type="button"
                  className="community-write-cancel"
                  onClick={() => setShowWrite(false)}
                >
                  취소
                </button>
                <button type="submit" className="community-write-submit">
                  등록
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;

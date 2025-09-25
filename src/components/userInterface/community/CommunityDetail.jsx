import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./community.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

// 더미 데이터는 community.jsx에서 import 하거나 props로 전달
import { dummyPosts, initialComments } from "./communityData";

const CommunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = dummyPosts.find((p) => p.id === Number(id));
  const [comments, setComments] = React.useState(initialComments);
  const [commentInput, setCommentInput] = React.useState("");
  const [replyInput, setReplyInput] = React.useState({});
  const [activeReply, setActiveReply] = React.useState(null);
  if (!post)
    return <div className="community-detail">존재하지 않는 게시글입니다.</div>;

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
  const handleReplySubmit = (parentId, e) => {
    e.preventDefault();
    if (!replyInput[parentId]?.trim()) return;
    setComments(
      comments.map((c) =>
        c.id === parentId
          ? {
              ...c,
              replies: [
                ...c.replies,
                {
                  id: Date.now(),
                  user: "나",
                  content: replyInput[parentId],
                  time: "방금 전",
                  likes: 0,
                  dislikes: 0,
                },
              ],
            }
          : c
      )
    );
    setReplyInput({ ...replyInput, [parentId]: "" });
    setActiveReply(null);
  };

  return (
    <div className="community-detail-page">
      <button className="community-back-btn" onClick={() => navigate(-1)}>
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <ArrowBackIcon style={{ fontSize: "1.3rem" }} />
          <span>목록으로</span>
        </span>
      </button>
      <div className="community-detail">
        <div className="detail-wrap">
          <div className="community-detail-tags">
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
          <div
            className="community-detail-title"
            style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 8 }}
          >
            {post.title}
          </div>
          <div className="community-detail-meta">
            <span className="community-detail-user">{post.user}</span>
            <span>{post.time}</span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                minWidth: 60,
                gap: 7,
                justifyContent: "center",
              }}
            >
              <RemoveRedEyeIcon
                style={{
                  fontSize: "1.7rem",
                  color: "#64748b",
                  marginBottom: 2,
                }}
              />
              <span style={{ fontSize: "1.05rem", fontWeight: 500 }}>
                {post.views}
              </span>
            </span>
          </div>
          <div
            className="community-detail-content"
            style={{ margin: "18px 0", fontSize: "15px", color: "#314158" }}
          >
            {post.content}
          </div>
          <div
            className="community-detail-actions"
            style={{ display: "flex", gap: "24px", margin: "18px 0" }}
          >
            <div className="detail-action-card up">
              <ThumbUpOffAltIcon className="action-icon up" />
              <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                {post.likes}
              </span>
              <span
                style={{ fontSize: "0.98rem", color: "#555", marginTop: 2 }}
              >
                추천
              </span>
            </div>
            <div className="detail-action-card down">
              <ThumbDownOffAltIcon className="action-icon down" />
              <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                {post.dislikes || 0}
              </span>
              <span
                style={{ fontSize: "0.98rem", color: "#555", marginTop: 2 }}
              >
                비추천
              </span>
            </div>
          </div>
          <hr
            style={{
              margin: "24px 0 18px 0",
              border: "none",
              borderTop: "1.5px solid #f3f4f6",
            }}
          />
        </div>
        {/* 댓글 작성 카드 */}
        <div className="comment-write-card">
          <div className="comment-write-label">댓글 작성</div>
          <form onSubmit={handleCommentSubmit} className="comment-write-form">
            <input
              className="comment-write-input"
              placeholder="댓글을 입력하세요..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              maxLength={120}
            />
            <button type="submit" className="comment-write-btn">
              댓글 등록
            </button>
          </form>
        </div>
        {/* 댓글 리스트 헤더 */}
        <div className="comment-list-header">댓글 {comments.length}개</div>
        <div className="comment-list">
          {comments.map((c) => (
            <div key={c.id} className="comment-card">
              <div className="comment-card-top">
                <span className="comment-user-icon">{c.user[0]}</span>
                <span className="comment-user-name">{c.user}</span>
                <span className="comment-time">{c.time}</span>
              </div>
              <div className="comment-content">{c.content}</div>
              <div className="comment-actions">
                <button className="comment-action-btn">
                  <i className="fa-regular fa-thumbs-up"></i> 2
                </button>
                <button className="comment-action-btn">
                  <i className="fa-regular fa-thumbs-down"></i> 0
                </button>
                <button
                  className="comment-action-btn"
                  onClick={() => setActiveReply(c.id)}
                >
                  <i className="fa-regular fa-comment"></i> 답글
                </button>
                <button className="comment-action-btn">
                  <i className="fa-solid fa-triangle-exclamation"></i> 신고
                </button>
              </div>
              {/* 대댓글 */}
              {c.replies && c.replies.length > 0 && (
                <div className="comment-reply-list">
                  {c.replies.map((r) => (
                    <div key={r.id} className="comment-reply-card">
                      <span className="comment-user-icon reply">
                        {r.user[0]}
                      </span>
                      <span className="comment-user-name">{r.user}</span>
                      <span className="comment-time">{r.time}</span>
                      <div className="comment-content">{r.content}</div>
                    </div>
                  ))}
                </div>
              )}
              {/* 대댓글 입력 */}
              {activeReply === c.id && (
                <form
                  onSubmit={(e) => handleReplySubmit(c.id, e)}
                  className="comment-reply-form"
                >
                  <input
                    className="comment-write-input"
                    placeholder="답글을 입력하세요..."
                    value={replyInput[c.id] || ""}
                    onChange={(e) =>
                      setReplyInput((f) => ({ ...f, [c.id]: e.target.value }))
                    }
                    maxLength={100}
                  />
                  <button type="submit" className="comment-write-btn">
                    답글 등록
                  </button>
                </form>
              )}
            </div>
          ))}
          {comments.length === 0 && (
            <div className="comment-empty">댓글이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CommunityDetail;

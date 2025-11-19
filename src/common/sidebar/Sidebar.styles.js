// ...existing code...
import styled from "styled-components";

export const Image = styled.img`
  width: 28px;
  height: 28px;
  margin: 6px 12px 6px 6px;
  object-fit: cover;
  border-radius: 4px;
`;

export const Item = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  color: #222;
  margin: 0.125rem 0;

  position: relative;

  &:hover {
    background-color: #f8f7ff; /* 연한 보라빛 계열 */
    transition: background-color 0.18s ease, transform 0.12s ease;
    transform: translateX(2px);
  }

  /* active 상태 스타일 - 왼쪽 인디케이터 추가 */
  &.active {
    background: linear-gradient(
      90deg,
      rgba(123, 97, 255, 0.12),
      rgba(168, 108, 255, 0.06)
    );
    color: #2b2b2b;
    font-weight: 700;
    box-shadow: 0 6px 14px rgba(109, 75, 255, 0.06);
    padding-left: 0.75rem;
  }

  &.active::before {
    content: "";
    position: absolute;
    left: 0;
    top: 6px;
    bottom: 6px;
    width: 4px;
    border-radius: 0 6px 6px 0;
    background: linear-gradient(180deg, #7b61ff 0%, #a86cff 100%);
  }
`;

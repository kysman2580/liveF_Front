// ...existing code...
import styled from "styled-components";

export const Image = styled.img`
  width: 25px;
  height: 25px;
  margin: 10px;
`;

export const Item = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  color: #222;
  margin: 0.125rem 0;

  &:hover {
    background-color: #f0f0f0; /* 배경색을 연한 회색으로 변경 */
    transition: background-color 0.2s ease;
  }

  /* active 상태 스타일 */
  &.active {
    background: linear-gradient(90deg, #7b61ff 0%, #a86cff 100%);
    color: #fff;
    font-weight: 600;
    box-shadow: 0 4px 10px rgba(123,97,255,0.18);
  }


`;
import styled from "styled-components";

export const Brand = styled.div`
  font-weight: 800;
  font-size: 1.25rem;
  color: #6d4bff; /* 보라톤 브랜드 색상 */
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const LogoDot = styled.span`
  width: 10px;
  height: 10px;
  background: linear-gradient(90deg, #7b61ff, #a86cff);
  border-radius: 50%;
  display: inline-block;
`;

export const NavAction = styled.button`
  background: transparent;
  border: 1px solid transparent;
  color: #333;
  padding: 6px 10px;
  border-radius: 6px;
  margin-left: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(109, 75, 255, 0.08);
    color: #6d4bff;
    transform: translateY(-1px);
  }

  &.primary {
    background: linear-gradient(90deg, #7b61ff, #a86cff);
    color: #fff;
    border: none;
  }
`;

export const RightControls = styled.div`
  display: flex;
  align-items: center;
`;

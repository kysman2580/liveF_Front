import styled from "styled-components";

export const Brand = styled.div`
  font-family: "Montserrat", "Noto Sans KR", Arial, sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  color: #0f172a;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const LogoDot = styled.span`
  width: 12px;
  height: 12px;
  background: #22c55e; /* 포인트 색상: 축구장의 상큼한 그린 */
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 12px rgba(34, 197, 94, 0.4);
`;

export const NavAction = styled.button`
  background: transparent;
  border: none;
  color: #64748b;
  padding: 8px 16px;
  border-radius: 12px;
  margin-left: 4px;
  font-family: "Montserrat", "Noto Sans KR", Arial, sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: #f1f5f9;
    color: #0f172a;
  }

  &.primary {
    background: #0f172a;
    color: #fff;
    padding: 8px 20px;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
  }

  &.primary:hover {
    background: #1e293b;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.15);
  }
`;

export const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;


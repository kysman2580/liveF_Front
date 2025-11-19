import styled from "styled-components";

export const Brand = styled.div`
  font-family: "Montserrat", "Noto Sans KR", Arial, sans-serif;
  font-weight: 900;
  font-size: 1.35rem;
  color: var(--primary);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.09em;
`;

export const LogoDot = styled.span`
  width: 10px;
  height: 10px;
  background: var(--primary);
  border-radius: 50%;
  display: inline-block;
`;

export const NavAction = styled.button`
  background: transparent;
  border: 1px solid transparent;
  color: #333;
  padding: 6px 14px;
  border-radius: 7px;
  margin-left: 8px;
  font-family: "Montserrat", "Noto Sans KR", Arial, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: var(--primary-weak);
    color: var(--primary);
    transform: translateY(-1px) scale(1.04);
  }

  &.primary {
    background: var(--primary);
    color: #fff;
    border: none;
    padding: 6px 12px;
    border-radius: 7px;
    font-size: 0.95rem;
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.12);
  }
`;

export const RightControls = styled.div`
  display: flex;
  align-items: center;
`;


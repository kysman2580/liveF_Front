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
  gap: 12px;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: #222;
  margin: 0.125rem 0;
  font-family: "Montserrat", "Noto Sans KR", Arial, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  position: relative;
  transition: background-color 0.18s, transform 0.12s, color 0.18s;

  &:hover {
    background-color: rgba(59, 130, 246, 0.1);
    color: #1976d2;
    transform: translateX(2px) scale(1.04);
  }

  &.active {
    background: linear-gradient(
      90deg,
      rgba(6, 182, 212, 0.1),
      rgba(59, 130, 246, 0.08)
    );
    color: #1976d2;
    font-weight: 800;
    box-shadow: 0 6px 14px rgba(59, 130, 246, 0.09);
    padding-left: 0.75rem;
    letter-spacing: 0.12em;
  }

  /* Ensure active state remains visually consistent even on hover */
  &.active:hover {
    transform: none;
    background: linear-gradient(
      90deg,
      rgba(6, 182, 212, 0.1),
      rgba(59, 130, 246, 0.08)
    );
    color: #1976d2;
    box-shadow: 0 6px 14px rgba(59, 130, 246, 0.09);
  }

  &.active::before {
    content: "";
    position: absolute;
    left: 0;
    top: 6px;
    bottom: 6px;
    width: 4px;
    border-radius: 0 8px 8px 0;
    background: linear-gradient(
      180deg,
      var(--primary-1) 0%,
      var(--primary-2) 100%
    );
  }
`;

export const SidebarContainer = styled.aside`
  width: 220px;
  box-sizing: border-box;
  padding: 12px 8px;
  background: transparent; /* no white/blue box */
  border-right: none;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

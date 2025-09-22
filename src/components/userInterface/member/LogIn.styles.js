import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(17, 24, 39, 0.55);
  z-index: 1100;
`;

export const ModalLabel = styled.div`
  position: relative;
  width: min(92vw, 460px);
  max-height: 85vh;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  font-weight: 700;
  font-size: 18px;
  border-bottom: 1px solid #e5e7eb;
`;

export const ModalContent = styled.div`
  padding: 20px 20px 24px;
  overflow-y: auto;
`;

export const Field = styled.div`
  display: grid;
  gap: 8px;
  margin-bottom: 14px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #374151;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
`;

export const HelperLink = styled.a`
  color: #4f46e5;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
`;

export const PrimaryBtn = styled.button`
  height: 44px;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;

  &:hover {
    filter: brightness(1.05);
  }
  &:active {
    transform: translateY(1px);
  }
`;

export const SecondaryBtn = styled.button`
  height: 44px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: white;
  font-weight: 700;
  cursor: pointer;
  color: #111827;

  &:hover {
    background: #f9fafb;
  }
  &:active {
    transform: translateY(1px);
  }
`;

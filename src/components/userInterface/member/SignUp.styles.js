import styled from "styled-components";

export const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const CloseBtn = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  cursor: pointer;
  color: #6b7280;
  z-index: 1001;
  border-radius: 8px;

  &:hover {
    background: #f3f4f6;
    color: #111827;
  }
`;

export const ModalLabel = styled.div`
  width: min(92vw, 480px);
  max-height: 85vh;
  background-color: white;
  z-index: 1000;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  height: 56px;
  justify-content: center;
  align-items: center;
  width: 100%;
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
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--primary-weak);
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
  color: var(--primary);
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
  background: var(--primary);
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

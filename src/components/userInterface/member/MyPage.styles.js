import styled from "styled-components";

export const Page = styled.div`
  min-height: 60vh;
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 24px;

  @media (min-width: 768px) {
    padding: 32px;
  }
`;

export const Header = styled.header`
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 6px 0;
`;

export const Sub = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`;

export const Stack = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  gap: 24px;
`;

export const Card = styled.section`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 24px;
`;

export const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const CardTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`;

export const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Label = styled.label`
  font-size: 0.875rem;
  color: #374151;
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  padding: 8px 12px;
  font-size: 0.875rem;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.4);
    border-color: #a5b4fc;
  }

  &:disabled {
    background: #f9fafb;
    color: #9ca3af;
  }
`;

export const Btn = styled.button`
  border: none;
  border-radius: 14px;
  padding: 10px 22px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.08);
  transition: box-shadow 0.2s, transform 0.15s, background 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PrimaryBtn = styled(Btn)`
  background: linear-gradient(90deg, #2196f3 0%, #1976d2 100%);
  color: #fff;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.12);

  &:hover:not(:disabled) {
    background: linear-gradient(90deg, #1976d2 0%, #2196f3 100%);
    box-shadow: 0 4px 16px rgba(33, 150, 243, 0.18);
    transform: translateY(-2px) scale(1.04);
  }
`;

export const SecondaryBtn = styled(Btn)`
  background: #fff;
  border: 1px solid #e0e0e0;

  &:hover:not(:disabled) {
    background: #f3f6fa;
    box-shadow: 0 2px 8px rgba(33, 150, 243, 0.07);
  }
`;

export const DangerBtn = styled(Btn)`
  background: linear-gradient(90deg, #f44336 0%, #d32f2f 100%);
  color: #fff;
  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.1);

  &:hover:not(:disabled) {
    background: linear-gradient(90deg, #d32f2f 0%, #f44336 100%);
    box-shadow: 0 4px 16px rgba(244, 67, 54, 0.16);
    transform: translateY(-2px) scale(1.04);
  }
`;

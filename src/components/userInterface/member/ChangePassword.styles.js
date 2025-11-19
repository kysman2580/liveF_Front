import styled from "styled-components";

export const Container = styled.div`
  width: 360px;
  margin: 120px auto;
  text-align: center;
  font-family: "Noto Sans KR", sans-serif;
`;

export const Logo = styled.h1`
  color: #03c75a;
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 10px;
`;

export const SubText = styled.p`
  font-size: 15px;
  color: #222;
  margin-bottom: 30px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  height: 45px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0 12px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #03c75a;
  }
`;

export const Button = styled.button`
  height: 48px;
  background-color: #03c75a;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #02b356;
  }
`;

export const LinkBox = styled.div`
  margin-top: 20px;
  font-size: 13px;
  color: #555;
`;

export const FindLink = styled.a`
  color: #03c75a;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Footer = styled.div`
  margin-top: 60px;
`;

export const FooterText = styled.p`
  font-size: 12px;
  color: #888;
`;

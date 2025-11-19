// TeamDetails.styles.js
import styled, { css } from "styled-components";

export const Hero = styled.header`
  background: ${({ $primary }) => ($primary ? $primary : "#f9fafb")};
  padding: 20px 0 16px;
`;

export const HeroInner = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderLeft = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`;

export const CrestWrap = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  background: #fff;
  display: grid;
  place-items: center;
  overflow: hidden;
`;

export const Crest = styled.img`
  width: 42px;
  height: 42px;
  object-fit: contain;
`;

export const Title = styled.h1`
  font-size: 22px;
  font-weight: 900;
  color: #111827;
  margin: 0 0 4px 0;
`;

export const Sub = styled.div`
  font-size: 12px;
  color: #6b7280;
  font-weight: 700;
`;

export const TagRow = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 6px;
`;

export const Tag = styled.span`
  font-size: 11px;
  font-weight: 800;
  color: #374151;
  padding: 6px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  background: #fff;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 13px;
  border: 1px solid #e5e7eb;
  transition: transform 0.15s ease, background 0.15s ease, color 0.15s ease;

  ${({ $variant }) =>
    $variant === "filled"
      ? css`
          background: #111827;
          color: #fff;
          border-color: #111827;
        `
      : css`
          background: #fff;
          color: #111827;
        `}

  &:hover {
    transform: translateY(-1px);
  }
`;

// ============ 컨테이너 & 섹션 ============
export const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 16px;
`;

export const Section = styled.section`
  margin: 18px 0 8px;
`;

export const SectionHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 900;
  color: #111827;
`;

export const LinkButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #fff;
  font-size: 12px;
  font-weight: 800;
  color: #374151;
`;

// ============ 클럽 정보 ============
export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  padding: 14px;
`;

export const InfoLabel = styled.div`
  font-size: 11px;
  font-weight: 800;
  color: #6b7280;
  margin-bottom: 4px;
`;

export const InfoValue = styled.div`
  font-size: 14px;
  font-weight: 900;
  color: #111827;
`;

// ============ 플레이어 ============
export const PlayerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const PlayerCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #fff;
  overflow: hidden;
`;

export const PlayerTop = styled.div`
  padding: 8px 12px;
  border-bottom: 1px dashed #f0f0f0;
`;

export const Badge = styled.span`
  font-size: 11px;
  font-weight: 900;
  color: #fff;
  background: #111827;
  padding: 6px 8px;
  border-radius: 999px;
`;

export const PlayerBody = styled.div`
  padding: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  object-fit: cover;
`;

export const PlayerName = styled.div`
  font-size: 14px;
  font-weight: 900;
  color: #111827;
`;

export const PlayerStat = styled.div`
  font-size: 12px;
  font-weight: 800;
  color: #6b7280;
`;

// ============ 일정 ============
export const FixtureList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

export const FixtureItem = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr auto auto;
  align-items: center;
  gap: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #fff;
  padding: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 6px;
  }
`;

export const FixtureDate = styled.div`
  font-size: 12px;
  font-weight: 900;
  color: #374151;
`;

// ====== 기존에 있던 export들 ======
export const Page = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #374151;
`;

export const FixtureTeams = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TeamChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  color: #111827;
`;

export const ChipLogo = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 1px solid #ececec;
  background: #fff;
`;

export const Vs = styled.span`
  color: #9ca3af;
  font-weight: 700;
`;

export const FixtureMeta = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

export const CheerButton = styled.button`
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 13px;
  border: 1px solid #eaeaea;
  background: #fff;
  color: #111827;
  transition: all 0.15s ease;

  ${({ $active }) =>
    $active &&
    css`
      background: #111827;
      color: #fff;
      border-color: #111827;
    `}

  &:hover {
    transform: translateY(-1px);
  }
`;

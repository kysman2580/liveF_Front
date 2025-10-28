import React, { useMemo, useState } from "react";
import {
  Bell,
  Plus,
  CalendarDays,
  ChevronRight,
  Heart,
  Trophy,
  Users2,
} from "lucide-react";
import {
  Page,
  Hero,
  HeroInner,
  HeaderLeft,
  CrestWrap,
  Crest,
  Title,
  Sub,
  TagRow,
  Tag,
  HeaderActions,
  ActionButton,
  Container,
  Section,
  SectionHead,
  SectionTitle,
  LinkButton,
  InfoGrid,
  InfoCard,
  InfoLabel,
  InfoValue,
  PlayerGrid,
  PlayerCard,
  PlayerTop,
  Badge,
  PlayerBody,
  Avatar,
  PlayerName,
  PlayerStat,
  FixtureList,
  FixtureItem,
  FixtureDate,
  FixtureTeams,
  TeamChip,
  ChipLogo,
  Vs,
  FixtureMeta,
  CheerButton,
} from "./TeamDetails.styles";
const TeamDetails = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [cheerIds, setCheerIds] = useState(new Set());

  // 더미 데이터
  const team = {
    id: 42,
    krName: "아스널",
    enName: "Arsenal",
    league: "프리미어리그",
    rankText: "2위",
    followers: 124668,
    crest: "https://media.api-sports.io/football/teams/42.png",
    primary: "#D8262C",
    secondary: "#0A0A0A",
    founded: 1886,
    stadium: "에미레이트 스타디움",
    coach: "미켈 아르테타",
  };

  const topPlayers = [
    {
      id: 501,
      badge: "득점",
      name: "가브리엘 제주스",
      stat: "3골",
      avatar:
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 502,
      badge: "도움",
      name: "리카르도 칼라피오리",
      stat: "2도움",
      avatar:
        "https://images.unsplash.com/photo-1543322748-33df6d3afb36?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 503,
      badge: "MVP",
      name: "부카요 사카",
      stat: "평점 7.8",
      avatar:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=400&auto=format&fit=crop",
    },
  ];

  const fixtures = [
    {
      id: 9101,
      date: "09.29 (월) 00:30",
      home: {
        id: 34,
        name: "뉴캐슬",
        logo: "https://media.api-sports.io/football/teams/34.png",
      },
      away: { id: 42, name: "아스널", logo: team.crest },
      comp: "프리미어리그",
    },
    {
      id: 9102,
      date: "10.02 (목) 04:00",
      home: { id: 42, name: "아스널", logo: team.crest },
      away: {
        id: 4979,
        name: "올림피아코스",
        logo: "https://media.api-sports.io/football/teams/4979.png",
      },
      comp: "챔피언스리그",
    },
    {
      id: 9103,
      date: "10.04 (토) 23:00",
      home: { id: 42, name: "아스널", logo: team.crest },
      away: {
        id: 48,
        name: "웨스트햄",
        logo: "https://media.api-sports.io/football/teams/48.png",
      },
      comp: "프리미어리그",
    },
  ];

  const formattedFollowers = useMemo(
    () => new Intl.NumberFormat().format(team.followers),
    [team.followers]
  );

  const toggleCheer = (id) => {
    setCheerIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <Page>
      <Hero $primary={team.primary}>
        <HeroInner>
          <HeaderLeft>
            <CrestWrap>
              <Crest src={team.crest} alt={`${team.krName} 로고`} />
            </CrestWrap>
            <div>
              <Title>{team.krName}</Title>
              <Sub>
                {" "}
                {team.league} · {team.rankText} · {formattedFollowers}명 구독
              </Sub>
              <TagRow>
                <Tag>공식 팬페이지</Tag>
                <Tag>클럽</Tag>
              </TagRow>
            </div>
          </HeaderLeft>
          <HeaderActions>
            <ActionButton $variant="ghost">
              <CalendarDays size={16} /> 내 팀 추가
            </ActionButton>
          </HeaderActions>
        </HeroInner>
      </Hero>

      <Container>
        {/* 핵심 정보 */}
        <Section>
          <SectionTitle>클럽 정보</SectionTitle>
          <InfoGrid>
            <InfoCard>
              <InfoLabel>창단</InfoLabel>
              <InfoValue>{team.founded}</InfoValue>
            </InfoCard>
            <InfoCard>
              <InfoLabel>홈구장</InfoLabel>
              <InfoValue>{team.stadium}</InfoValue>
            </InfoCard>
            <InfoCard>
              <InfoLabel>감독</InfoLabel>
              <InfoValue>{team.coach}</InfoValue>
            </InfoCard>
          </InfoGrid>
        </Section>

        {/* 톱 플레이어 */}
        <Section>
          <SectionHead>
            <SectionTitle>핵심 선수</SectionTitle>
            <LinkButton>
              전체 보기 <ChevronRight size={16} />
            </LinkButton>
          </SectionHead>
          <PlayerGrid>
            {topPlayers.map((p) => (
              <PlayerCard key={p.id}>
                <PlayerTop>
                  <Badge>{p.badge}</Badge>
                </PlayerTop>
                <PlayerBody>
                  <Avatar src={p.avatar} alt={p.name} />
                  <div>
                    <PlayerName>{p.name}</PlayerName>
                    <PlayerStat>{p.stat}</PlayerStat>
                  </div>
                </PlayerBody>
              </PlayerCard>
            ))}
          </PlayerGrid>
        </Section>

        {/* 일정 */}
        <Section>
          <SectionHead>
            <SectionTitle>다가오는 경기</SectionTitle>
            <LinkButton>
              전체 일정 <ChevronRight size={16} />
            </LinkButton>
          </SectionHead>
          <FixtureList>
            {fixtures.map((fx) => {
              const cheered = cheerIds.has(fx.id);
              return (
                <FixtureItem key={fx.id}>
                  <FixtureDate>{fx.date}</FixtureDate>
                  <FixtureTeams>
                    <TeamChip>
                      <ChipLogo src={fx.home.logo} alt={fx.home.name} />
                      <span>{fx.home.name}</span>
                    </TeamChip>
                    <Vs>vs</Vs>
                    <TeamChip>
                      <ChipLogo src={fx.away.logo} alt={fx.away.name} />
                      <span>{fx.away.name}</span>
                    </TeamChip>
                  </FixtureTeams>
                  <FixtureMeta>{fx.comp}</FixtureMeta>
                  <CheerButton
                    $active={cheered}
                    onClick={() => toggleCheer(fx.id)}
                  >
                    <Heart size={16} /> {cheered ? "응원중" : "응원하기"}
                  </CheerButton>
                </FixtureItem>
              );
            })}
          </FixtureList>
        </Section>
      </Container>
    </Page>
  );
};
export default TeamDetails;

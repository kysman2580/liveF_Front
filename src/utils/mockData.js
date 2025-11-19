// 팀명 한글 발음 매핑 (공통 유틸)
export const teamKoreanNames = {
  'Arsenal': '아스널',
  'Aston Villa': '애스턴 빌라',
  'AFC Bournemouth': '본머스',
  'Brentford': '브렌트포드',
  'Brighton & Hove Albion': '브라이튼',
  'Chelsea': '첼시',
  'Crystal Palace': '크리스털 팰리스',
  'Everton': '에버턴',
  'Fulham': '풀럼',
  'Ipswich Town': '입스위치 타운',
  'Leicester City': '레스터 시티',
  'Liverpool': '리버풀',
  'Manchester City': '맨체스터 시티',
  'Manchester United': '맨체스터 유나이티드',
  'Newcastle United': '뉴캐슬 유나이티드',
  'Nottingham Forest': '노팅엄 포레스트',
  'Southampton': '사우샘프턴',
  'Tottenham Hotspur': '토트넘 홋스퍼',
  'West Ham United': '웨스트햄 유나이티드',
  'Wolverhampton Wanderers': '울버햄프턴 원더러스',
};

// 팀명(대소문자 무관)으로 teams 배열에서 로고 찾기 (공통 유틸)
export const getTeamLogo = (teamName) => {
  if (!teamName) return null;
  const found = teams.find(t => t.name.replace(/\s/g, '').toLowerCase() === teamName.replace(/\s/g, '').toLowerCase());
  return found ? found.logo : null;
};
// 프리미어리그 팀명과 로고 매칭을 위해 누락된 팀도 모두 추가
// Mock data for soccer live service
import fulhamLogo from '../imgs/풀럼.png';
import southamptonLogo from '../imgs/사우스햄프턴.png';
import manCityLogo from '../imgs/맨시티.png';
import arsenalLogo from '../imgs/아스널.png';
import chelseaLogo from '../imgs/첼시.png';
import liverpoolLogo from '../imgs/리버플.png';
import manUnitedLogo from '../imgs/맨유.png';
import tottenhamLogo from '../imgs/토트넘.png';
import newcastleLogo from '../imgs/뉴캐슬.png';
import astonVillaLogo from '../imgs/애스턴빌라.png';
import brightonLogo from '../imgs/브라이튼.png';
import brentfordLogo from '../imgs/브랜드포트.png';
import evertonLogo from '../imgs/애버튼.png';
import westhamLogo from '../imgs/웨스트햄튼.png';
import wolvesLogo from '../imgs/울버햄튼.png';
import crystalPalaceLogo from '../imgs/크리스털팰릭스.png';
import leicesterLogo from '../imgs/레스터시티.png';
import bournemouthLogo from '../imgs/본머스.png';
import nottinghamForestLogo from '../imgs/노팅엄.png';
import ipswichTownLogo from '../imgs/입스위치.png';



export const liveMatches = [
  {
    id: 1,
    league: "Premier League",
    homeTeam: "Manchester City",
    awayTeam: "Arsenal",
    homeScore: 2,
    awayScore: 1,
    status: "LIVE",
    time: "67'",
    isLive: true,
    stadium: "Etihad Stadium",
    date: "2024-03-16",
    startTime: "15:30"
  },
  {
    id: 2,
    league: "Premier League",
    homeTeam: "Chelsea",
    awayTeam: "Liverpool",
    homeScore: 1,
    awayScore: 3,
    status: "FT",
    time: "90'",
    isLive: false,
    stadium: "Stamford Bridge",
    date: "2024-03-16",
    startTime: "17:30"
  }
];

// 각 리그별 팀 예시 데이터
export const teamsByLeague = {
  'Premier League': [
  'Manchester City', 'Arsenal', 'Chelsea', 'Liverpool', 'Manchester United',
  'Tottenham Hotspur', 'Newcastle United', 'Aston Villa', 'AFC Bournemouth',
  'Brentford', 'Brighton & Hove Albion', 'Crystal Palace', 'Everton', 'Fulham',
  'Ipswich Town', 'Leicester City', 'Nottingham Forest', 'Southampton',
  'West Ham United', 'Wolverhampton Wanderers'
],
  'La Liga': [
    'Real Madrid', 'Barcelona', 'Atletico Madrid', 'Sevilla', 'Real Sociedad', 'Real Betis', 'Villarreal', 'Valencia'
  ],
  'Bundesliga': [
    'Bayern Munich', 'Borussia Dortmund', 'RB Leipzig', 'Bayer Leverkusen', 'Eintracht Frankfurt', 'Wolfsburg', 'Freiburg', 'Union Berlin'
  ],
  'Serie A': [
    'Juventus', 'AC Milan', 'Inter Milan', 'AS Roma', 'Napoli', 'Lazio', 'Atalanta', 'Fiorentina'
  ]
};
export const teams = [
  { id: 1, name: "ARSENAL", logo: arsenalLogo },
  { id: 2, name: "ASTON VILLA", logo: astonVillaLogo },
  { id: 3, name: "AFC BOURNEMOUTH", logo: bournemouthLogo },
  { id: 4, name: "BRENTFORD", logo: brentfordLogo },
  { id: 5, name: "BRIGHTON & HOVE ALBION", logo: brightonLogo },
  { id: 6, name: "CHELSEA", logo: chelseaLogo },
  { id: 7, name: "CRYSTAL PALACE", logo: crystalPalaceLogo },
  { id: 8, name: "EVERTON", logo: evertonLogo },
  { id: 9, name: "FULHAM", logo: fulhamLogo },
  { id: 10, name: "IPSWICH TOWN", logo: ipswichTownLogo },
  { id: 11, name: "LEICESTER CITY", logo: leicesterLogo },
  { id: 12, name: "LIVERPOOL", logo: liverpoolLogo },
  { id: 13, name: "MANCHESTER CITY", logo: manCityLogo },
  { id: 14, name: "MANCHESTER UNITED", logo: manUnitedLogo },
  { id: 15, name: "NEWCASTLE UNITED", logo: newcastleLogo },
  { id: 16, name: "NOTTINGHAM FOREST", logo: nottinghamForestLogo },
  { id: 17, name: "SOUTHAMPTON", logo: southamptonLogo },
  { id: 18, name: "TOTTENHAM HOTSPUR", logo: tottenhamLogo },
  { id: 19, name: "WEST HAM UNITED", logo: westhamLogo },
  { id: 20, name: "WOLVERHAMPTON WANDERERS", logo: wolvesLogo },
];
// (위 부분은 liveMatches 배열의 일부로 남아야 하며, teams 배열과 중복되면 안 됨)

// Extended match schedule for full calendar view
export const allMatches = [
  {
    id: 1,
    league: "Premier League",
    homeTeam: "Manchester City",
    awayTeam: "Arsenal",
    homeScore: 2,
    awayScore: 1,
    status: "LIVE",
    time: "67'",
    isLive: true,
    stadium: "Etihad Stadium",
    date: "2024-03-16",
    startTime: "15:30"
  },
  {
    id: 2,
    league: "Premier League",
    homeTeam: "Chelsea",
    awayTeam: "Liverpool",
    homeScore: 1,
    awayScore: 3,
    status: "FT",
    time: "90'",
    isLive: false,
    stadium: "Stamford Bridge",
    date: "2024-03-16",
    startTime: "17:30"
  },
  {
    id: 3,
    league: "Premier League",
    homeTeam: "Manchester United",
    awayTeam: "Tottenham Hotspur",
    homeScore: null,
    awayScore: null,
    status: "SCHEDULED",
    time: null,
    isLive: false,
    stadium: "Old Trafford",
    date: "2024-03-17",
    startTime: "16:00"
  },
  {
    id: 4,
    league: "Premier League",
    homeTeam: "Newcastle United",
    awayTeam: "Brighton & Hove Albion",
    homeScore: null,
    awayScore: null,
    status: "SCHEDULED",
    time: null,
    isLive: false,
    stadium: "St. James' Park",
    date: "2024-03-17",
    startTime: "14:00"
  },
  {
    id: 5,
    league: "Premier League",
    homeTeam: "West Ham United",
    awayTeam: "Aston Villa",
    homeScore: 2,
    awayScore: 2,
    status: "FT",
    time: "90'",
    isLive: false,
    stadium: "London Stadium",
    date: "2024-03-15",
    startTime: "20:00"
  },
  {
    id: 6,
    league: "Premier League",
    homeTeam: "Crystal Palace",
    awayTeam: "Everton",
    homeScore: 1,
    awayScore: 0,
    status: "FT",
    time: "90'",
    isLive: false,
    stadium: "Selhurst Park",
    date: "2024-03-15",
    startTime: "15:00"
  },
  {
    id: 7,
    league: "Premier League",
    homeTeam: "Wolverhampton Wanderers",
    awayTeam: "Brentford",
    homeScore: null,
    awayScore: null,
    status: "SCHEDULED",
    time: null,
    isLive: false,
    stadium: "Molineux Stadium",
    date: "2024-03-15",
    startTime: "19:45"
  },

  
];

export const chatMessages = [
  {
    id: 1,
    user: "축구팬123",
    message: "맨시티 골!!! 🔥",
    timestamp: "18:45",
    type: "message"
  },
  {
    id: 2,
    user: "아스날팬",
    message: "아직 끝나지 않았어!",
    timestamp: "18:46", 
    type: "message"
  },
  {
    id: 3,
    user: "중립팬",
    message: "경기 정말 재밌네요",
    timestamp: "18:47",
    type: "message"
  },
  {
    id: 4,
    user: "System",
    message: "67분: 맨체스터 시티 2-1 아스날",
    timestamp: "18:47",
    type: "system"
  }
];

export const leagues = [
  { id: 1, name: "Premier League", active: true },
  { id: 2, name: "La Liga", active: false },
  { id: 3, name: "Serie A", active: false },
  { id: 4, name: "Bundesliga", active: false },
  { id: 5, name: "Ligue 1", active: false }
];
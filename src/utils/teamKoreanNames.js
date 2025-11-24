// teamKoreanNames.js
// 5대 리그 전체 팀 한글 매핑

export const teamKoreanNames = {
    // ==================== 프리미어리그 (39) ====================
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
    'West Ham United': '웨스트햄 유나이티드',
    'Newcastle': '뉴캐슬',
    'Watford': '왓포드',
    'Wolves': '울버햄프턴',
    'Burnley': '번리',
    'Leicester': '레스터시티',
    'Tottenham': '토트넘',
    'West Ham': '웨스트햄',
    'Brighton': '브라이튼',
    'Leeds': '리즈',
    'Norwich': '노리치',

    // ==================== 라리가 (140) ====================
    'Real Madrid': '레알 마드리드',
    'Barcelona': '바르셀로나',
    'Atletico Madrid': '아틀레티코 마드리드',
    'Athletic Club': '아틀레틱 빌바오',
    'Real Sociedad': '레알 소시에다드',
    'Real Betis': '레알 베티스',
    'Villarreal': '비야레알',
    'Valencia': '발렌시아',
    'Sevilla': '세비야',
    'Osasuna': '오사수나',
    'Celta Vigo': '셀타 비고',
    'Rayo Vallecano': '라요 바예카노',
    'Mallorca': '마요르카',
    'Getafe': '헤타페',
    'Girona': '지로나',
    'Espanyol': '에스파뇰',
    'Alaves': '알라베스',
    'Leganes': '레가네스',
    'Las Palmas': '라스 팔마스',
    'Real Valladolid': '레알 바야돌리드',

    // ==================== 리그1 (61) ====================
    'Paris Saint Germain': '파리 생제르맹',
    'Marseille': '마르세유',
    'Monaco': '모나코',
    'Lille': '릴',
    'Lyon': '리옹',
    'Nice': '니스',
    'Lens': '랑스',
    'Rennes': '렌',
    'Reims': '랭스',
    'Montpellier': '몽펠리에',
    'Brest': '브레스트',
    'Strasbourg': '스트라스부르',
    'Nantes': '낭트',
    'Toulouse': '툴루즈',
    'Angers': '앙제',
    'Le Havre': '르아브르',
    'Saint-Etienne': '생테티엔',
    'Auxerre': '오세르',
    'Troyes': '트루아',
    'Ajaccio': '아작시오',
    'Clermont Foot': '클레르몽',

    // ==================== 세리에 A (135) ====================
    'Inter': '인테르 밀란',
    'AC Milan': 'AC 밀란',
    'Juventus': '유벤투스',
    'Napoli': '나폴리',
    'Lazio': '라치오',
    'AS Roma': 'AS 로마',
    'Atalanta': '아탈란타',
    'Fiorentina': '피오렌티나',
    'Torino': '토리노',
    'Bologna': '볼로냐',
    'Udinese': '우디네세',
    'Monza': '몬차',
    'Verona': '베로나',
    'Lecce': '레체',
    'Cagliari': '칼리아리',
    'Genoa': '제노아',
    'Empoli': '엠폴리',
    'Parma': '파르마',
    'Como': '코모',
    'Venezia': '베네치아',

    // ==================== 분데스리가 (78) ====================
    'Bayern München': '바이에른 뮌헨',
    'Borussia Dortmund': '보루시아 도르트문트',
    'RB Leipzig': 'RB 라이프치히',
    'Bayer Leverkusen': '바이어 레버쿠젠',
    'Union Berlin': '우니온 베를린',
    'SC Freiburg': '프라이부르크',
    'Eintracht Frankfurt': '아인트라흐트 프랑크푸르트',
    'VfL Wolfsburg': '볼프스부르크',
    'Borussia Mönchengladbach': '보루시아 묀헨글라트바흐',
    'FSV Mainz 05': '마인츠',
    'FC Koln': '쾰른',
    '1899 Hoffenheim': '호펜하임',
    'VfB Stuttgart': '슈투트가르트',
    'Werder Bremen': '베르더 브레멘',
    'FC Augsburg': '아우크스부르크',
    'Hertha BSC': '헤르타 베를린',
    'VfL Bochum': '보훔',
    'FC Heidenheim': '하이덴하임',
    'Holstein Kiel': '홀슈타인 킬',
    'SpVgg Greuther Fürth' : 'SpVgg 그로이터 퓌르트'
};

// 팀 이름 가져오기 헬퍼 함수
export const getKoreanTeamName = (englishName) => {
    return teamKoreanNames[englishName] || englishName;
};

// 역방향 검색 (한글 → 영어)
export const getEnglishTeamName = (koreanName) => {
    const entry = Object.entries(teamKoreanNames).find(
        ([_, korean]) => korean === koreanName
    );
    return entry ? entry[0] : koreanName;
};
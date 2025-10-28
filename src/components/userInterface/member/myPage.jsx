import React, { useMemo, useState } from "react";
import {
  Page,
  Header,
  Title,
  Sub,
  Stack,
  Card,
  CardTop,
  CardTitle,
  Grid2,
  Label,
  Input,
  PrimaryBtn,
  SecondaryBtn,
  DangerBtn,
} from "./MyPage.styles";

const MyPage = ({
  user,
  teams = [],
  onChangePassword,
  onSelectTeam,
  onDeleteAccount,
  message = "",
  error = "",
  busy = false,
}) => {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  function submitChangePassword(e) {
    e.preventDefault();
    if (!onChangePassword) return;
    if (!currentPw || !newPw) return;
    if (newPw !== confirmPw) return;
    onChangePassword({ currentPassword: currentPw, newPassword: newPw });
  }

  const pwStrength = useMemo(() => {
    let s = 0;
    if (newPw.length >= 8) s++;
    if (/[A-Z]/.test(newPw)) s++;
    if (/[0-9]/.test(newPw)) s++;
    if (/[^A-Za-z0-9]/.test(newPw)) s++;
    return s;
  }, [newPw]);

  return (
    <Page>
      <Header>
        <Title>마이페이지</Title>
        <Sub>계정 관리 · 비밀번호 변경 · 내 축구팀 선택</Sub>
      </Header>

      <Stack>
        {/* 계정 정보 */}
        <Card>
          <CardTop>
            <CardTitle>계정 정보</CardTitle>
          </CardTop>
          <Grid2>
            <div>
              <Label>아이디</Label>
              <div>{user ? user.username : "-"}</div>
            </div>
            <div>
              <Label>내 번호(ID)</Label>
              <div>{user ? user.id : "-"}</div>
            </div>
          </Grid2>
        </Card>

        {/* 비밀번호 변경 */}
        <Card>
          <CardTop>
            <CardTitle>비밀번호 변경</CardTitle>
          </CardTop>
          <form onSubmit={submitChangePassword}>
            <div>
              <Label>현재 비밀번호</Label>
              <Input
                type="password"
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                disabled={busy}
              />
            </div>
            <div>
              <Label>새 비밀번호</Label>
              <Input
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                disabled={busy}
              />
              <div
                style={{
                  marginTop: 6,
                  height: 6,
                  background: "#e5e7eb",
                  borderRadius: 6,
                }}
              >
                <div
                  style={{
                    height: 6,
                    width: (pwStrength / 4) * 100 + "%",
                    background: "#4f46e5",
                    borderRadius: 6,
                    transition: "width 0.2s",
                  }}
                />
              </div>
            </div>
            <div>
              <Label>새 비밀번호 확인</Label>
              <Input
                type="password"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                disabled={busy}
              />
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <PrimaryBtn type="submit" disabled={busy}>
                변경
              </PrimaryBtn>
              <SecondaryBtn
                type="button"
                onClick={() => {
                  setCurrentPw("");
                  setNewPw("");
                  setConfirmPw("");
                }}
              >
                초기화
              </SecondaryBtn>
            </div>
          </form>
        </Card>

        {/* 내 축구팀 */}
        <Card>
          <CardTop>
            <CardTitle>내 축구팀</CardTitle>
          </CardTop>
          {teams.length ? (
            <ul style={{ display: "grid", gap: 8 }}>
              {teams.map((t) => (
                <li
                  key={t.id}
                  style={{ display: "flex", gap: 8, alignItems: "center" }}
                >
                  <input
                    type="radio"
                    name="myteam"
                    checked={user && user.selectedTeamId === t.id}
                    onChange={() => onSelectTeam && onSelectTeam(t.id)}
                    disabled={busy}
                  />
                  <span>{t.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              등록된 팀이 없습니다.
            </p>
          )}
        </Card>

        {/* 회원 탈퇴 */}
        <Card>
          <CardTop>
            <CardTitle style={{ color: "#dc2626" }}>회원 탈퇴</CardTitle>
          </CardTop>
          <p
            style={{ fontSize: "0.875rem", color: "#4b5563", marginBottom: 12 }}
          >
            탈퇴 시 데이터가 삭제될 수 있습니다.
          </p>
          <DangerBtn
            onClick={() => onDeleteAccount && onDeleteAccount()}
            disabled={busy}
          >
            회원 탈퇴
          </DangerBtn>
        </Card>

        {/* 알림 메시지 */}
        {(message || error) && (
          <div
            style={{
              borderRadius: 16,
              padding: 16,
              border: "1px solid",
              color: error ? "#b91c1c" : "#047857",
              background: error ? "#fef2f2" : "#ecfdf5",
            }}
          >
            {error || message}
          </div>
        )}
      </Stack>
    </Page>
  );
};

export default MyPage;

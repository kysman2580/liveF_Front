import React, { useMemo, useState, useEffect } from "react";
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
import { useAuth } from "../../../provider/AuthProvider";
import axios from "../../../api/AxiosInterceptor";

const MyPage = () => {
  const { auth, deleteAccount } = useAuth();
  const [memberInfo, setMemberInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get("/api/member/myInfo", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setMemberInfo(response.data.data.member);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    axios
      .put("/api/member/update", memberInfo, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("회원정보 수정 성공:", res);
        alert("회원 정보가 수정되었습니다!");
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("회원정보 수정 실패:", error);
        alert("회원 정보 수정 중 오류가 발생했습니다.");
      });
  };

  if (loading) return <div style={{ padding: 16 }}>로딩중...</div>;
  if (!memberInfo)
    return <div style={{ padding: 16 }}>회원 정보를 불러오지 못했습니다.</div>;

  console.log("memberInfo:", memberInfo);

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
              <Input
                name="memberId"
                value={memberInfo.memberId}
                disabled={!isEditing}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>회원 번호</Label>
              <Input name="memberNo" value={memberInfo.memberNo} disabled />
            </div>
            <div>
              <Label>이름</Label>
              <Input
                name="memberName"
                value={memberInfo.memberName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>닉네임</Label>
              <Input
                name="memberNickname"
                value={memberInfo.memberNickname}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>전화번호</Label>
              <Input
                name="memberPhone"
                value={memberInfo.memberPhone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>가입일</Label>
              <Input
                name="enrollDate"
                value={new Date(memberInfo.enrollDate).toLocaleString()}
                disabled
              />
            </div>
            <div>
              <Label>활동 상태</Label>
              <Input
                name="isActive"
                value={memberInfo.isActive === "Y" ? "활성" : "비활성"}
                disabled
              />
            </div>
            <div>
              <Label>권한</Label>
              <Input name="memberRole" value={memberInfo.memberRole} disabled />
            </div>
          </Grid2>

          {/* ✅ 수정 / 완료 버튼 */}
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            {isEditing ? (
              <PrimaryBtn onClick={handleUpdate}>수정완료</PrimaryBtn>
            ) : (
              <PrimaryBtn onClick={() => setIsEditing(true)}>
                수정하기
              </PrimaryBtn>
            )}
          </div>
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
          <DangerBtn onClick={deleteAccount}>회원 탈퇴</DangerBtn>
        </Card>
      </Stack>
    </Page>
  );
};

export default MyPage;

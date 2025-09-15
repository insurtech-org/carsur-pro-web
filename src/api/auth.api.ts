import apiInstance from "./api.config";

//로그인 임시
export const login = async (userId: string, password: string) => {
  const res = await apiInstance.post("/auth/factory/login", {
    userId,
    password,
  });
  return res?.data?.data;
};

//비밀번호 변경
export const changePassword = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
  const res = await apiInstance.put("/auth/factory/change-password", {
    currentPassword,
    newPassword,
    confirmPassword,
  });
  return res;
};

//리프레쉬 토큰 갱신
export const refreshToken = async (body: { refreshToken: string }) => {
  const res = await apiInstance.post("/auth/factory/refresh", body);
  return res;
};

//로그아웃
//헤더에 Authorization 토큰 필요
export const logout = async () => {
  const res = await apiInstance.post("/auth/logout");
  return res;
};

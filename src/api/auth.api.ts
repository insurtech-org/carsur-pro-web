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

import apiInstance from "./api.config";

const prefix = "/api/push/tokens";

export interface IRegisterTokenForm {
  userType: string;
  userId: number | string;
  fcmToken: string;
  deviceId?: string;
  deviceType: string;
  deviceName?: string;
}

export interface IDeleteTokenForm {
  userType: string;
  userId: number | string;
  deviceId: string;
}

// 토큰 등록
export const registerTokenApi = async (body: IRegisterTokenForm) => {
  const response = await apiInstance.post(`${prefix}/register`, body, {
    skipLoading: true, // 로딩 페이지 표시 안함
  });
  return response?.data?.data;
};

// 만료된 토큰 clear
export const clearTokensApi = async (daysOld: number) => {
  const response = await apiInstance.post(`${prefix}/cleanup/${daysOld}`, {
    daysOld,
  });
  return response?.data;
};

// 푸시토큰 삭제 (알림 비활성화 시)
export const deleteTokenApi = async (body: IDeleteTokenForm) => {
  const response = await apiInstance.delete(prefix, { data: body });
  return response?.data;
};

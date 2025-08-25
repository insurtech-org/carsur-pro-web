import apiInstance from "./api.config";

/**
 * 특정 연도의 공휴일 및 주말 정보를 조회하는 API
 * @param year 조회할 연도 (예: 2025)
 * @returns 공휴일 및 주말 정보 배열
 */
export const getHolidays = async (year: number) => {
  const res = await apiInstance.get(`/common/holidays?solYear=${year}`);
  return res;
};

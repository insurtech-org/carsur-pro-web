import apiInstance from "./api.config";

const prefix = "/factory/work-schedules";

// 작업 일정 조회
export const getWorkScheduleList = async (pageable?: { page: number; size: number }) => {
  const res = await apiInstance.get(prefix, pageable && { params: { page: pageable?.page, size: pageable?.size } });
  return res?.data?.data;
};

//작업 일정 상세조회
export const getWorkScheduleDetail = async (id: number) => {
  const res = await apiInstance.get(`${prefix}/${id}`);
  return res?.data?.data;
};

//작업 탭별 카운트 조회
export const getWorkScheduleTabCount = async () => {
  const res = await apiInstance.get(`${prefix}/tab-count`);
  return res?.data?.data;
};

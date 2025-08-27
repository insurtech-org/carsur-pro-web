import apiInstance from "./api.config";

const prefix = "/factory/work-schedules";

// 작업 일정 조회
export const getWorkScheduleList = async (pageable: { status?: string; page: number; size: number }) => {
  const res = await apiInstance.get(prefix, {
    params: { page: pageable?.page, size: pageable?.size, status: pageable?.status },
  });
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

//작업 상태 업데이트
export const updateWorkScheduleStatus = async (id: number, status: string) => {
  const res = await apiInstance.put(`${prefix}/${id}/status/${status}`);
  return res;
};

//입고 확정 취소(제안포기)
export const cancelWorkSchedule = async (id: number) => {
  const res = await apiInstance.put(`${prefix}/${id}/abandon`);
  return res;
};

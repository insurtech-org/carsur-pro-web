import apiInstance from "./api.config";

const prefix = "/factory/calls";

//콜 목록 조회
export const getCallList = async (pageable?: {
  page: number;
  size: number;
}) => {
  const res = await apiInstance.get(
    `${prefix}/regional`,
    pageable && {
      params: {
        page: pageable?.page,
        size: pageable?.size,
      },
    }
  );
  return res?.data?.data;
};

//콜 제안하기
export const postPropose = async (id: number) => {
  const res = await apiInstance.post(`${prefix}/${id}/proposals`, {
    accidentRequestId: id,
  });
  return res;
};

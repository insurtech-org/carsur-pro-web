import apiInstance from "./api.config";

const prefix = "/factory/calls";

//콜 제안하기
export const postPropose = async (id: number) => {
  const res = await apiInstance.post(`${prefix}/${id}/proposals`, {
    accidentRequestId: id,
  });
  return res;
};

//콜 제안 취소
export const deletePropose = async (id: number) => {
  const res = await apiInstance.delete(`${prefix}/${id}/proposals`);
  return res;
};

//콜 목록 조회
export const getCallList = async (pageable?: { page: number; size: number }) => {
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

//콜 상세 정보 조회
export const getCallDetail = async (id: number) => {
  const res = await apiInstance.get(`${prefix}/${id}`);
  return res?.data?.data;
};

// 제안 리스트
export const getProposalList = async (pageable?: { page: number; size: number }) => {
  const res = await apiInstance.get(
    `${prefix}/proposals`,
    pageable && {
      params: {
        page: pageable?.page,
        size: pageable?.size,
      },
    }
  );

  return res?.data?.data;
};

//제안내역 조회
export const getProposalHistory = async (pageable?: { page: number; size: number }) => {
  const res = await apiInstance.get(
    `${prefix}/proposal-histories`,
    pageable && {
      params: {
        page: pageable?.page,
        size: pageable?.size,
      },
    }
  );
  return res?.data?.data;
};

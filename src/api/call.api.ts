import apiInstance from "./api.config";

const prefix = "/factory/calls";

export const getCallList = async (pageable?: {
  page: number;
  size: number;
}) => {
  const res = await apiInstance.get(`${prefix}/regional`);
  return res?.data?.data;
};

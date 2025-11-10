import apiInstance from "./api.config";

const prefix = "/factory/accidents";

export interface ICommentList {
  id: number;
  accidentRequestId: number;
  commentContent: string;
  authorType: string;
  authorTypeDisplay: string;
  authorId: number;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICommentCreate {
  commentContent: string;
}

//댓글 조회
export const getComments = async (id: number) => {
  const res = await apiInstance.get(`${prefix}/${id}/comments`);
  return res?.data?.data;
};

//댓글 작성
export const postComment = async (id: number, body: ICommentCreate) => {
  const res = await apiInstance.post(`${prefix}/${id}/comments`, body);
  return res;
};

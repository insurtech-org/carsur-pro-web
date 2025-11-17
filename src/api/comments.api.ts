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

export interface ICommentRead {
  lastReadCommentId: number;
}

//댓글 조회
export const getComments = async (id: number, unreadOnly: boolean = false, skipLoading: boolean = true) => {
  const res = await apiInstance.get(`${prefix}/${id}/comments`, {
    params: { unreadOnly },
    skipLoading, // skipLoading 옵션이 true인 경우 로딩을 건너뜀
  });
  return res?.data?.data;
};

//댓글 작성
export const postComment = async (id: number, body: ICommentCreate, skipLoading: boolean = true) => {
  const res = await apiInstance.post(`${prefix}/${id}/comments`, body, {
    skipLoading, // skipLoading 옵션이 true인 경우 로딩을 건너뜀 (기본값: true)
  });
  return res;
};

//댓글 읽음 처리
export const readComment = async (id: number, body: ICommentRead, skipLoading: boolean = true) => {
  const res = await apiInstance.post(`${prefix}/${id}/comments/read`, body, {
    skipLoading, // skipLoading 옵션이 true인 경우 로딩을 건너뜀 (기본값: true)
  });
  return res;
};

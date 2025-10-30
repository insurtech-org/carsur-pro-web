//콜 목록
export interface ICallList {
  id: number;
  insuranceCompanyName: string | null;
  reservationDate: string | null;
  address: string | null;
  carModel: string | null;
  sido: string | null;
  sigungu: string | null;
}
//제안 목록
export interface IProposeList {
  id: number;
  insuranceCompanyName: string | null;
  reservationDate: string | null;
  address: string | null;
  carModel: string | null;
  sido: string | null;
  sigungu: string | null;
}

//콜 상세
export interface ICallDetail {
  id: number;
  carModel: string;
  carNumber: string;
  carScale: string;
  engineDisplacement: string;
  carModelYear: string;
  sido: string;
  sigungu: string;
  insuranceClaimNo: string;
  insuranceCompanyName: string;
  reservationDate: string;
  coverageType: string | null;
  customerAddReq?: string | null;
  insuranceAddReq?: string | null;
  proposal: {
    id: number;
    status: string;
    createdAt: string;
    cancelledAt: string;
    rejectedAt: string;
    acceptedAt: string;
  };
}

//제안 내역
export interface IProposalHistory {
  id: number;
  insuranceCompanyName: string;
  sido: string;
  sigungu: string;
  carModel: string;
  reservationDate: string;
  proposedAt: string;
  proposalStatus: string;
  formattedAddress: string;
}

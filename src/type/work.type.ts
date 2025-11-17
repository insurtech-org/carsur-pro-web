//작업 리스트
export interface IWorkList {
  id: number;
  status: string;
  carModel: string;
  carNumber: string;
  sigungu: string;
  tellNo: string;
  insuranceCompanyName: string;
  reservationDate: string;
  unreadCommentCount?: number;
  sido?: string;
}

//상태 카운트
export interface IWorkStatusCount {
  arrivedCount?: number;
  billingCompletedCount: number;
  cancelledCount: number;
  confirmedCount: number;
  releasedCount: number;
  repairCompletedCount: number;
  repairStartedCount: number;
  totalCount: number;
}

//작업 상세
export interface IWorkDetail {
  id: number;
  accidentStatus: string;
  tellNo: string;
  insuranceClaimNo: string;
  insuranceCompanyName: string;
  insuranceCompanyId: number;
  coverageType: string;
  orderRank: string;
  faultRate: string;
  contactManagerName: string;
  contactManagerPhone: string;
  contactManagerFax: string;
  sigungu: string;
  sido?: string;
  reservationDate: string;
  carNumber: string;
  carModel: string;
  engineDisplacement: string;
  carModelYear: string;
  customerAddReq?: string | null;
  insuranceAddReq?: string | null;
  confirmedDate: string;
  arrivedDate: string;
  repairStartedDate: string;
  repairCompletedDate: string;
  releasedDate: string;
  billingCompletedDate: string;
  laborPrice?: number;
  partsPrice?: number;
  unreadCommentCount?: number;
}

//상태 접수 타입
export type StatusChangeType = "arrived" | "repair-started" | "repair-completed" | "released";

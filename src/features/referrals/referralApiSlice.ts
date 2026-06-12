import { apiSlice } from "../api/apiSlice";

export interface Investment {
  _id: string;
  userReference: string;
  investmentAmount: number;
  planDetails: string;
  startDate?: string;
  endDate: string;
  dailyRoiPercentage: number;
  investmentStatus: "Active" | "Completed" | "Cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface ReferralIncome {
  _id: string;
  createdAt: string;
  generator?: {
    fullName: string;
  };
  level: number;
  amount: number;
}

export interface RoiHistory {
  _id: string;
  date?: string;
  createdAt: string;
  planName?: string;
  planDetails?: string;
  roiAmount?: number;
  amount?: number;
}

export interface ReferralTreeNode {
  _id: string;
  fullName: string;
  email: string;
  level: number;
  downline?: ReferralTreeNode[]; 
}

export interface UserDetailResponse {
  investments: Investment[];
  referralIncomes: ReferralIncome[];
  roiHistories: RoiHistory[];
  referralTree: ReferralTreeNode[];
  referralCode?: string;
}


export const referralApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReferralData: builder.query<UserDetailResponse, void>({
      query: () => "/user/details",
      providesTags: [ "User"],
    }),
  }),
});

export const { useGetReferralDataQuery } = referralApiSlice;
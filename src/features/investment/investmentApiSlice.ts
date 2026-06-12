import { apiSlice } from "../api/apiSlice";


export interface Investment {
  _id: string;
  userReference: string;
  investmentAmount: number;
  planDetails: string;
  startDate: string;
  endDate: string;
  dailyRoiPercentage: number;
  investmentStatus: "Active" | "Completed" | "Cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface DashboardResponse {
  walletBalance: number;
  totalRoiEarned: number;
  totalLevelIncomeEarned: number;
  totalInvestedAmount: number;
  activeInvestmentsCount: number;
  recentInvestments: Investment[];
  referralCode: string;
}

export interface CreateInvestmentRequest {
  investmentAmount: number;
  planDetails: string;
  duration: number; 
  dailyRoiPercentage: number;
}

export interface CreateInvestmentResponse {
  message: string;
  investment: Investment;
}


export const investmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getDashboardData: builder.query<DashboardResponse, void>({
      query: () => '/investments/dashboard',
      providesTags: ['Dashboard'],
    }),

    createInvestment: builder.mutation<CreateInvestmentResponse, CreateInvestmentRequest>({
      query: (investmentData) => ({
        url: '/investments',
        method: 'POST',
        body: investmentData,
      }),
      invalidatesTags: ['Dashboard', 'User'], 
    }),
    
  }),
});

export const { 
  useGetDashboardDataQuery, 
  useCreateInvestmentMutation,
} = investmentApiSlice;
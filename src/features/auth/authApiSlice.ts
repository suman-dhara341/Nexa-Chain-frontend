import { apiSlice } from "../api/apiSlice";


export interface User {
  _id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  referralCode: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginRequest {
  email?: string;
  mobileNumber?: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  mobileNumber: string;
  password: string;
  referralCode?: string;
}


export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
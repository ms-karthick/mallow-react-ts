import { apiService as api } from "../store/apiService";

const AuthApi = api
  .enhanceEndpoints({
    // addTagTypes
  })
  .injectEndpoints({
    endpoints: (build) => ({
      signIn: build.mutation<any, { email: string; password: string }>({
        query: (data) => ({
          url: `/login`,
          method: "POST",
          data: data,
        }),
      }),
    }),
    overrideExisting: false,
  });

export const { useSignInMutation } = AuthApi;

import { apiService as api } from "../../store/apiService";

const Api = api
  .enhanceEndpoints({
    // addTagTypes
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createUser: build.mutation({
        query: (data) => ({
          url: `/users`,
          method: "POST",
          data: data,
        }),
      }),

      userLists: build.query<any, any>({
        query: (page: number) => ({
          url: `/users?page=${page}`,
        }),
      }),

      getUser: build.query({
        query: (userId) => ({
          url: `/users/${userId}`,
        }),
      }),

      updateUser: build.mutation({
        query: ({ id, data }) => ({
          url: `/users/${id}`,
          method: "PUT",
          data: data,
        }),
      }),

      deleteUser: build.mutation({
        query: (userId) => ({
          url: `/users/${userId}`,
          method: "DELETE",
        }),
      }),
    }),
    overrideExisting: false,
  });

export type Token = {
  access_token: string;
  refresh_token: string;
};

export type UserData = {
  tokens: Token;
};

export const {
  useCreateUserMutation,
  useUserListsQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = Api;

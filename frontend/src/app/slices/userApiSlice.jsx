import { apiSlice } from "./apiSlice";

const USER_URL = "/api/users";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    update: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/update`,
        method: "PUT",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    delete: builder.mutation({
      query: () => ({
        url: `${USER_URL}/delete`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useUpdateMutation,
  useLoginMutation,
  useLogoutMutation,
  useDeleteMutation,
} = userApiSlice;

export default userApiSlice;

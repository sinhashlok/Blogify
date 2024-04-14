import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    prepareHeaders: (headers) => {
      headers.set("Authorization", "Bearer " + localStorage.getItem("token"));
    },
  }),
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => "/blogify/blog",
    }),
  }),
});

export const { useGetAllBlogsQuery } = apiSlice;

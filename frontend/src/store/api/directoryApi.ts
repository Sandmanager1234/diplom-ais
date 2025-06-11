import {createApi} from "@reduxjs/toolkit/query/react";
import {APIWithToken} from "../../services/api";
import axios from 'axios';

export const baseURL = process.env.API_URL

const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params, headers }) => {
      try {
          const token = sessionStorage.getItem('accessToken');
          const result = await axios({
              url: `${baseUrl}${url}`,
              method,
              data,
              params,
              headers: {
                  Authorization: `Bearer ${token}`,
                  ...headers,
              },
          });
          return { data: result.data };
      } catch (axiosError) {
          return {
              error: {
                  status: axiosError.response?.status,
                  data: axiosError.response?.data || axiosError.message,
              },
          };
      }
  };

export const directoryStoreApi = createApi({
    reducerPath: 'directoryApi',
    baseQuery: axiosBaseQuery({ baseUrl: baseURL }),
    tagTypes: ['Directories'],
    endpoints: (build) => ({
        getDirectory: build.query({
            query: (arg) => ({ url: `/directories/${arg}/items`, method: 'GET' }),
            providesTags: ['Directories'],
        }),
    }),
});

export const { useGetDirectoryQuery } = directoryStoreApi;
import tenantEndpoints from "@/api/endpoints/tenant";
import { queryKeys } from "@/constants/queryKeys";
import handleApiError from "@/utils/handleApiError";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook to get all account closure requests
 * @param page
 * @param pageSize
 * @param searchTerm
 * @returns
 */
function useGetAllTenants(
  page: number,
  pageSize: number,
  searchTerm: string | number
) {
  return useQuery({
    queryKey: [queryKeys.getAllTenants, page, pageSize, searchTerm],
    queryFn: async () => {
      try {
        const { data } = await tenantEndpoints.getAllTenants(
          page,
          pageSize,
          searchTerm
        );
        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        throw handleApiError(e);
      }
    },
  });
}

export default useGetAllTenants;

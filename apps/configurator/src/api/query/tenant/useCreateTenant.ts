import tenantEndpoints from "@/api/endpoints/tenant";
import handleApiError from "@/utils/handleApiError";
import Result from "@/utils/result";
import { useMutation } from "@tanstack/react-query";

async function createTenant(tenant: any): Promise<unknown> {
  try {
    const response = await tenantEndpoints.createTenant(tenant);

    const { data } = response;
    const { result } = Result.success(data);
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const error = handleApiError(e);
    throw error;
  }
}

function useCreateTenant() {
  return useMutation({
    mutationFn: (params: any) => createTenant(params.withdrawalRequest),
  });
}

export default useCreateTenant;

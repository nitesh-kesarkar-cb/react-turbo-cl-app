import { setUrlParams } from "@/utils/helpers";
import httpClient from "@/utils/httpClient";
import { endpoints } from "..";

const { TENANT } = endpoints;

const tenantEndpoints = {
  getAllTenants(
    page: number,
    pageSize: number,
    searchTerm: string | number,
    status?: string
  ) {
    const params = {
      page: page,
      pageSize: pageSize,
      searchTerm: searchTerm,
      status: status,
    };

    const url = setUrlParams(TENANT.GET_ALL, params);
    return httpClient.get(url);
  },

  createTenant(tenant: any) {
    const url = TENANT.CREATE;
    return httpClient.post(url, tenant);
  },
};

export default tenantEndpoints;

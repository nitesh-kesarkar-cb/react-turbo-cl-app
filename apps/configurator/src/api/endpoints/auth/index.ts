import { setUrlParams } from "@/utils/helpers";
import httpClient from "@/utils/httpClient";
import { endpoints } from "..";

const { AUTH } = endpoints;

const authEndpoints = {
  login(email: string, password: string) {
    const credentials = {
      email: email,
      password: password,
    };
    const url = AUTH.LOGIN;
    return httpClient.post(url, credentials);
  },

  refresh(email: string, password: string) {
    const credentials = {
      email: email,
      password: password,
    };

    const url = setUrlParams(AUTH.REFRESH, credentials);
    return httpClient.get(url);
  },

  profile(id: string) {
    const params = {
      id: id,
    };

    const url = setUrlParams(AUTH.PROFILE, params);
    return httpClient.get(url);
  },
};

export default authEndpoints;

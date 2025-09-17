interface IsetUrlParams {
  [key: string]: string | number | undefined | boolean;
}
/**
 * Function to set uel params
 * @param url the api endpoint
 * @param params params to pass { param_name : param_value }
 * @returns
 */
export const setUrlParams = (url: string, params: IsetUrlParams) => {
  let paramString = "?";

  const parameters = Object.entries(params);

  if (parameters.length) {
    parameters.forEach((param, index) => {
      if (param[1] !== null && param[1] !== undefined) {
        if (index !== 0) {
          const result = paramString.concat(`&${param[0]}=${param[1]}`);
          paramString = result;
        } else {
          const result = paramString.concat(`${param[0]}=${param[1]}`);
          paramString = result;
        }
      }
    });

    const newUrl = url.concat(paramString);
    url = newUrl;
  }

  return url;
};

import axios from "axios";
import { localStorageAction } from "./localstorage";

axios.defaults.baseURL = "http://127.0.0.1:8000";

export const sendMultipartRequest = async ({
  method = "GET",
  route,
  body,
  includeHeaders = true,
}) => {
  if (!route) throw Error("URL required");

  const headers = includeHeaders
    ? {
        Authorization: `Bearer ${localStorageAction("access_token")}`,
        "Content-Type": "multipart/form-data",
      }
    : {};

  try {
    const response = await axios.request({
      method,
      url: route,
      data: body,
      headers: headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

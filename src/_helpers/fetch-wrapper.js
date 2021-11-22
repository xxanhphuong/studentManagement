import { useRecoilState } from "recoil";

import { history } from "@iso/helpers";
import { authAtom } from "@iso/state";

import toast from "react-hot-toast";
import { get } from "lodash";
export { useFetchWrapper };

function useFetchWrapper() {
  const [auth, setAuth] = useRecoilState(authAtom);

  return {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    delete: request("DELETE"),
    patch: request("PATCH"),
  };

  function request(method) {
    return (url, body) => {
      const requestOptions = {
        method,
        headers: authHeader(url),
      };
      if (body) {
        requestOptions.headers["Content-Type"] = "application/json";
        requestOptions.body = JSON.stringify(body);
      }
      return fetch(url, requestOptions).then(handleResponse);
    };
  }

  // helper functions

  function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const token = auth?.token;
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
    if (isLoggedIn && isApiUrl) {
      return {
        Authorization: `Bearer ${token}`,
        "access-control-allow-headers": "*",
        "access-control-expose-headers": "*",
      };
    } else {
      return {};
    }
  }

  function handleResponse(response) {
    let xPagination = response.headers.get("X-Pagination");
    if (xPagination) {
      var xPaginationParsed = JSON.parse(xPagination);
    }
    return response.text().then((text) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if ([401, 403].includes(response.status) && auth?.token) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          localStorage.removeItem("user");
          setAuth(null);
          history.push("/login");
        } else if (response.status === 404) {
          if (data[""] && data[""].errors[0].errorMessage) {
            toast.error(data[""].errors[0].errorMessage);
          }
        } else {
          toast.error("Sorry, our server is on break !!!");
        }
        const error = (data && data.message) || response.statusText;

        return Promise.reject(error);
      }
      if (xPaginationParsed) {
        return { data: data, paging: xPaginationParsed };
      } else {
        return data;
      }
    });
  }
}

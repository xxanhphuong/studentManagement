import { useSetRecoilState } from "recoil";

import { history, useFetchWrapper } from "@iso/helpers";
import { authAtom, usersAtom } from "@iso/state";
import { usersProfileAtom } from "@iso/state/users";

export { useClassActions };

function useClassActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/api/Classes`;
  const fetchWrapper = useFetchWrapper();

  return {
    getClasses,
    postClasses,
    deleteClasses,
    getClassesDetail,
    updateClasses,
  };

  async function getClasses(offset, limit, params = false, search) {
    return await fetchWrapper.get(
      baseUrl +
        "?PageNumber=" +
        offset +
        "&PageSize=" +
        limit +
        (params && params.order
          ? "&order=" + JSON.stringify(params.order)
          : "") +
        (search && Object.keys(search).length !== 0 ? "&kw=" + search : "")
    );
  }

  async function postClasses(body) {
    return await fetchWrapper.post(baseUrl, body);
  }

  async function deleteClasses(id) {
    return await fetchWrapper.delete(`${baseUrl}/${id}`);
  }

  async function getClassesDetail(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
  }

  async function updateClasses(id, body) {
    return await fetchWrapper.patch(`${baseUrl}/${id}`, body);
  }
}

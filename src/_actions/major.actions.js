import { useFetchWrapper } from "@iso/helpers";

export { useMajorActions };

function useMajorActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/api/major`;
  const fetchWrapper = useFetchWrapper();

  return {
    getMajor,
    postMajor,
    deleteMajor,
    getMajorDetail,
    updateMajor,
  };

  async function getMajor(offset, limit, params = false, search) {
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

  async function postMajor(body) {
    return await fetchWrapper.post(baseUrl, body);
  }

  async function deleteMajor(id) {
    return await fetchWrapper.delete(`${baseUrl}/${id}`);
  }

  async function getMajorDetail(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
  }

  async function updateMajor(id, body) {
    return await fetchWrapper.patch(`${baseUrl}/${id}`, body);
  }
}

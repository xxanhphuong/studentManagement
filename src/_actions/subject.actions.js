import { useFetchWrapper } from "@iso/helpers";

export { useSubjectActions };

function useSubjectActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/api/subject`;
  const fetchWrapper = useFetchWrapper();

  return {
    getSubject,
    deleteSubject,
    getSubjectDetail,
    updateSubject,
  };

  async function getSubject(offset, limit, params = false, search) {
    return await fetchWrapper.get(
      baseUrl +
        "?PageNumber=" +
        offset +
        "&PageSize=" +
        limit +
        (params && params.order
          ? "&order=" + JSON.stringify(params.order)
          : "") +
        (search ? "&kw=" + search : "")
    );
  }

  async function deleteSubject(id) {
    return await fetchWrapper.delete(`${baseUrl}/${id}`);
  }

  async function getSubjectDetail(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
  }

  async function updateSubject(id, body) {
    return await fetchWrapper.patch(`${baseUrl}/${id}`, body);
  }
}

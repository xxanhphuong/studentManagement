import { useFetchWrapper } from "@iso/helpers";

export { useScoreActions };

function useScoreActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/api/score`;
  const fetchWrapper = useFetchWrapper();

  return {
    getScore,
    deleteScore,
    getScoreDetail,
    updateScore,
    postScore,
  };

  async function getScore(offset, limit, params = false, search) {
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

  async function deleteScore(id, subjectId) {
    return await fetchWrapper.delete(`${baseUrl}/${id}/${subjectId}`);
  }

  async function getScoreDetail(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
  }

  async function postScore(body) {
    return await fetchWrapper.post(`${baseUrl}`, body);
  }

  async function updateScore(id, body) {
    return await fetchWrapper.patch(`${baseUrl}/${id}`, body);
  }
}

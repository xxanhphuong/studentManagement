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

  async function getScore(offset, limit, params = false, search, id) {
    return await fetchWrapper.get(
      baseUrl +
        "?PageNumber=" +
        offset +
        "&PageSize=" +
        limit +
        (params && params.order
          ? "&order=" + JSON.stringify(params.order)
          : "") +
        (search && Object.keys(search).length !== 0
          ? "&studentId=" + search
          : "") +
        (id != null ? `&studentId=${id}` : "")
    );
  }

  async function deleteScore(id, subjectId) {
    return await fetchWrapper.delete(`${baseUrl}/${id}/${subjectId}`);
  }

  async function getScoreDetail(studenId, subjectId) {
    return await fetchWrapper.get(`${baseUrl}/${studenId}/${subjectId}`);
  }

  async function postScore(body) {
    return await fetchWrapper.post(`${baseUrl}`, body);
  }

  async function updateScore(body, studenId, subjectId) {
    return await fetchWrapper.patch(`${baseUrl}/${studenId}/${subjectId}`, {
      ...body,
      studentId: parseInt(studenId),
      subjectId: parseInt(subjectId),
    });
  }
}

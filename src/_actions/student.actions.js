import { useFetchWrapper } from "@iso/helpers";

export { useStudentActions };

function useStudentActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/api/student`;
  const fetchWrapper = useFetchWrapper();

  return {
    getStudent,
    deleteStudent,
    getStudentDetail,
    updateStudent,
  };

  async function getStudent(offset, limit, params = false, search) {
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

  async function deleteStudent(id) {
    return await fetchWrapper.delete(`${baseUrl}/${id}`);
  }

  async function getStudentDetail(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
  }

  async function updateStudent(id, body) {
    return await fetchWrapper.patch(`${baseUrl}/${id}`, body);
  }
}

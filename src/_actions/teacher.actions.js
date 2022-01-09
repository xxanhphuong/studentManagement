import { useFetchWrapper } from "@iso/helpers";

export { useTeacherActions };

function useTeacherActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/api/teacher`;
  const fetchWrapper = useFetchWrapper();

  return {
    getTeacher,
    deleteTeacher,
    getTeacherDetail,
    updateTeacher,
  };

  async function getTeacher(offset, limit, params = false, search) {
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

  async function deleteTeacher(id) {
    return await fetchWrapper.delete(`${baseUrl}/${id}`);
  }

  async function getTeacherDetail(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
  }

  async function updateTeacher(id, body) {
    return await fetchWrapper.patch(`${baseUrl}/${id}`, {
      teacherId: id,
      salary: body?.salary,
    });
  }
}

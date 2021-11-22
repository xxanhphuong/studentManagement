import { useSetRecoilState } from "recoil";

import { history, useFetchWrapper } from "@iso/helpers";
import { authAtom, usersAtom } from "@iso/state";
import { usersProfileAtom, usersModalVisibleAtom } from "@iso/state/users";

export { useUserActions };

function useUserActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/api/Users`;
  const fetchWrapper = useFetchWrapper();
  const setAuth = useSetRecoilState(authAtom);
  const setUsers = useSetRecoilState(usersAtom);
  const setUsersProfile = useSetRecoilState(usersProfileAtom);
  const setUsersModal = useSetRecoilState(usersModalVisibleAtom);
  return {
    login,
    logout,
    getAll,
    userProfile,
    updateProfile,
    getListUser,
    deleteUser,
    showUserModal,
    hideUserModal,
    addUser,
  };

  function login(username, password) {
    return fetchWrapper
      .post(`${baseUrl}/authenticate`, { username, password })
      .then((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));
        setAuth(user);
        setUsers(user);

        // get return url from location state or default to home page
        const { from } = history.location.state || { from: { pathname: "/" } };
        history.push(from);
      });
  }

  function logout() {
    // remove user from local storage, set auth state to null and redirect to login page
    localStorage.removeItem("user");
    setAuth(null);
    history.push("/login");
  }

  function getAll() {
    return fetchWrapper.get(baseUrl).then(setUsers);
  }

  async function userProfile(userID) {
    return await fetchWrapper.get(`${baseUrl}/${userID}`).then((res) => {
      res && setUsersProfile(res);
      return res;
    });
  }

  async function addUser(body) {
    return await fetchWrapper.post(`${baseUrl}`, body);
  }

  async function updateProfile(id, body) {
    return await fetchWrapper.patch(`${baseUrl}/${id}`, body);
  }

  async function getListUser(offset, limit, params = false, search) {
    console.log(typeof search != null);
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
  async function deleteUser(id) {
    return await fetchWrapper.delete(`${baseUrl}/${id}`);
  }

  function showUserModal() {
    setUsersModal(true);
  }

  function hideUserModal() {
    setUsersModal(false);
  }
}

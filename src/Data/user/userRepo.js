import * as API_URI from "../../utils/api_uri_helper";

export const getUsers = async() => {
    try {
        const response = await fetch(API_URI.USERS_LIST_API);
        const data = await response.json();
        return data;
    } catch (error) {
      console.error(error);
    }
}

export const updateUserData = async(newUserData) => {
    try {
      fetch(API_URI.USERS_PUT_DATA + newUserData.id, {
        method: 'PUT',
        body: JSON.stringify(newUserData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
      return true;
    } catch (error) {
      return false;
    }
}

export const deleteUser = async(user) => {
  try {
    fetch(API_URI.USERS_DELETE + user.id, {
      method: 'DELETE',
    });
    return true;
  } catch (error) {
    return false;
  }
}
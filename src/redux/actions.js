import * as actions from '../utils/actionType';

export function syncUsers(isLoading){
    return {
        type: actions.SYNC_USERS, 
        isLoading: isLoading
    };
}

export function updateUsersCount(userCount){
    return {
        type: actions.UPDATE_USER_COUNT,
        userCount: userCount
      };
}

export function updateUsers(users){
    return {
        type: actions.UPDATE_USERS,
        userCount: users.length,
        users: users
      };
}

export function setUserDataToEdit(user){
    return {
        type: actions.SET_USERDATA_TO_EDIT,
        userToEdit: user
      };
}

export function updateUserData(user){
    return {
        type: actions.UPDATE_USER_DATA,
        userToEdit: user
      };
}

export function setUserToDelete(user){
    return {
        type: actions.SET_USER_TO_DELETE,
        userToDelete: user
      };
}

export function deleteUser(user){
    return {
        type: actions.DELETE_USER,
        userToDelete: user
      };
}
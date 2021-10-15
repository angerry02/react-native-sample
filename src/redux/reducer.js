import * as actionsType from '../utils/actionType';

const initialState = {
    isLoading: false,
    userCount: 0,
    userToEdit: [],
    users: [],
    newUserData: [],
    userToDelete: []
  };

export default function reducer(state = initialState, action){
    switch(action.type) {
      case actionsType.SYNC_USERS: 
        return {
          ...state,
          isLoading: action.isLoading
        };
      case actionsType.UPDATE_USER_COUNT: 
        return {
          ...state,
          userCount: action.userCount
        };
      case actionsType.UPDATE_USERS: 
        return {
          ...state,
          userCount: action.userCount,
          users: action.users
        };
      case actionsType.SET_USERDATA_TO_EDIT: 
        return {
          ...state,
          userToEdit: action.userToEdit
        };
      case actionsType.UPDATE_USER_DATA: 
        return {
          ...state,
          users: state.users.map(function(element){
            if(element.id == state.userToEdit.id){
              element = state.userToEdit
            }
            return element;
          }),
          userToEdit: []//reset
        };
      case actionsType.DELETE_USER:
        console.log('deleting user: ' + action.userToDelete.id);
        const newUsers = state.users.filter(data => data.id != action.userToDelete.id);
        return {
          ...state,
          users: newUsers,
          userCount: newUsers.length
        };
      default:
        return state;
    }
  };
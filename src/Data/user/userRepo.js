import { USERS_LIST_API } from "../../utils/api_uri_helper";

export const getUsers = async()=>{
    try {
        const response = await fetch(USERS_LIST_API);
        const data = await response.json();
        return data;
    } catch (error) {
      console.error(error);
    }
}
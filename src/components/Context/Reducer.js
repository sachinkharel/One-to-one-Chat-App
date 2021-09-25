//const userLocal = JSON.parse(localStorage.getItem("user"));
import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";

export const initialState = {
  user: null,
  users: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "GET_REALTIME_USERS":
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
};
export default reducer;

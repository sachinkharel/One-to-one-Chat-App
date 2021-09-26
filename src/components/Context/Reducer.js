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
  conversations: [],
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
    case "REAL_TIME_MESSAGE":
      return {
        ...state,
        conversations: action.conversations,
      };
    default:
      return state;
  }
};
export default reducer;

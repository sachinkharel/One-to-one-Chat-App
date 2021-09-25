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
  GET_REALTIME_USERS: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "GET_REALTIME_USERS":
      return {};
    default:
      return state;
  }
};
export default reducer;

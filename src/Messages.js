import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import { useStateValue } from "./components/Context/StateProvider";

export const DBsendMessage = async (message) => {
  const db = getFirestore();
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      ...message,
      isView: false,
      createdAt: new Date(),
    });
    // dispatch({
    //   type: "REAL_TIME_MESSAGE",
    // });
  } catch (a) {
    alert("Error adding document: ", a);
  }
};
// export const GetMessages = (user) => {
//   const db = getFirestore();
//   const q = query(
//     collection(db, "messages"),
//     where("user_uid_1", "in", [user.user_uid_1, user.user_uid_2])
//   );
//   const unsubscribe = onSnapshot(q, (querySnapshot) => {
//     const messages = [];
//     querySnapshot.forEach((doc) => {
//       if (
//         (doc.data().user_uid_1 == user.user_uid_1 &&
//           doc.data().user_uid_2 == user.user_uid_2) ||
//         (doc.data().user_uid_1 == user.user_uid_2 &&
//           doc.data().user_uid_2 == user.user_uid_1)
//       ) {
//         messages.push(doc.data());
//       }
//       if (messages.length > 0) {
//         dispatch({
//           type: "REAL_TIME_MESSAGE",
//           conversations: { messages },
//         });
//       }
//     });
//     console.log(messages);
//   });
// };

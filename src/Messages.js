import { addDoc, collection, getFirestore } from "@firebase/firestore";

export const sendMessage = async (message) => {
  const db = getFirestore();
  try {
    const docRef = await addDoc(collection(db, "users"), {
      ...message,
    });
  } catch (a) {
    alert("Error adding document: ", a);
  }
};

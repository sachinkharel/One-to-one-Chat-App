import { getAuth, onAuthStateChanged } from "@firebase/auth";
import React, { useEffect } from "react";
import "../index.css";
import { getOnline } from "../Useraction";
import { useStateValue } from "./Context/StateProvider";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  getDocs,
} from "@firebase/firestore";

const Chat = () => {
  const [state, dispatch] = useStateValue();
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const db = getFirestore();

  useEffect(() => {
    getDocs(collection(db, "users")).then((docSnap) => {
      docSnap.forEach(async (docs) => {
        if (docs.data().uid === userLocal.user.uid) {
          const userInfo = doc(db, "users", docs.id);
          await updateDoc(userInfo, {
            isOnline: true,
          });
        }
        console.log(docs.id, " => ", docs.data());
      });
    });
  }, []);

  return (
    <section className="outerBox">
      <div className="listOfUsers">
        <div className="displayName">
          <div className="displayPic">
            <img
              src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg"
              alt=""
            />
          </div>
          <div style={{ margin: "0 10px" }}>
            <span style={{ fontWeight: 500 }}>Rizwan Khan</span>
          </div>
        </div>
      </div>
      <div className="chatArea">
        <div className="chatHeader"> Rizwan Khan </div>
        <div className="messageSections">
          <div style={{ textAlign: "left" }}>
            <p className="messageStyle">Hello User</p>
          </div>
        </div>
        <div className="chatControls">
          <textarea />
          <button>Send</button>
        </div>
      </div>
    </section>
  );
};

export default Chat;

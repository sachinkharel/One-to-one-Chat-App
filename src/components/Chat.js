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
  query,
  where,
  onSnapshot,
} from "@firebase/firestore";

const Chat = () => {
  const [state, dispatch] = useStateValue();
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const db = getFirestore();

  useEffect(() => {
    dispatch({
      type: "SET_USER",
      user: state.user,
    });
    getDocs(collection(db, "users")).then((docSnap) => {
      docSnap.forEach(async (docs) => {
        if (docs.data().uid === userLocal.user.uid) {
          const userInfo = doc(db, "users", docs.id);
          await updateDoc(userInfo, {
            isOnline: true,
          });
        }
      });
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "users"), where("isOnline", "==", true));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().uid != userLocal?.user.uid) users.push(doc.data());
      });
      dispatch({
        type: "GET_REALTIME_USERS",
        users: users,
      });
    });
  }, []);

  return (
    <section className="outerBox">
      <div className="listOfUsers">
        {state.users.length > 0
          ? state.users.map((user) => {
              return (
                <div className="displayName">
                  <div className="displayPic">
                    <img
                      src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg"
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      margin: "0 10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontWeight: 500 }}>{user.name}</span>
                    <span style={{ fontWeight: 500 }}>
                      {user.isOnline ? "online" : "offline"}
                    </span>
                  </div>
                </div>
              );
            })
          : null}
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

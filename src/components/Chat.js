import { getAuth, onAuthStateChanged } from "@firebase/auth";
import React, { useEffect, useState } from "react";
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
import { auth } from "../firebase";

const User = (props) => {
  const { user, onClick } = props;
  return (
    <div onClick={() => onClick(user)} className="displayName">
      <div className="displayPic">
        <img
          src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg"
          alt=""
        />
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          margin: "0 10px",
        }}
      >
        <span style={{ fontWeight: 500 }}>{user.name}</span>
        <span style={{ fontWeight: 500 }}>
          {user.isOnline ? "online" : "offline"}
        </span>
      </div>
    </div>
  );
};

const Chat = () => {
  const [state, dispatch] = useStateValue();
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");
  const [userUid, setUserUid] = useState("");
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
    const q = query(collection(db, "users"));
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

  const initChat = (user) => {
    setChatStarted(true);
    setChatUser(`${user.name}`);
    setUserUid(user.uid);
  };

  const sendMessage = () => {
    const msgObj = {
      user_uid_1: userLocal.user.uid,
      user_uid_2: userUid,
      message,
    };
    console.log(msgObj);
  };

  return (
    <section className="outerBox">
      <div className="listOfUsers">
        {state.users.length > 0
          ? state.users.map((user) => {
              return <User onClick={initChat} key={user.uid} user={user} />;
            })
          : null}
      </div>
      <div className="chatArea">
        <div className="chatHeader">{chatStarted ? chatUser : ""}</div>
        <div className="messageSections">
          {chatStarted ? (
            <div style={{ textAlign: "left" }}>
              <p className="messageStyle">Hello User</p>
            </div>
          ) : null}
        </div>
        {chatStarted ? (
          <div className="chatControls">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send message"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Chat;

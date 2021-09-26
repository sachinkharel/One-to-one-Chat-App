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
  orderBy,
} from "@firebase/firestore";

import { DBsendMessage } from "../Messages";

const User = (props) => {
  const { user, onClick } = props;
  return (
    <div onClick={() => onClick(user)} className="displayName">
      <div className="displayPic">
        <img
          src="https://st.depositphotos.com/2218212/2938/i/950/depositphotos_29387653-stock-photo-facebook-profile.jpg"
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
  const [chatingUser, setChatingUser] = useState("");
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

  const GetMessages = (user) => {
    const q = query(
      collection(db, "messages"),
      where("user_uid_1", "in", [user.user_uid_1, user.user_uid_2]),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        if (
          (doc.data().user_uid_1 === user.user_uid_1 &&
            doc.data().user_uid_2 === user.user_uid_2) ||
          (doc.data().user_uid_1 === user.user_uid_2 &&
            doc.data().user_uid_2 === user.user_uid_1)
        ) {
          messages.push(doc.data());
        }
        // if (messages.length > 0) {
        //   dispatch({
        //     type: "REAL_TIME_MESSAGE",
        //     conversations: messages,
        //   });
        // }
      });
      dispatch({
        type: "REAL_TIME_MESSAGE",
        conversations: messages,
      });
      console.log(messages);
    });
  };

  const setView = (user) => {
    getDocs(collection(db, "messages")).then((docSnap) => {
      docSnap.forEach(async (docs) => {
        if (docs.data().user_uid_1 === user.uid) {
          const userInfo = doc(db, "messages", docs.id);
          await updateDoc(userInfo, {
            isView: true,
          });
        }
      });
    });
  };

  const initChat = (user) => {
    setChatStarted(true);
    setChatingUser(user);
    setChatUser(`${user.name}`);
    setUserUid(user.uid);
    GetMessages({ user_uid_1: userLocal.user.uid, user_uid_2: user.uid });
    setView(user);
  };

  const sendMessage = () => {
    const msgObj = {
      user_uid_1: userLocal.user.uid,
      user_uid_2: userUid,
      message,
    };
    if (message !== "") {
      DBsendMessage(msgObj);
      setMessage("");
    }
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
          {chatStarted
            ? state.conversations.map((con) => (
                <div
                  style={{
                    textAlign:
                      con.user_uid_1 === userLocal.user.uid ? "right" : "left",
                  }}
                >
                  <p className="messageStyle">{con.message}</p>
                  <p>
                    {con.user_uid_1 === userLocal?.user.uid
                      ? con.isView
                        ? "seen"
                        : chatingUser.isOnline
                        ? "delivered"
                        : "sent"
                      : " "}
                  </p>
                </div>
              ))
            : null}
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

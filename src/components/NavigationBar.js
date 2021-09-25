import React, { useEffect, useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { useHistory } from "react-router";
import { useStateValue } from "./Context/StateProvider";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  getDocs,
} from "@firebase/firestore";

const NavigationBar = () => {
  const [state, dispatch] = useStateValue();
  const history = useHistory();
  // console.log(state.user);
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const auth = getAuth();
  const db = getFirestore();

  const logout = async (e) => {
    e.preventDefault();

    const docSnap = await getDocs(collection(db, "users"));
    docSnap.forEach(async (docs) => {
      if (docs.data().uid === userLocal.user.uid) {
        const userInfo = doc(db, "users", docs.id);
        await updateDoc(userInfo, {
          isOnline: false,
        });
      }
      console.log(docs.id, " => ", docs.data());
    });
    if (state.user || userLocal.user) {
      dispatch({
        type: "SET_USER",
        user: null,
      });
      auth.signOut();
      localStorage.removeItem("user");
    }
  };
  // console.log(userLocal.name);
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Financepeer Test</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as:
              {userLocal?.user.displayName}
            </Navbar.Text>
          </Navbar.Collapse>
          {state.user || userLocal?.user ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            ""
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;

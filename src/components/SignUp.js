import { React, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { create } from "../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useStateValue } from "./Context/StateProvider";

const SignUp = () => {
  const [state, dispatch] = useStateValue();

  const history = useHistory();
  const db = getFirestore();
  const auth = getAuth();

  const signUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((Auth) => {
        if (Auth) {
          console.log(Auth);
          const Name = `${name}`;
          updateProfile(auth.currentUser, {
            displayName: Name,
          }).then(async () => {
            try {
              const docRef = await addDoc(collection(db, "users"), {
                uid: Auth.user.uid,
                name: Name,
                email: email,
                createdAt: new Date(),
                isOnline: true,
              });
              // .then((user) => {
              //   const loggedInUser = {
              //     uid: Auth.user.uid,
              //     name: Name,
              //     email: email,
              //   };
              //   // localStorage.setItem("user", JSON.stringify(loggedInUser));
              // });
            } catch (a) {
              alert("Error adding document: ", a);
            }
          });
          history.push("/Chat");
        }
      })
      .catch((error) => alert(error.message));
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      {/* <NavigationBar /> */}
      <Container className="p-5">
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                type="name"
                value={name}
                placeholder="Enter your name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Col className="p-2">
              <Button onClick={signUp} variant="primary" type="submit">
                Sign Up
              </Button>
            </Col>
            <Form.Text className="text-muted p-2">Already a member ?</Form.Text>
            <Col className="p-2">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Col>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;

import { React, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { create } from "../firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const SignUp = () => {
  const history = useHistory();
  const signUp = (e) => {
    e.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((Auth) => {
        if (Auth) {
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

import { getAuth } from "@firebase/auth";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useStateValue } from "./Context/StateProvider";

const Login = () => {
  const [state, dispatch] = useStateValue();
  const history = useHistory();

  const signIn = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((Auth) => {
        localStorage.setItem("user", JSON.stringify(Auth));
        if (Auth) {
          dispatch({
            type: "SET_USER",
            user: Auth,
          });
          //console.log(Auth.user.displayName);

          history.push("/Chat");
        }
      })
      .catch((error) => alert(error.message));
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      {/* <NavigationBar /> */}
      <Container className="p-5">
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
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
              <Button onClick={signIn} variant="primary" type="submit">
                Login
              </Button>
            </Col>
            <Form.Text className="text-muted p-2">
              Want to be a member ?
            </Form.Text>
            <Col className="p-2">
              <Link to="/Signup">
                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </Link>
            </Col>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default Login;

import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { useStateValue } from "./Context/StateProvider";

const NavigationBar = () => {
  const [state, dispatch] = useStateValue();
  // console.log(state.user);
  const logout = () => {
    if (state.user) {
      dispatch({
        type: "SET_USER",
        user: null,
      });
    }
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Financepeer Test</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as:
              <p>{state.user?.user.displayName}</p>
            </Navbar.Text>
          </Navbar.Collapse>
          {state.user ? <Button onClick={logout}>Logout</Button> : ""}
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;

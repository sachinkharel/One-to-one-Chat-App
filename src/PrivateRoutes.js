import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useStateValue } from "./components/Context/StateProvider";

function PrivateRoutes({ component: Component, ...rest }) {
  const [state, dispatch] = useStateValue();
  const userLocal = JSON.parse(localStorage.getItem("user"));
  return (
    <Route
      {...rest}
      render={(props) =>
        // console.log(props)
        userLocal?.user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoutes;

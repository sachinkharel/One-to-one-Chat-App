import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Chat from "./components/Chat";
import PrivateRoutes from "./PrivateRoutes";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/SignUp" component={SignUp} exact />
          <PrivateRoutes path="/Chat" component={Chat} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

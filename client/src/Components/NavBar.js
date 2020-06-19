import React from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
// import Login from "./register/Login";
import SignUp from "./register/Signin";
import Home from "../Components/Home/Home";

function NavBar() {
  return (
    <Router>
      <div>
        <div className="nav">
          <nav className="App">
            <div className="nav-items">
              <Link to={"/"}>Home</Link>
              <div>
                <ul>
                  {/* <li>
                    <Link to={"/login"}>Login</Link>
                  </li> */}
                  <li>
                    <Link to={"/sign-up"}>SignUp</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              {/* <Route path="/login" component={Login} /> */}
              <Route path="/sign-up" component={SignUp} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default NavBar;

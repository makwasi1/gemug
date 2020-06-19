import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <div className="navbar">
          <nav className="z-depth-0">
            <div className="nav-wrapper ">
              <Link
                to="/"
                style={{ fontFamily: "monospace" }}
                className="col s5 brand-logo center black-text"
              >
                <i className="material-icons">home</i>
                GemUg
              </Link>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

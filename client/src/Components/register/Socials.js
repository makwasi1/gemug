import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";

export default function Socials() {
  return (
    <Router>
      <div>
        <Link className="social">
          <i className="fa fa-facebook" />
        </Link>
        <Link  className="social">
          <i className="fa fa-google-plus" />
        </Link>
        <Link  className="social">
          <i className="fa fa-linkedin" />
        </Link>
      </div>
    </Router>
  );
}

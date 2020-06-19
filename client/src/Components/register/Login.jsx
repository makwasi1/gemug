import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <div className="form-container sign-in-container">
        <form action="#">
          <h1>Sign in</h1>

          <span>or use your account</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button>Sign In</button>
        </form>
      </div>
    ); 
  }
}

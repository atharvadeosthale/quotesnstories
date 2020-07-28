import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Homepage = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const [auth, setAuth] = useState(false);

  const onChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const onChangeRegister = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", {
        email: loginForm.email,
        password: loginForm.password,
      });
      const token = res.data.token;
      localStorage.setItem("token", token);
      setAuth(true);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const onRegisterSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      {auth && <Redirect to="/dashboard" />}
      <div className="row">
        <div className="col-md">
          <form onSubmit={onLoginSubmit}>
            <div className="form-group">
              <label htmlFor="email">E-Mail</label>
              <input
                type="text"
                name="email"
                placeholder="E-Mail Address"
                value={loginForm.email}
                onChange={(e) => onChange(e)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                name="password"
                placeholder="Enter your password"
                value={loginForm.password}
                onChange={(e) => onChange(e)}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </form>
        </div>
        <div className="col-md">
          <form onSubmit={onRegisterSubmit}>
            <div className="form-group">
              <label htmlFor="email">E-Mail</label>
              <input
                type="text"
                name="email"
                placeholder="E-Mail Address"
                value={registerForm.email}
                onChange={(e) => onChangeRegister(e)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                name="password"
                placeholder="Enter your password"
                value={registerForm.password}
                onChange={(e) => onChangeRegister(e)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                name="role"
                placeholder="admin / user"
                value={registerForm.role}
                onChange={(e) => onChangeRegister(e)}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Register
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Homepage;

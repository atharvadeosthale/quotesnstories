import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

const Dashboard = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [showRed, setShowRed] = useState(false);
  const [showGreen, setShowGreen] = useState(false);
  const [error, setError] = useState(false);

  const showButton = async () => {
    try {
      const config = {
        method: "get",
        url: "/api/auth",
        headers: { "x-auth-token": token },
      };
      const res = await axios(config);
      console.log(res.data.permissions);
      res.data.permissions.forEach(async (value, index) => {
        console.log("[index] " + index + " " + value);
        if (value === "AccessRedButton") {
          setShowRed(true);
        }

        if (value === "AccessGreenButton") {
          setShowGreen(true);
        }
      });
    } catch (err) {
      console.log(err);
      //localStorage.removeItem("token");
      setError(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setError(true); // to redirect
  };

  return (
    <Fragment>
      {error && <Redirect to="/" />}
      {showGreen && <Link className="btn btn-success">Green</Link>}
      {showRed && <Link className="btn btn-danger">Red</Link>}
      <br />
      <Link className="btn btn-primary" onClick={() => logout()}>
        Logout
      </Link>
    </Fragment>
  );
};

export default Dashboard;

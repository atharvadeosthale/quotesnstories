import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

const Dashboard = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [showButtons, setShowButtons] = useState({
    red: false,
    green: false,
  });

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
      res.data.permissions.forEach((value, index) => {
        console.log("[index] " + index + " " + value);
        if (value === "AccessRedButton") {
          setShowButtons({ ...showButtons, red: true });
        }

        if (value === "AccessGreenButton") {
          setShowButtons({ ...showButtons, green: true });
        }
      });
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  return (
    <Fragment>
      {error && <Redirect to="/" />}
      {showButtons.green && <Link className="btn btn-success">Green</Link>}
      {showButtons.red && <Link className="btn btn-danger">Red</Link>}
      <br />
    </Fragment>
  );
};

export default Dashboard;

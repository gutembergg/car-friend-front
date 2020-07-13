import React from "react";
import { Link } from "react-router-dom";

import { MDBIcon } from "mdbreact";

export default function NavBarDetail({ logout, user }) {
  return (
    <nav
      className="navbar navbar-expand-md p-0 navbar-dark"
      style={{ background: "#30475e" }}
    >
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbarDetail"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="collapsibleNavbarDetail">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              className="nav-link"
              to={{
                pathname: "/userParametres",
                state: {
                  user: user,
                },
              }}
            >
              <button>
                <MDBIcon icon="cog" />
              </button>
            </Link>
          </li>
          <li className="nav-item mr-3">
            <Link className="nav-link" to="/login">
              <button onClick={logout}>
                <MDBIcon icon="sign-out-alt" />
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

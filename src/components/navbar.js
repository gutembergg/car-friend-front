import React from "react";
import { Link } from "react-router-dom";

import { MDBIcon } from "mdbreact";

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <Link className="navbar-brand" to="">
                CarFriend
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#collapsibleNavbar"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">
                            <MDBIcon className="mr-1" icon="user-plus" />
                            S'inscrire
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            <MDBIcon className="mr-1" icon="sign-in-alt" />
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

import React from "react";
import { Link } from "react-router-dom";

import { MDBIcon } from "mdbreact";

export default function NavBarEventDetail({ event, userCars, userPassgInEvent }) {
    const user = JSON.parse(localStorage.getItem("@caroster:user"));

    console.log(userCars);

    return (
        <nav className="navbar navbar-expand-md p-0 navbar-dark" style={{ background: "#30475e" }}>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#collapsibleNavbarDetail"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="collapsibleNavbarDetail">
                <h4 className="text-light ml-3">Évenement: {event.title}</h4>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        {user ? (
                            <div className="dropdown">
                                <div
                                    type="button"
                                    className="btn btn-primary btn-sm dropdown-toggle d-flex align-items-center"
                                    data-toggle="dropdown"
                                >
                                    <MDBIcon icon="car-alt" size="2x" className="mr-2" />
                                    <strong>{user.name}</strong>:
                                </div>
                                <div className="dropdown-menu">
                                    {userCars.map(userCar => (
                                        <Link
                                            to={{
                                                pathname: `/event/${event._id}/addCars`,
                                                state: {
                                                    event: event,
                                                    userCar: userCar,
                                                    userPassgInEvent: userPassgInEvent,
                                                },
                                            }}
                                            key={userCar._id}
                                            className="dropdown-item"
                                        >
                                            {userCar.carName}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link
                                className="nav-link"
                                to={{
                                    pathname: `/event/${event._id}/addCars`,
                                    state: {
                                        event: event,
                                    },
                                }}
                            >
                                <button>
                                    <MDBIcon icon="plus" />
                                    <MDBIcon className="ml-2" icon="car-side" />
                                </button>
                            </Link>
                        )}
                    </li>

                    <li className="nav-item mr-3">
                        <Link
                            className="nav-link"
                            to={{
                                pathname: `/event/${event._id}/edit`,
                                state: {
                                    event: event,
                                },
                            }}
                        >
                            <button>
                                <MDBIcon icon="cog" />
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

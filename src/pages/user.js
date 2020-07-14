import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import NavBar from "../components/navbar";
import UserCars from "../components/userCars";
import NavBarDetail from "../components/navBarDetail";
import api from "../services/api";
import UserEvents from "../components/userPassengerInEvent";

export default function User() {
    const history = useHistory();
    const [user, setUser] = useState("");
    const [passengerInEvent, setPassengerInEvent] = useState([]);
    const [userEvents, setUserEvents] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("@caroster:user"));
        setUser(user);
    }, []);

    useEffect(() => {
        async function getUserPassengerInEvent() {
            try {
                const token = await localStorage.getItem("@caroster:token");
                const response = await api.get(`/user/passengerInEvent`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPassengerInEvent(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getUserPassengerInEvent();
    }, []);

    useEffect(() => {
        async function getEventsUser() {
            try {
                const token = await localStorage.getItem("@caroster:token");
                const response = await api.get("/user/event", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserEvents(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getEventsUser();
    }, []);

    function handleLogout() {
        localStorage.clear();
        history.push("/login");
    }

    return (
        <div>
            <NavBar />
            <NavBarDetail user={user} logout={handleLogout} />
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div>
                        <h1 className="text-center mt-3 mb-2">Bienvenue {user.name}</h1>
                    </div>
                </div>
            </div>

            <div className="container mt-4">
                <div className="row mx-auto">
                    <div className="col-12 col-sm-12 col-md-7 text-center mb-4">
                        <UserCars />
                    </div>
                    <div className="col-12 col-sm-12 col-md-5 text-center">
                        <div className="mb-4">
                            <UserEvents
                                eventName="Aucun évenement "
                                userEventsLength={userEvents.length}
                                eventsUser="Mes Évenements"
                                userEvent={userEvents}
                            />
                        </div>
                        <div>
                            <UserEvents
                                eventName="Aucun évenement"
                                userEventsLength={passengerInEvent.length}
                                eventsUser="Évenements comme participant"
                                userEvent={passengerInEvent}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from "react";

import api from "../services/api";
import NavBar from "../components/navbar";
import NavBarEventDetail from "../components/navBarEventDetail";
import Cars from "../components/cars";
import ListDAttente from "../components/waitingList";
import NotPageFound from "./notFoundPage";
import { MDBIcon } from "mdbreact";

function Event(props) {
    const [event, setEvent] = useState({});
    const [cars, setCars] = useState([]);
    const [carPlaces, setCarPlaces] = useState([]);
    const [userCars, setUserCars] = useState([]);
    const [userPassEvent, setUserPassEvent] = useState([]);
    const [userEvents, setUserEvents] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const user = JSON.parse(localStorage.getItem("@caroster:user"));
    const token = localStorage.getItem("@caroster:token");

    useEffect(() => {
        async function getEvent() {
            try {
                const response = await api.get(`/event/${props.match.params.id}`);

                setEvent(response.data);
            } catch (error) {
                console.log("ERROR-BACKEND", error.response.data.error);
                setErrorMessage(error.response.data.error);
            }
        }
        getEvent();
    }, [props.match.params.id]);

    async function getCars() {
        try {
            const response = await api.get(`/event/${props.match.params.id}/cars`);
            setCars(response.data);
            let cplace = response.data;
            let placeCar = [];
            cplace.map(car => {
                if (car.passengers.length !== car.seats) {
                    placeCar.push(car);
                    setCarPlaces([placeCar]);

                    return placeCar;
                } else {
                    return setCarPlaces([placeCar]);
                }
            });
        } catch (error) {
            console.log("ERROR-BACKEND", error.response.data.error);
        }
    }

    /// User session ////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        if (user) {
            async function getCarsUser() {
                try {
                    const token = await localStorage.getItem("@caroster:token");

                    const response = await api.get("/user/cars", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUserCars(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
            getCarsUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function userPassengerInEvent() {
        try {
            if (user) {
                const response = await api.get(`/user/passengerInEvent`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserPassEvent(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        userPassengerInEvent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        async function getEventsUser() {
            try {
                if (user) {
                    const token = await localStorage.getItem("@caroster:token");
                    const response = await api.get("/user/event", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUserEvents(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getEventsUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <NavBar />
            {!!errorMessage ? (
                <NotPageFound />
            ) : (
                <NavBarEventDetail
                    event={event}
                    userCars={userCars}
                    userPassgInEvent={user && user.passengerInEvent}
                />
            )}
            <div className="container">
                {cars.length === 0 && errorMessage.length === 0 ? (
                    <div>
                        <div className="d-flex justify-content-center">
                            <div className="col-sm-12 col-md-8">
                                <div
                                    className="alert alert-secondary text-center mt-2"
                                    role="alert"
                                >
                                    <h4 className="text-center">Pour commencer</h4>
                                    <p className="text-center">
                                        Ajouter votre voiture a l'évenement en cliquant sur le
                                        boutton
                                        <button className="ml-2">
                                            <MDBIcon icon="plus" />
                                            <MDBIcon className="ml-2" icon="car-side" />
                                        </button>
                                    </p>
                                    <p>
                                        Partagez le lien qui vous avez reçu par email avec vous amis
                                        !
                                    </p>
                                </div>
                            </div>
                        </div>
                        <h4 className="text-center mb-3 mt-5">Comment ça marche?</h4>
                        <div className="row">
                            <div className="col-sm-12 col-md-4 text-center">
                                <div className="mb-2">
                                    <strong>Voitures</strong>
                                </div>
                                <div>
                                    Ajoutez votre voiture en définissant la quantité de places
                                    disponibles , la date, l'horaire et lieu du rendez-vous, ainsi
                                    que votre contact et email, vous recevez un email a chaque fois
                                    que un ami s'inscrire dans votre voiture.
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4 text-center">
                                <div className="mb-2">
                                    <strong>Passagers</strong>
                                </div>
                                <div>
                                    Ajoutez votre nom dans une voiture ou dans la liste d'attente
                                    s'il n'y a pas de place dans une voiture.
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4 text-center">
                                <div className="mb-2">
                                    <strong>Utilisateur(optionnel)</strong>
                                </div>
                                <div>
                                    Créer un compte et profitez des avantages d'utilisateur: une
                                    liste avec vos voitures qui vous pouvez ajouter à un évenement
                                    d'un amis ou à vous propres évenements, une liste des évenements
                                    créer pour vous, ainsi que une liste des évenements sur lequels
                                    vous participez.
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
                <div className="row mt-5">
                    <div className="col-sm-12 col-md-7 col-lg-7">
                        <Cars
                            cars={cars}
                            getCars={getCars}
                            eventId={props.match.params.id}
                            carPlaces={carPlaces}
                            userPassgEvent={user && userPassEvent}
                            userPassengerInEvent={userPassengerInEvent}
                            userEvents={userEvents}
                        />
                    </div>
                    <div className="col-sm-12 col-md-5 col-lg-5 d-flex justify-content-center">
                        {cars.length !== 0 && (
                            <ListDAttente
                                getCars={getCars}
                                cars={cars}
                                eventId={props.match.params.id}
                                carPlaces={carPlaces}
                                userPassgEvent={user && userPassEvent}
                                userPassengerInEvent={userPassengerInEvent}
                                userEvents={userEvents}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Event;

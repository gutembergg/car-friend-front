import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";

import api from "../services/api";
import { MDBInput } from "mdbreact";
import { Button, DeleteButton } from "../styles";

const AddEventCars = props => {
    let location = useLocation();
    const history = useHistory();

    const user = JSON.parse(localStorage.getItem("@caroster:user"));
    const token = localStorage.getItem("@caroster:token");

    const [userCar] = useState(location.state.userCar);
    const [carName, setCarName] = useState(user ? userCar.carName : "");
    const [seats, setSeats] = useState(user ? userCar.seats : "");
    const [contact, setContact] = useState(user ? userCar.contact : "");
    const [email, setEmail] = useState(user ? userCar.email : "");
    const [message, setMessage] = useState(user ? userCar.message : "");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [event] = useState(location.state.event);
    const [userPassEvent, setUserPassEvent] = useState([]);

    useEffect(() => {
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
        userPassengerInEvent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleCars(e) {
        e.preventDefault();
        try {
            const userPassengerId = userPassEvent.filter(pass => pass._id === event._id);

            if (userPassengerId.length !== 0) {
                alert("Vous participez déjà de cet évenement");
                return null;
            }

            await api.post(`/event/${event._id}/cars`, {
                carName,
                seats,
                contact,
                email,
                message,
                address,
                date,
                time,
            });

            /// User session /////////////////////////////////////////////////////////////////////////////

            if (token) {
                try {
                    const response = await api.get("/user/event", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.data.length === 0) {
                        userPassengInEvent();
                    }

                    response.data.map(userEvent => {
                        if (userEvent._id !== event._id) {
                            userPassengInEvent();

                            return userEvent;
                        } else {
                            return null;
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }

            async function userPassengInEvent() {
                if (token) {
                    await api.post(
                        `/user/${event._id}/passengerInEvent`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                }
            }

            history.push(`/event/${event._id}`);
        } catch (error) {
            console.log(error);
        }
    }

    function goBack() {
        history.push(`/event/${event._id}`);
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-center">
                <div className="card mt-5" style={{ width: "50rem" }}>
                    <h3 className="text-center mt-5">
                        Ajouter votre voiture dans l'événement: <strong>{event.title}</strong>
                    </h3>
                    <form onSubmit={handleCars} data-toggle="validator">
                        <div className="card-body p-5">
                            <div className="row">
                                <div className="col-sm-6 col-12 col-md-6">
                                    <MDBInput
                                        label="name"
                                        outline
                                        type="text"
                                        name="name"
                                        value={carName.length > 20 ? "" : carName}
                                        onChange={e => setCarName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <MDBInput
                                        label="sieges"
                                        outline
                                        type="number"
                                        name="seats"
                                        value={seats <= 10 && seats}
                                        onChange={e => setSeats(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-12 col-md-6">
                                    <MDBInput
                                        label="email"
                                        outline
                                        type="email"
                                        name="email"
                                        value={email.length > 40 ? "" : email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <MDBInput
                                        label="contact"
                                        outline
                                        type="text"
                                        name="contact"
                                        value={contact.length > 20 ? "" : contact}
                                        onChange={e => setContact(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <MDBInput
                                        label="message"
                                        outline
                                        type="text"
                                        name="message"
                                        value={message.length > 25 ? "" : message}
                                        onChange={e => setMessage(e.target.value)}
                                    />
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <MDBInput
                                        label="address"
                                        outline
                                        type="text"
                                        name="address"
                                        value={address.length > 30 ? "" : address}
                                        onChange={e => setAddress(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row d-flex justify-content-center">
                                <div className="col-sm-12 col-md-4">
                                    <MDBInput
                                        outline
                                        type="date"
                                        name="date"
                                        value={date}
                                        onChange={e => setDate(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="col-sm-12 col-md-4">
                                    <MDBInput
                                        label="time"
                                        outline
                                        type="time"
                                        name="time"
                                        value={time}
                                        onChange={e => setTime(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center mt-3">
                                <div>
                                    <DeleteButton onClick={goBack} className="m-2">
                                        Annuler
                                    </DeleteButton>
                                </div>
                                <div>
                                    <Button type="submit" className="m-2">
                                        Valider
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddEventCars;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { MDBIcon, MDBPopover, MDBBtn, MDBPopoverBody } from "mdbreact";
import AddPassenger from "../components/addPassenger";
import PassengerInCar from "../components/passengerInCar";
import api from "../services/api";

const EventCars = props => {
    const [passengers, setPassengers] = useState([]);

    async function getPassengerInCar() {
        try {
            const response = await api.get(`/event/car/${props.carId}/passenger`);

            setPassengers(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        props.getCars();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getPassengerInCar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.carPlaces]);

    const numberPassengers = passengers.length;

    return (
        <div>
            <div className="row mx-auto">
                <div className="m-2">
                    <div className="card" style={{ width: "18rem" }}>
                        <div style={{ background: "#c1a57b" }} className="card-header">
                            <div className="row d-flex justify-content-between">
                                <div className="text-white">
                                    <MDBIcon className="mr-2 ml-2 white-text" icon="car" />
                                    {props.carName}
                                </div>
                                <div>
                                    <Link
                                        className="blue-grey-text"
                                        to={{
                                            pathname: `/car/edit`,
                                            state: {
                                                carId: props.carId,
                                                carName: props.carName,
                                                seats: props.seats,
                                                contact: props.contact,
                                                email: props.email,
                                                address: props.address,
                                                message: props.message,
                                                date: props.date,
                                                time: props.time,
                                                eventId: props.eventId,
                                            },
                                        }}
                                    >
                                        <MDBIcon className="mr-1" icon="pencil-alt" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-body border">
                            <div className="card-text">
                                <MDBIcon icon="chair" className="mr-3" />
                                {props.seats}
                            </div>
                            <div className="card-text">
                                <MDBIcon icon="phone-alt" className="mr-2" />

                                <MDBPopover placement="right" popover clickable id="popper1">
                                    <MDBBtn size="sm">Contact</MDBBtn>
                                    <div>
                                        <MDBPopoverBody>{props.contact}</MDBPopoverBody>
                                    </div>
                                </MDBPopover>
                            </div>
                            <div className="card-text">
                                <MDBIcon far icon="envelope" className="mr-3" />
                                {props.email.substr(0, 30)}
                                <br />
                                {props.email.substr(30)}
                            </div>
                            <div className="card-text">
                                <MDBIcon far icon="comment-alt" className="mr-3" />
                                {props.message}
                            </div>
                            <div className="card-text">
                                <MDBIcon icon="map-marker-alt" className="mr-3" />
                                {props.address}
                            </div>
                            <div className="card-text">
                                <MDBIcon far icon="calendar-alt" className="mr-3" />
                                {props.date}
                            </div>
                            <div className="card-text">
                                <MDBIcon far icon="clock" className="mr-3" />
                                {props.time}
                            </div>
                        </div>
                        <PassengerInCar
                            eventId={props.eventId}
                            getCars={props.getCars}
                            carFreePlace={props.carFreePlace}
                            passengersCar={passengers}
                            getPassengerInCar={getPassengerInCar}
                        />
                        <AddPassenger
                            eventId={props.eventId}
                            getCars={props.getCars}
                            carFreePlace={props.carFreePlace}
                            carId={props.carId}
                            carSeats={
                                numberPassengers ? props.seats - numberPassengers : props.seats
                            }
                            getPassengerInCar={getPassengerInCar}
                            userPassEvent={props.userPassEvent}
                            userPassengerInEvent={props.userPassengerInEvent}
                            userEvents={props.userEvents}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCars;

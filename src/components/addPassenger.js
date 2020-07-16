import React, { useState } from "react";

import api from "../services/api";
import ButtonAddPassenger from "./buttonAddPassenger";
import { MDBInput, MDBIcon, MDBView, MDBMask } from "mdbreact";

const AddPassenger = ({
    carId,
    carSeats,
    getPassengerInCar,
    getCars,
    eventId,
    userPassEvent,
    userPassengerInEvent,
    userEvents,
}) => {
    const [name, setName] = useState("");
    const [showInputAddPassenger, setShowInputAddPassenger] = useState(false);
    const user = JSON.parse(localStorage.getItem("@caroster:user"));
    const [isButtonDisabled, setIsButtonDisabled] = useState("");

    async function handlePassenger(e) {
        e.preventDefault();
        try {
            setIsButtonDisabled("disabled");

            if (name.length === 0) {
                return null;
            }

            if (user) {
                const userPassengerInEvent = userPassEvent.filter(
                    passUser => passUser._id === eventId
                );

                const userEventId = userEvents.filter(user => user._id === eventId);

                if (userPassengerInEvent.length !== 0 || userEventId.length !== 0) {
                    alert("Vous participez déjà de cet évenement");
                    return null;
                }
            }

            await api.post(`/event/car/${carId}/passenger`, {
                name,
            });
            getCars();
            userPassengerInEvent();
            setShowInputAddPassenger(false);
            getPassengerInCar();
            setName("");

            const token = await localStorage.getItem("@caroster:token");
            if (token) {
                await api.post(
                    `/user/${eventId}/passengerInEvent`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }
            setIsButtonDisabled("");
        } catch (error) {
            console.log(error);
        }
    }

    function showAddPassenger() {
        setShowInputAddPassenger(!showInputAddPassenger);
    }

    function handleName(e) {
        setName(e.target.value);
        getPassengerInCar();
    }

    return (
        <div>
            {showInputAddPassenger && (
                <form data-toggle="validator">
                    <div className="row">
                        <div className="ml-4 mr-2">
                            <MDBInput
                                type="text"
                                className="ml-1 mt-n3 mb-n3"
                                label="name"
                                name="name"
                                value={name.length > 22 ? "" : name}
                                onChange={handleName}
                                required
                            />
                        </div>
                        <div>
                            <MDBView
                                hover
                                onClick={handlePassenger}
                                className={`${isButtonDisabled}`}
                            >
                                <MDBIcon
                                    icon="check"
                                    style={{ color: "grey" }}
                                    className="mt-4 ml-4"
                                />
                                <MDBMask className="flex-center" overlay="white-strong"></MDBMask>
                            </MDBView>
                        </div>
                        <div>
                            <MDBView hover onClick={showAddPassenger}>
                                <MDBIcon
                                    icon="times"
                                    style={{ color: "grey" }}
                                    className="mt-4 ml-3"
                                />
                                <MDBMask className="flex-center" overlay="white-strong"></MDBMask>
                            </MDBView>
                        </div>
                    </div>
                </form>
            )}
            <ButtonAddPassenger carSeats={carSeats} showAddPassenger={showAddPassenger} />
        </div>
    );
};

export default AddPassenger;

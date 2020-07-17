import React, { useState } from "react";

import api from "../services/api";
import { MDBInput } from "mdbreact";
import { useHistory } from "react-router-dom";
import { Button, DeleteButton } from "../styles";

export default function AddUserCars() {
    const [carName, setCarName] = useState("");
    const [seats, setSeats] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState("");
    const history = useHistory();

    async function handleAddCar(e) {
        e.preventDefault();
        try {
            if (carName.length === 0 || seats === 0 || contact.length === 0 || email.length === 0) {
                return null;
            }
            const token = await localStorage.getItem("@caroster:token");

            await api.post(
                "/user/cars",
                {
                    carName: carName,
                    seats: seats,
                    contact: contact,
                    email: email,
                    message: message,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            history.push("/user");
        } catch (error) {
            setMessageError(error.response.data.error);
        }
    }

    function goback() {
        history.goBack();
    }

    return (
        <div className="container mt-4">
            <h3 className="text-center mb-2">Ajouter voiture</h3>
            <p className="text-center">{!!messageError && messageError}</p>
            <form onSubmit={handleAddCar}>
                <div className="d-flex justify-content-center">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-12 col-12 col-md-6">
                                    <MDBInput
                                        label="voiture"
                                        outline
                                        type="text"
                                        name="name"
                                        value={carName.length > 20 ? "" : carName}
                                        onChange={e => setCarName(e.target.value)}
                                    />
                                </div>
                                <div className="col-sm-12 col-12 col-md-6">
                                    <MDBInput
                                        label="sieges"
                                        outline
                                        type="number"
                                        name="seats"
                                        value={seats <= 10 && seats}
                                        onChange={e => setSeats(e.target.value)}
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
                                    />
                                </div>
                                <div className="col-sm-12 col-12 col-md-6">
                                    <MDBInput
                                        label="contact"
                                        outline
                                        type="text"
                                        name="contact"
                                        value={contact.length > 20 ? "" : contact}
                                        onChange={e => setContact(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-12 col-md-6">
                                    <MDBInput
                                        label="message"
                                        outline
                                        type="text"
                                        name="message"
                                        value={message.length > 25 ? "" : message}
                                        onChange={e => setMessage(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <div className="m-2">
                                    <DeleteButton onClick={goback}>Annuler</DeleteButton>
                                </div>
                                <div className="m-2">
                                    <Button type="submit">Valider</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

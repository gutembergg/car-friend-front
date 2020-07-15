import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import api from "../services/api";
import NavBar from "../components/navbar";
import { Button } from "../styles";

import { MDBInput } from "mdbreact";

const NewEvent = () => {
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");

    async function createEvent(e) {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("@caroster:user"));
        const token = await localStorage.getItem("@caroster:token");

        if (user) {
            try {
                const response = await api.post(
                    "/user/event",
                    {
                        title,
                        email,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const { _id } = response.data;

                history.push(`/event/${_id}`);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await api.post("/event", {
                    title,
                    email,
                });
                const { _id } = response.data;

                history.push(`/event/${_id}`);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <NavBar />
            <div className="container">
                <div className="alert alert-secondary text-center mt-4" role="alert">
                    <i>
                        <strong>Attention:</strong>
                    </i>{" "}
                    Si vous êtes <strong>utilisateur</strong> accéder a votre compte pour avoir
                    l'évenement dans votre liste personnelle
                </div>
                <div className="card p-5 col-sm-12 col-md-6 mx-auto mt-4">
                    <h4 className="text-center">Créér votre Evenement</h4>
                    <form onSubmit={createEvent} data-toggle="validator">
                        <MDBInput
                            outline
                            label="titre"
                            type="text"
                            value={title.length > 30 ? "" : title}
                            onChange={e => setTitle(e.target.value)}
                            name="title"
                            required
                        />
                        <MDBInput
                            outline
                            label="email"
                            type="email"
                            value={email.length > 40 ? "" : email}
                            onChange={e => setEmail(e.target.value)}
                            name="email"
                            required
                        />
                        <div className="text-center">
                            <Button type="submit">Valider</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewEvent;

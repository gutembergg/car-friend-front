import React, { useState } from "react";
import api from "../services/api";
import { useHistory, Link } from "react-router-dom";

import { MDBInput } from "mdbreact";
import { MDBIcon } from "mdbreact";

import { Button } from "../styles";

function Login() {
    const [messageError, setMessageError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    async function signIn(e) {
        e.preventDefault();

        try {
            const response = await api.post("/auth/authenticate", {
                email,
                password,
            });

            const { user, token } = response.data;

            localStorage.setItem("@caroster:user", JSON.stringify(user));
            localStorage.setItem("@caroster:token", token);

            history.push("/user");
        } catch (error) {
            setMessageError(error.response.data.error);
            console.log(error.response.data.error);
        }
    }

    return (
        <div>
            <div className="container text-center mt-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-sm-12 col-md-5">
                        {!!messageError && (
                            <div className="alert alert-danger mx-auto" role="alert">
                                {messageError}
                            </div>
                        )}

                        <div className="card">
                            <img
                                className="card-img-top mx-auto d-block mt-3"
                                style={{ paddingTop: "3px", width: "100px", height: "100px" }}
                                src="data:image/png;base64,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"
                                alt="cocoiturage"
                            />
                            <div className="card-body">
                                <h5 className="card-title">CarFriend</h5>
                                <form onSubmit={signIn}>
                                    <MDBInput
                                        label="Email"
                                        outline
                                        type="email"
                                        placeholder="email"
                                        name="email"
                                        value={email.length > 40 ? "" : email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <MDBInput
                                        label="Password"
                                        outline
                                        type="password"
                                        placeholder="password"
                                        name="password"
                                        value={password.length > 30 ? "" : password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <Button type="submit">Login</Button>
                                </form>
                                <div className="mt-3">
                                    <Link to="/forgot_password">Mot de passe oublié ?</Link>
                                    <br />
                                    <Link to="/register">S'inscrire</Link>
                                    <br />
                                    <Link className="text-dark" to={{ pathname: "/" }}>
                                        <MDBIcon className="mr-1" icon="arrow-left" />
                                        Acceuil
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

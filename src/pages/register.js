import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { MDBInput } from "mdbreact";
import api from "../services/api";
import NavBar from "../components/navbar";
import { Button } from "../styles";

export default function Register() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  async function registerUser(e) {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", {
        name: name,
        contact: contact,
        email: email,
        password: password,
      });

      const { user, token } = response.data;

      localStorage.setItem("@caroster:user", JSON.stringify(user));
      localStorage.setItem("@caroster:token", token);

      history.push("/user");
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <h3 className="text-center m-4">Créer votre compte</h3>
        {!!errorMessage && (
          <div
            className="alert alert-danger mx-auto text-center col-md-9"
            role="alert"
          >
            {errorMessage}
          </div>
        )}
        <div className="d-flex justify-content-center">
          <div className="card" style={{ width: "50rem" }}>
            <form
              onSubmit={registerUser}
              className="p-5"
              data-toggle="validator"
            >
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="form-group">
                    <MDBInput
                      outline
                      label="name"
                      type="text"
                      className="form-control"
                      placeholder="Enter name"
                      value={name.length > 30 ? "" : name}
                      onChange={(e) => setName(e.target.value)}
                      name="name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <MDBInput
                      outline
                      label="contact"
                      type="contact"
                      className="form-control"
                      placeholder="Enter contact"
                      value={contact.length > 20 ? "" : contact}
                      onChange={(e) => setContact(e.target.value)}
                      name="contact"
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="form-group">
                    <MDBInput
                      label="email"
                      outline
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={email.length > 40 ? "" : email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <MDBInput
                      label="password"
                      outline
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password.length > 30 ? "" : password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Button type="submit">Valider</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

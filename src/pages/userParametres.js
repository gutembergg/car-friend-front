import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";

import { MDBInput, MDBIcon } from "mdbreact";
import { Button, DeleteButton } from "../styles";

import api from "../services/api";

export default function UserParametres() {
  let location = useLocation();
  const [name, setName] = useState(location.state.user.name);
  const [contact, setContact] = useState(location.state.user.contact);
  const [email, setEmail] = useState(location.state.user.email);
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("@caroster:token");

  const history = useHistory();

  async function updateUser(e) {
    e.preventDefault();

    try {
      const token = await localStorage.getItem("@caroster:token");
      const response = await api.put(
        "/user/parametres",
        {
          name: name,
          contact: contact,
          email: email,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { user } = response.data;
      localStorage.setItem("@caroster:user", JSON.stringify(user));

      history.push("/user");
    } catch (error) {
      console.log(error);
    }
  }

  function goBack() {
    history.goBack();
  }

  async function deleteUser() {
    try {
      await api.delete("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.clear();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <h3 className="text-center m-4">Paramètres de compte</h3>
      <div className="d-flex justify-content-center">
        <div className="card" style={{ width: "50rem" }}>
          <div className="d-flex justify-content-end m-3">
            <MDBIcon
              style={{ cursor: "pointer" }}
              data-toggle="modal"
              data-target="#myModal"
              size="2x"
              className="red-text"
              icon="trash-alt"
            />
          </div>
          <div id="myModal" className="modal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 className="modal-title">Annuler</h4>
                </div>
                <div className="modal-body">
                  <p>Attention: "Valider" pour supprimer le compte.</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                  >
                    Annuler
                  </button>
                  <button
                    data-dismiss="modal"
                    onClick={deleteUser}
                    className="btn btn-danger"
                  >
                    Valider
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <form onSubmit={updateUser}>
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="form-group">
                    <MDBInput
                      outline
                      label="name"
                      type="text"
                      className="form-control"
                      value={name.length > 30 ? "" : name}
                      onChange={(e) => setName(e.target.value)}
                      name="name"
                    />
                  </div>
                  <div className="form-group">
                    <MDBInput
                      outline
                      label="contact"
                      type="contact"
                      className="form-control"
                      value={contact.length > 20 ? "" : contact}
                      onChange={(e) => setContact(e.target.value)}
                      name="contact"
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="form-group">
                    <MDBInput
                      outline
                      label="email"
                      type="email"
                      className="form-control"
                      value={email.length > 40 ? "" : email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                    />
                  </div>
                  <div className="form-group">
                    <MDBInput
                      outline
                      label="password"
                      type="password"
                      className="form-control"
                      value={password.length > 30 ? "" : password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                    />
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="text-center m-2">
                  <DeleteButton onClick={goBack}>Annuler</DeleteButton>
                </div>
                <div className="m-2">
                  <Button type="submit">Valider</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

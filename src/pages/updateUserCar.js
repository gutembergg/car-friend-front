import React, { useState } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";

import api from "../services/api";
import { MDBInput, MDBIcon } from "mdbreact";
import { Button, DeleteButton } from "../styles";

export default function UpdateUserCar(props) {
  let location = useLocation();
  const history = useHistory();
  const [carName, setCarName] = useState(location.state.carName);
  const [seats, setSeats] = useState(location.state.seats);
  const [email, setEmail] = useState(location.state.email);
  const [contact, setContact] = useState(location.state.contact);
  const [message, setMessage] = useState(location.state.message);

  async function handleUpdateCar(e) {
    e.preventDefault();

    try {
      const token = await localStorage.getItem("@caroster:token");
      await api.put(
        `/user/car/${location.state.carId}`,
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
      console.log("ERROR", error.response.data.error);
    }
  }

  async function deleteUserCar(e) {
    e.preventDefault();
    try {
      const token = await localStorage.getItem("@caroster:token");
      await api.delete(`/user/car/${location.state.carId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      history.push("/user");
    } catch (error) {
      console.log(error);
    }
  }

  function goBack() {
    history.goBack();
  }

  return (
    <div className="container mt-5">
      <form onSubmit={handleUpdateCar} data-toggle="validator">
        <div className="d-flex justify-content-center">
          <div className="card" style={{ width: "50rem" }}>
            <div className="card-body">
              <div className="row d-flex justify-content-between">
                <div></div>
                <div>
                  <h3 className="text-center mt-3">{carName}</h3>
                </div>
                <div>
                  <MDBIcon
                    onClick={deleteUserCar}
                    style={{ cursor: "pointer" }}
                    size="2x"
                    className="red-text mr-3 align-self-center"
                    icon="trash-alt"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-12 col-md-6">
                  <MDBInput
                    label="name"
                    outline
                    type="text"
                    name="name"
                    value={carName.length > 20 ? "" : carName}
                    onChange={(e) => setCarName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-sm-12 col-12 col-md-6">
                  <MDBInput
                    className="w-50"
                    label="sieges"
                    outline
                    type="number"
                    name="seats"
                    value={seats <= 10 && seats}
                    onChange={(e) => setSeats(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="col-sm-12 col-12 col-md-6">
                  <MDBInput
                    className="w-50"
                    label="contact"
                    outline
                    type="text"
                    name="contact"
                    value={contact.length > 20 ? "" : contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
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
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="text-center m-2">
                  <DeleteButton onClick={goBack}>Annuler</DeleteButton>
                </div>
                <div className="text-center m-2">
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

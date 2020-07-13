import React, { useState } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";

import { MDBInput, MDBIcon } from "mdbreact";
import api from "../services/api";
import { Button, DeleteButton } from "../styles";

const CarEdit = (props) => {
  let location = useLocation();
  const history = useHistory();
  const [carName, setCarName] = useState(location.state.carName);
  const [seats, setSeats] = useState(location.state.seats);
  const [contact, setContact] = useState(location.state.contact);
  const [email, setEmail] = useState(location.state.email);
  const [message, setMessage] = useState(location.state.message);
  const [address, setAddress] = useState(location.state.address);
  const [date, setDate] = useState(location.state.date);
  const [time, setTime] = useState(location.state.time);
  const user = JSON.parse(localStorage.getItem("@caroster:user"));

  async function handleEditCar(e) {
    e.preventDefault();
    try {
      await api.put(`/event/car/${location.state.carId}`, {
        carName,
        seats,
        contact,
        email,
        message,
        address,
        date,
        time,
      });
      history.push(`/event/${location.state.eventId}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteCar(e) {
    e.preventDefault();
    try {
      const token = await localStorage.getItem("@caroster:token");

      await api.delete(`/event/car/${location.state.carId}`);

      if (user) {
        await api.delete(`/user/${location.state.eventId}/passengerInEvent`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      history.push(`/event/${location.state.eventId}`);
    } catch (error) {
      console.log(error);
    }
  }

  function goBack() {
    history.goBack();
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className="card mt-5" style={{ width: "50rem" }}>
          <form onSubmit={handleEditCar} data-toggle="validator">
            <div className="card-body p-5">
              <div className="row d-flex justify-content-between d-flex align-items-center mb-3">
                <div></div>
                <div className="text-center mt-2">
                  <h3>Paramètres de la voiture</h3>
                </div>
                <div>
                  <MDBIcon
                    onClick={handleDeleteCar}
                    style={{ cursor: "pointer" }}
                    size="2x"
                    className="red-text align-self-center"
                    icon="trash-alt"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-6">
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
                <div className="col-sm-12 col-md-4">
                  <MDBInput
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
                <div className="col-sm-12 col-md-6">
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
                <div className="col-sm-12 col-md-4">
                  <MDBInput
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
                <div className="col-sm-12 col-md-6">
                  <MDBInput
                    label="message"
                    outline
                    type="text"
                    name="message"
                    value={message.length > 25 ? "" : message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className="col-sm-12 col-md-6">
                  <MDBInput
                    label="address"
                    outline
                    type="text"
                    name="address"
                    value={address.length > 30 ? "" : address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 col-md-4">
                  <MDBInput
                    outline
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="col-sm-12 col-md-2"></div>
                <div className="col-sm-12 col-md-4">
                  <MDBInput
                    label="time"
                    outline
                    type="time"
                    name="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarEdit;

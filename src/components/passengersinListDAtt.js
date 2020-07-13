import React, { useState } from "react";

import { MDBIcon } from "mdbreact";
import api from "../services/api";
import EditPassengerWaitingList from "./editPassengerWaitingList";

const PassengerInListDAtt = (props) => {
  const [showEditPassenger, setShowEditPassenger] = useState(false);
  const [passengerEdit, setPassengerEdit] = useState([]);

  async function addPassengerInCar(value, idPassenger) {
    try {
      const passengerWait = props.passengers.find(
        (passenger) => passenger._id === idPassenger
      );
      const oneCar = props.cars.filter((car) => car._id === value);

      deletePassenger(idPassenger);
      const passgEdit = props.passengers.filter(
        (passg) => passg._id === idPassenger
      );
      setPassengerEdit(passgEdit);

      await api.post(`/event/car/${oneCar[0]._id}/passenger`, {
        name: passengerWait.name,
      });

      const token = await localStorage.getItem("@caroster:token");
      if (token) {
        await api.post(
          `/user/${props.eventId}/passengerInEvent`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      props.getCars();
    } catch (error) {
      console.log(error);
    }
  }

  function showEditPas(id) {
    const passgEdit = props.passengers.filter((passg) => passg._id === id);
    setPassengerEdit(passgEdit);
    setShowEditPassenger(!showEditPassenger);
  }

  async function deletePassenger(id) {
    try {
      await api.delete(`/event/passengerInEvent/${id}`);
      props.getPassengerInListDattente();
      setShowEditPassenger(false);

      const token = await localStorage.getItem("@caroster:token");
      if (token) {
        await api.delete(`/user/${props.eventId}/passengerInEvent`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function showEdit() {
    setShowEditPassenger(!showEditPassenger);
  }

  return (
    <>
      {showEditPassenger && (
        <EditPassengerWaitingList
          deletePassenger={deletePassenger}
          passengerEdit={passengerEdit}
          showEdit={showEdit}
          getPassengerInListDattente={props.getPassengerInListDattente}
        />
      )}

      {props.passengers.map((nam) => (
        <div
          key={nam._id}
          className="border border-white d-flex align-items-center d-flex justify-content-between"
          style={{ background: "#c3edea", height: "43px" }}
        >
          <div className="ml-3">
            {nam.name.substr(0, 11)}
            <br />
            {nam.name.substr(11)}
          </div>
          <div>
            <div>
              <select
                onChange={(e) => addPassengerInCar(e.target.value, nam._id)}
                className="form-control browser-default custom-select w-100"
              >
                <option>Aller avec</option>
                {props.carPlaces[0].map((placeCar) => (
                  <option value={placeCar._id} key={placeCar._id}>
                    {placeCar.carName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <MDBIcon
              onClick={() => showEditPas(nam._id)}
              className="mr-2"
              icon="pencil-alt"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default PassengerInListDAtt;

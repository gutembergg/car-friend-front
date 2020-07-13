import React, { useState, useEffect } from "react";

import { MDBIcon } from "mdbreact";
import PassengerEdit from "./passengerEdit";
import api from "../services/api";

const PassengerInCar = ({
  passengersCar,
  getPassengerInCar,
  getCars,
  eventId,
}) => {
  const [passengerEdit, setPassengerEdit] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  function showEditPassenger(id) {
    const passgEdit = passengersCar.filter((passg) => passg._id === id);
    setPassengerEdit(passgEdit);
    setShowEdit(!showEdit);
  }

  async function deletePassenger(id) {
    try {
      await api.delete(`/event/passenger/${id}`);
      getCars();
      getPassengerInCar();

      const token = await localStorage.getItem("@caroster:token");
      if (token) {
        await api.delete(`/user/${eventId}/passengerInEvent`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPassengerInCar();
    getCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {showEdit && (
        <PassengerEdit
          passengerEdit={passengerEdit}
          showEditPassenger={() => showEditPassenger()}
          getPassengerInCar={getPassengerInCar}
        />
      )}

      {passengersCar.map((passeng) => (
        <div
          className="border border-white d-flex align-items-center d-flex justify-content-between"
          style={{ background: "#c3edea", height: "40px" }}
          key={passeng._id}
        >
          <div className="ml-3">{passeng.name}</div>
          <div>
            <MDBIcon
              onClick={() => showEditPassenger(passeng._id)}
              icon="pencil-alt"
              style={{ cursor: "pointer" }}
            />
            <MDBIcon
              onClick={() => deletePassenger(passeng._id)}
              className="ml-2 mr-2"
              icon="trash-alt"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PassengerInCar;

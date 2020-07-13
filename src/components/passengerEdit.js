import React, { useState } from "react";

import { MDBInput, MDBIcon, MDBView, MDBMask } from "mdbreact";
import api from "../services/api";

const PassengerEdit = ({ passengerEdit, getPassengerInCar }) => {
  const [name, setName] = useState(passengerEdit[0].name);
  const [showEdit, setShowEdit] = useState(true);

  async function handlePassengerEdit(e) {
    e.preventDefault();
    try {
      await api.put(`/event/car/${passengerEdit[0]._id}/passenger`, {
        name,
      });
      setShowEdit(false);
      getPassengerInCar();
    } catch (error) {
      console.log(error);
    }
  }

  function closeEdit() {
    setShowEdit(!showEdit);
  }

  return (
    <div>
      {showEdit && (
        <form className="needs-validation">
          <div className="row">
            <div className="col-8 ml-2">
              <MDBInput
                size="sm"
                type="text"
                className="ml-1 mt-n3 mb-n3"
                label="name"
                name="name"
                value={name.length > 22 ? "" : name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col-3 d-flex align-items-end mb-2 d-flex justify-content-around">
              <MDBView hover onClick={handlePassengerEdit}>
                <MDBIcon icon="check" className="mr-2" />
                <MDBMask
                  className="flex-center"
                  overlay="white-strong"
                ></MDBMask>
              </MDBView>

              <MDBView hover onClick={closeEdit}>
                <MDBIcon icon="times" />
                <MDBMask
                  className="flex-center"
                  overlay="white-strong"
                ></MDBMask>
              </MDBView>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default PassengerEdit;

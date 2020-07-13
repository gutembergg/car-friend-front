import React, { useState } from "react";

import api from "../services/api";
import { MDBView, MDBIcon, MDBInput, MDBMask } from "mdbreact";

const EditPassengerWaitingList = ({
  passengerEdit,
  showEdit,
  deletePassenger,
  getPassengerInListDattente,
}) => {
  const [name, setName] = useState(passengerEdit[0].name);

  async function editPassenger() {
    try {
      await api.put(`/event/passengerInEvent/${passengerEdit[0]._id}`, {
        name,
      });
      getPassengerInListDattente();
      showEdit();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="row">
      <div className="col-md-9 ml-2">
        <MDBInput
          size="sm"
          type="text"
          className="ml-1 mt-n3 mb-n3"
          label="name"
          name="name"
          value={name.length > 22 ? "" : name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <MDBView hover onClick={editPassenger}>
          <MDBIcon
            icon="check"
            style={{ color: "grey" }}
            className="mt-4 ml-1"
          />
          <MDBMask className="flex-center" overlay="white-strong"></MDBMask>
        </MDBView>
      </div>
      <div>
        <MDBView hover onClick={() => deletePassenger(passengerEdit[0]._id)}>
          <MDBIcon
            icon="trash-alt"
            style={{ color: "grey" }}
            className="mt-4 ml-3"
          />
          <MDBMask className="flex-center" overlay="white-strong"></MDBMask>
        </MDBView>
      </div>
    </div>
  );
};

export default EditPassengerWaitingList;

import React, { useState } from "react";

import { MDBInput, MDBView, MDBIcon, MDBMask } from "mdbreact";
import api from "../services/api";

const AddListDAttente = ({
  eventId,
  getPassengerInListDattente,
  userPassgEvent,
  userPassengerInEvent,
}) => {
  const [name, setName] = useState("");
  const [showAdPassg, setShowAdPassg] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState("");

  const user = JSON.parse(localStorage.getItem("@caroster:user"));

  async function handleAddPassenger(e) {
    e.preventDefault();

    try {
      setIsButtonDisabled("disabled");

      if (name.length === 0) {
        return null;
      }

      if (user) {
        const userPassenger = userPassgEvent.filter(
          (userPass) => userPass._id === eventId
        );
        if (userPassenger.length !== 0) {
          alert("Vous participez déjà de cet évenement");
          return null;
        }
      }

      await api.post(`/event/${eventId}/passenger`, {
        name,
      });
      getPassengerInListDattente();
      userPassengerInEvent();
      setShowAdPassg(!showAdPassg);

      const token = await localStorage.getItem("@caroster:token");
      if (token) {
        await api.post(
          `/user/${eventId}/passengerInEvent`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      setIsButtonDisabled("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {showAdPassg && (
        <form>
          <div className="row">
            <div className="ml-4">
              <MDBInput
                type="text"
                className="ml-1 mt-n2 mb-n3"
                label="name"
                name="name"
                value={name.length > 22 ? "" : name}
                onChange={(e) => setName(e.target.value)}
                disabled={isButtonDisabled}
              />
            </div>
            <div>
              <MDBView
                hover
                onClick={handleAddPassenger}
                className={`${isButtonDisabled}`}
              >
                <MDBIcon
                  icon="check"
                  className="mt-4 ml-4"
                  style={{ color: "grey" }}
                />
                <MDBMask
                  className="flex-center"
                  overlay="white-strong"
                ></MDBMask>
              </MDBView>
            </div>
            <div>
              <MDBView hover onClick={() => setShowAdPassg(!showAdPassg)}>
                <MDBIcon
                  icon="times"
                  style={{ color: "grey" }}
                  className="mt-4 ml-3"
                />
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

export default AddListDAttente;

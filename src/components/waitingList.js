import React, { useState, useEffect } from "react";

import api from "../services/api";
import AddListDAttente from "./addListDAttente";
import PassengerInListDAtt from "./passengersinListDAtt";
import { MDBIcon } from "mdbreact";

const ListDAttente = ({
  eventId,
  carPlaces,
  cars,
  getCars,
  userPassengerInEvent,
  userPassgEvent,
}) => {
  const [showAddPassenger, setShowAddPassenger] = useState(false);
  const [passengers, setPassengers] = useState([]);

  async function getPassengerInListDattente() {
    try {
      const response = await api.get(`/event/${eventId}/passenger`);
      setPassengers(response.data);
      getCars();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPassengerInListDattente();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function showPassgAdd() {
    setShowAddPassenger(!showAddPassenger);
  }

  return (
    <div>
      <div className="card m-4" style={{ width: "18rem" }}>
        <div className="card-header">
          <MDBIcon far icon="list-alt" className="mr-2" />
          Liste d'attente
        </div>
        <div className="">
          <button
            className="list-group-item  border border-white mb-0"
            style={{ width: "100%", background: "#696969", color: "white" }}
            onClick={showPassgAdd}
          >
            <i className="fas fa-user-plus  mr-3" />
            Add Passenger
          </button>
        </div>
        {showAddPassenger && (
          <AddListDAttente
            eventId={eventId}
            getPassengerInListDattente={getPassengerInListDattente}
            userPassgEvent={userPassgEvent}
            userPassengerInEvent={userPassengerInEvent}
          />
        )}
        <PassengerInListDAtt
          getPassengerInListDattente={getPassengerInListDattente}
          getCars={getCars}
          cars={cars}
          eventId={eventId}
          passengers={passengers}
          carPlaces={carPlaces}
        />
      </div>
    </div>
  );
};

export default ListDAttente;

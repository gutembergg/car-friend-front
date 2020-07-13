import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import { MDBIcon } from "mdbreact";
import UserCar from "./userCar";

export default function UserCars() {
  const [userCars, setUserCars] = useState([]);

  async function getCarsUser() {
    try {
      const token = await localStorage.getItem("@caroster:token");

      const response = await api.get("/user/cars", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserCars(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCarsUser();
  }, []);

  return (
    <div>
      <div
        className="row mx-auto d-flex justify-content-around rounded-top"
        style={{ height: "40px", background: "#30475e" }}
      >
        <div className="align-self-center">
          <MDBIcon icon="car-alt" size="2x" className="white-text" />
        </div>
        <div className="align-self-center text-white">Mes voitures</div>
        <div className="align-self-center">
          <Link to="/add_user_cars">
            <button>
              <MDBIcon icon="plus" className="mr-2" />
              <MDBIcon icon="car-side" />
            </button>
          </Link>
        </div>
      </div>
      {userCars.length === 0 ? (
        <div className="mt-3 text-muted">Aucune voiture !</div>
      ) : (
        <UserCar userCars={userCars} />
      )}
    </div>
  );
}

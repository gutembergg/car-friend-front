import React from "react";
import { Link } from "react-router-dom";

import { MDBIcon } from "mdbreact";

export default function UserCar(props) {
  return (
    <div>
      <div className="row mx-auto">
        {props.userCars.map((car) => (
          <div
            key={car._id}
            className="card mt-3 mx-auto"
            style={{ width: "18rem" }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-start mb-2">
                <div className="ml-4">
                  <MDBIcon icon="car-side" />
                </div>
                <div className="ml-4">
                  {car.carName.substr(0, 16)}
                  <br />
                  {car.carName.substr(16)}
                </div>
                <div className="ml-auto">
                  <Link
                    to={{
                      pathname: "/updateUserCar",
                      state: {
                        carId: car._id,
                        carName: car.carName,
                        seats: car.seats,
                        email: car.email,
                        contact: car.contact,
                        message: car.message,
                      },
                    }}
                  >
                    <MDBIcon icon="pencil-alt" className="blue-grey-text" />
                  </Link>
                </div>
              </div>
              <div className="d-flex justify-content-start mb-2">
                <div className="ml-4">
                  <MDBIcon icon="chair" className="mr-3" />
                </div>
                <div className="ml-4">{car.seats}</div>
              </div>
              <div className="d-flex justify-content-start mb-2">
                <div className="ml-4">
                  <MDBIcon far icon="envelope" />
                </div>
                <div className="ml-4">
                  {car.email.substr(0, 16)}
                  <br />
                  {car.email.substr(16)}
                </div>
              </div>
              <div className="d-flex justify-content-start mb-2">
                <div className="ml-4">
                  <MDBIcon icon="phone-alt" />
                </div>
                <div className="ml-4">{car.contact}</div>
              </div>
              <div className="d-flex justify-content-start mb-2">
                <div className="ml-4">
                  <MDBIcon far icon="comment-alt" />
                </div>
                <div className="ml-4">{car.message}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

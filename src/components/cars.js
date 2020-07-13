import React, { useEffect } from 'react'

import EventCars from '../components/eventCars';


 function Cars(props) {

useEffect(() => {
    props.getCars();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
 
    return (
        <div className="row">
            {props.cars.map(car => (
               <div className="m-2 mx-auto" key={car._id}>  
                <EventCars
                    carId={car._id}
                    carName={car.carName}
                    seats={car.seats}
                    contact={car.contact}
                    email={car.email}
                    address={car.address}
                    message={car.message}
                    date={car.date}
                    time={car.time}
                    eventId={props.eventId}
                    carFreePlace={props.carFreePlace}
                    carPlaces={props.carPlaces}
                    cars={props.cars}
                    getCars={props.getCars}
                    userPassEvent={props.userPassgEvent}
                    userPassengerInEvent={props.userPassengerInEvent}
                    userEvents={props.userEvents}
                />
               </div>
            ))}
        </div>
        
    )
}


export default Cars;

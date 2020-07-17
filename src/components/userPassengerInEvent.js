import React from "react";
import { useHistory } from "react-router-dom";

export default function UserPassengerInEvent({
    userEvent,
    eventsUser,
    userEventsLength,
    eventName,
}) {
    let history = useHistory();

    function userPassenger(id) {
        history.push(`/event/${id}`);
    }

    return (
        <div className="card">
            <div
                className="card-header text-white list-group list-group-flush"
                style={{ height: "40px", background: "#c1a57b" }}
            >
                {eventsUser}
            </div>
            {userEventsLength === 0 ? (
                <div className="p-2 text-muted bg-light">{eventName}</div>
            ) : (
                userEvent.map(event => (
                    <div
                        style={{ cursor: "pointer" }}
                        className="p-2 list-group-item"
                        key={event._id}
                        onClick={() => userPassenger(event._id)}
                    >
                        {event.title}
                    </div>
                ))
            )}
        </div>
    );
}

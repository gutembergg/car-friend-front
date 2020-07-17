import React from "react";

const ButtonAddPassenger = ({ carSeats, showAddPassenger }) => {
    function buttonAdd() {
        const buttonSeats = [];

        for (let i = 0; i < carSeats; i++) {
            buttonSeats.push(
                <button
                    key={i}
                    color="primary"
                    className="list-group-item  border border-white mb-0"
                    style={{ width: "100%", background: "#588da8", color: "white" }}
                    onClick={showAddPassenger}
                >
                    <i className="fas fa-user-plus  mr-3" />
                    Ajouter passager
                </button>
            );
        }
        return buttonSeats;
    }

    return <div>{buttonAdd()}</div>;
};

export default ButtonAddPassenger;

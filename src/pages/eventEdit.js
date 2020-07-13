import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";

import api from "../services/api";
import { Button, DeleteButton } from "../styles";
import { MDBIcon, MDBInput } from "mdbreact";

const EventEdit = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [title, setTitle] = useState(location.state.event.title);
  const [email, setEmail] = useState(location.state.event.email);

  async function deleteEvent() {
    try {
      await api.delete(`/event/${props.match.params.id}`);

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEvent(e) {
    e.preventDefault();

    try {
      await api.put(`/event/${props.match.params.id}/edit`, {
        title,
        email,
      });
      goBack();
    } catch (error) {
      console.log(error);
    }
  }

  function goBack() {
    history.push(`/event/${props.match.params.id}`);
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className="card mt-5" style={{ width: "50rem" }}>
          <div className="card-body">
            <div className="d-flex justify-content-between d-flex align-items-center">
              <div className="col-md-3"></div>
              <div className="col-md-4">
                <h3>Paramètres</h3>
              </div>
              <div>
                <MDBIcon
                  style={{ cursor: "pointer" }}
                  size="2x"
                  className="red-text col-md-4"
                  icon="trash-alt"
                  data-toggle="modal"
                  data-target="#myModal"
                />
              </div>

              <div id="myModal" className="modal" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                      >
                        &times;
                      </button>
                      <h4 className="modal-title">Annuler</h4>
                    </div>
                    <div className="modal-body">
                      <p>Attention: "Valider" pour supprimer l'évenement.</p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-default"
                        data-dismiss="modal"
                      >
                        Annuler
                      </button>
                      <button
                        data-dismiss="modal"
                        onClick={deleteEvent}
                        className="btn btn-danger"
                      >
                        Valider
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form
              onSubmit={handleEvent}
              className="p-4"
              data-toggle="validator"
            >
              <div className="row d-flex justify-content-center">
                <div className="col-sm-12 col-md-8">
                  <div>
                    <MDBInput
                      outline
                      label="titre"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      name="name"
                      required
                    />
                  </div>
                  <div>
                    <MDBInput
                      outline
                      label="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="contact"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="m-2">
                  <DeleteButton onClick={goBack}>Annuler</DeleteButton>
                </div>
                <div className="m-2">
                  <Button type="submit">Valider</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventEdit;

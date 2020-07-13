import React, { useState } from "react";
import api from "../services/api";

import { MDBInput } from "mdbreact";
import { Button } from "../styles";

export default function Forgot_password() {
  const [email, setEmail] = useState("");
  const [messageError, setMessageError] = useState("");

  async function handleEmail(e) {
    e.preventDefault();

    try {
      await api.post("/auth/forgot_password", {
        email: email,
      });

      alert(`Un email a été envoyé à ${email}`);
    } catch (error) {
      setMessageError(error.response.data.error);
    }
  }

  return (
    <div className="container">
      <div className="text-center mt-5 mb-4">
        <h2>Entrez votre email pour changer le password</h2>
      </div>
      {!!messageError && (
        <div className="text-center alert alert-danger mx-auto col-md-9">
          {messageError}
        </div>
      )}
      <form onSubmit={handleEmail}>
        <div className="d-flex justify-content-center">
          <div className="card" style={{ width: "50rem" }}>
            <div className="card-body mx-auto col-sm-12 col-md-8">
              <MDBInput
                value={email.length > 40 ? "" : email}
                onChange={(e) => setEmail(e.target.value)}
                label="email"
                outline
                icon="envelope"
                className=""
              />
            </div>
            <div className="mx-auto">
              <Button type="submit" className="mb-3">
                Envoyer
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

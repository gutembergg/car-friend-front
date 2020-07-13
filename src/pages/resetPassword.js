import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";

import { MDBInput } from "mdbreact";
import { Button } from "../styles";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageError, setMessageError] = useState("");
  const history = useHistory();

  async function changePassword(e) {
    e.preventDefault();
    try {
      await api.post(`/auth/reset_password`, {
        email: email,
        password: password,
      });
      history.push("/");
    } catch (error) {
      setMessageError(error.response.data.error);
    }
  }

  return (
    <div className="container">
      <h2 className="text-center mt-4 mb-4">
        Entrez vos données pour changer le password
      </h2>
      <h4>{!!messageError && messageError}</h4>
      <form onSubmit={changePassword} data-toggle="validator">
        <div className="card mx-auto col-sm-12 col-md-6 mt-5">
          <div className="card-body">
            <MDBInput
              label="Email"
              outline
              type="email"
              placeholder="email"
              name="email"
              value={email.length > 40 ? "" : email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <MDBInput
              label="Nouveau mot de passe"
              outline
              type="password"
              placeholder="password"
              name="password"
              value={password.length > 30 ? "" : password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="mx-auto text-center">
              <Button type="submit">Valider</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

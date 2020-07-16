import React from "react";
import { Link } from "react-router-dom";

import { MDBView, MDBMask, MDBContainer, MDBBtn } from "mdbreact";

export default function Home() {
    return (
        <div>
            <MDBView src="https://cap.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcap.2F2018.2F03.2F21.2Fcb986648-35c8-4b05-930f-796b651f246e.2Ejpeg/750x375/background-color/ffffff/quality/70/greve-sncf-et-ratp-vous-pouvez-beneficier-dun-covoiturage-gratuit-pour-aller-au-boulot-1278755.jpg">
                <MDBMask overlay="" className="flex-center flex-column text-white text-center">
                    <MDBContainer className="text-center">
                        <div style={{ color: "#212121" }}>
                            <h1>
                                <strong>Le covoiturage pratique</strong>
                            </h1>
                            <p className="lead mt-4">
                                Ideal pour les vacances, clubs, familles, équipes, tournois et fêtes
                            </p>

                            <p className="mt-5">
                                <Link to="#">
                                    <MDBBtn style={{ borderRadius: "20px" }} outline color="dark">
                                        En Savoir plus
                                    </MDBBtn>
                                </Link>

                                <Link to="/newEvent">
                                    <button
                                        style={{ borderRadius: "20px" }}
                                        className="btn btn-dark"
                                    >
                                        COMMENCER
                                    </button>
                                </Link>
                            </p>
                        </div>
                    </MDBContainer>
                </MDBMask>
            </MDBView>
        </div>
    );
}

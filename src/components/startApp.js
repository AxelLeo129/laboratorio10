import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./startApp.css";
import Container from "./container/Container";

class StartApp extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="global">
          <div className="card card--width">
            <div className="card-header">
              <h5>Laboratorio 10</h5>
              <h6>Memoria Sistemas y Tecnologías Web</h6>
            </div>
            <div className="card-body">
              <h5 className="card-title">Axel Leonardo López Barrera 20768</h5>
              <p className="card-text">
                Calculadora interactiva
              </p>
              <Container />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StartApp;

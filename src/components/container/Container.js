import React, { useState } from "react";
import "./Container.scss";
import { botones } from "../utilities/constants";

const Container = () => {
  const [display, setDisplay] = useState("0");
  const [operacion_global, setOperacion] = useState(null);
  const [operacion_espera, setOperacionEspera] = useState(false);
  const [borrar_resultado, setBorrarResultado] = useState(false);

  const operar = (operacion) => {
    let opeacion_construida =
      operacion_global == null ? display : operacion_global;

    if (operacion_espera || operacion == '=') {
      opeacion_construida = eval(operacion_global + display);
      opeacion_construida = formatPrecision(opeacion_construida);
      setDisplay(opeacion_construida.toString());
    } 

    if (operacion == "+") opeacion_construida += " + ";
    else if (operacion == "*") opeacion_construida += " * ";
    else if (operacion == "/") opeacion_construida += " / ";
    else if (operacion == "-") opeacion_construida += " - ";
    if(operacion == '=') setOperacionEspera(false);
    else setOperacionEspera(true);

    setOperacion(opeacion_construida);
    setBorrarResultado(true);

  };

  const formatPrecision = (number) => {
    let enteros = Math.round(number);
    if(enteros == number) return number;
    let enteros_length = enteros.toString().length;
    return parseFloat(number.toFixed(8 - enteros_length));
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <div className="card card--style">
            <div className="card-body">
              <div className="card screen">
                <p>{display}</p>
              </div>
              <table className="table mt-4">
                <tbody>
                  {botones.map((e, i) => (
                    <tr key={i} style={{ borderColor: "#396B61" }}>
                      {e.map((f, i1) => (
                        <td
                          key={i1}
                          scope="row"
                          style={f.td_style}
                          rowSpan={f.rowspan}
                        >
                          <button
                            onClick={() => {
                              if (
                                display.length < 9 &&
                                typeof f.value == "number"
                              ) {
                                setDisplay(display == "0" || (operacion_espera && borrar_resultado) ? f.value.toString() : display + f.value);
                                setBorrarResultado(false);
                              } else operar(f.value);
                            }}
                            className={`btn ${f.class}`}
                            style={f.buton_style}
                          >
                            {f.label}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Container;

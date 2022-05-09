import React, { useState } from "react";
import "./Container.scss";
import { botones } from "../utilities/constants";

const Container = () => {
  const [display, setDisplay] = useState("0");
  const [operacion_global, setOperacion] = useState(null);
  const [operacion_espera, setOperacionEspera] = useState(false);
  const [borrar_resultado, setBorrarResultado] = useState(false);

  const operar = (operacion) => {
    if(operacion == '.') {
      setDisplay(display + ".");
      return;
    }

    if(operacion == '+/-') {
      if(display.length < 9 && display != '0') {
        setDisplay((parseFloat(display) * -1).toString());
      }
      return;
    }

    let opeacion_construida =
      operacion_global == null ? display : operacion_global;

    if (operacion_espera || (operacion == '=' && operacion_espera)) {
      opeacion_construida = eval(operacion_global + display);
      opeacion_construida = formatPrecision(opeacion_construida);
      setDisplay(opeacion_construida.toString());
      if(opeacion_construida.toString() == 'ERROR') {
        setOperacionEspera(false);
        setBorrarResultado(false);
        setOperacion(null);
        return;
      }
    } 

    if (operacion == "+") opeacion_construida += " + ";
    else if (operacion == "*") opeacion_construida += " * ";
    else if (operacion == "/") opeacion_construida += " / ";
    else if (operacion == "-") opeacion_construida += " - ";
    else if (operacion == "%") opeacion_construida += " % ";
    if(operacion == '=') setOperacionEspera(false);
    else setOperacionEspera(true);

    setOperacion(opeacion_construida.toString() == '0' ? null : opeacion_construida.toString());
    setBorrarResultado(true);

  };

  const formatPrecision = (number) => {
    if(number.toString().length > 9) {
      return 'ERROR';
    }
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
                                (display.length < 9 || borrar_resultado) &&
                                typeof f.value == "number"
                              ) {
                                setDisplay(display == 'ERROR' || display == "0" || (operacion_espera && borrar_resultado) ? f.value.toString() : display + f.value);
                                setBorrarResultado(false);
                              } else if(typeof f.value != "number" && display != 'ERROR') operar(f.value);
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

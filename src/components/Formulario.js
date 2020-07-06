import React, { useState } from "react";
import styled from "@emotion/styled";
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from "../helper";
import PropTypes from "prop-types";

const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: "center";
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`;

const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Button = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  margin-top: 2rem;
  transition: background-color 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: #26c6da;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const Formulario = ({ setResumen, setCargando }) => {
  const [datos, guardarDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });

  const [error, setError] = useState(false);

  // valores del state
  const { marca, year, plan } = datos;

  // leer datos del formulario y guardarlos en el state
  const obtenerInformacion = (e) => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  // cuando el usuario presiona submit
  const cotizarSeguro = (e) => {
    e.preventDefault();
    if (!marca.trim() || !year.trim() || !plan.trim()) {
      setError(true);
      return;
    }

    setError(false);

    // una base de 2000
    let resultado = 2000;

    // obtener la diferencia de años
    const diferencia = obtenerDiferenciaYear(year);

    // por cada año hay que restar el 3%
    resultado -= (diferencia * 3 * resultado) / 100;

    // incremeto americano 15%, asiatico 5%, europeo 30%
    resultado = calcularMarca(marca) * resultado;

    // plan basico 20%, completo 50%
    const incrementoPlan = obtenerPlan(plan);
    // total
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

    setCargando(true);

    setTimeout(() => {
      setCargando(false);
      setResumen({
        cotizacion: Number(resultado),
        datos,
      });
    }, 2500);
  };

  return (
    <form onSubmit={cotizarSeguro}>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <Campo>
        <Label>Marca </Label>
        <Select name="marca" value={marca} onChange={obtenerInformacion}>
          <option value=""> Seleccione una marca</option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiatico</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Año </Label>
        <Select name="year" value={year} onChange={obtenerInformacion}>
          <option value="">-- Seleccione --</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Plan</Label>
        <InputRadio
          type="radio"
          name="plan"
          value="basico"
          defaultChecked={plan === "basico"}
          onChange={obtenerInformacion}
        />{" "}
        Básico
        <InputRadio
          type="radio"
          name="plan"
          value="completo"
          defaultChecked={plan === "completo"}
          onChange={obtenerInformacion}
        />{" "}
        Completo
      </Campo>
      <Button type="submit">Cotizar</Button>
    </form>
  );
};

Formulario.propTypes = {
  setResumen: PropTypes.func.isRequired,
  setCargando: PropTypes.func.isRequired,
};

export default Formulario;

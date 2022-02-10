import { Link } from "react-router-dom";
import React, { useState, useReducer } from "react";
import PremisesForm from "./PremisesForm";
import Table from "../layout/Table";

const premisesListReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((premises) => premises.id !== action.payload);
    case "SET_ALL":
      return action.payload;
    case "CLEAR_ALL":
      return [];
    default:
      return state;
  }
};

const PremisesPage = (props) => {
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [premisesList, dispatch] = useReducer(premisesListReducer, []);

  const handleAddPremises = (premises) => {
    dispatch({ type: "ADD", payload: premises });
  };

  let table = null;

  if (premisesList.length > 0) {
    const headJsx = <tr>
        <th scope="col">Lokalnamn</th>
        <th scope="col">Gatuaddress</th>
        <th scope="col">Postnummer</th>
        <th scope="col">Stad</th>
        <th scope="col">Åtgärder</th>
    </tr>
    const bodyJsx = premisesList.map((premises) => {
      return (
        <tr className="align-middle" id={premises.id}>
          <td>{premises.name}</td>
          <td>{premises.address.streetAddress}</td>
          <td>{premises.address.zipCode}</td>
          <td>{premises.address.city}</td>
          <td>
            <div className="d-flex gap-1">
              <button className="btn btn-sm btn-primary">Update</button>
              <button className="btn btn-sm btn-primary">Details</button>
              <button onClick={() => dispatch({type: "REMOVE", payload: premises.id})} className="btn btn-sm btn-danger">Delete</button>
            </div>
          </td>
        </tr>
      );
    });

    table = <Table className="table-hover" thead={headJsx} tbody={bodyJsx}/>
  }

  return (
    <div className="card mt-5">
      <div className="d-flex justify-content-between card-header">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link active" to="/">Hem</Link>
          </li>
        </ul>
        <div>
          <button
            className="btn btn-success"
            onClick={() => setFormIsVisible(!formIsVisible)}
          >
            {!formIsVisible ? "Ny Lokal" : "Dölj formulär"}
          </button>
        </div>
      </div>
      <div className="card-body">
        {formIsVisible && (
          <PremisesForm handleAddPremises={handleAddPremises} />
        )}
      </div>

      <div className="card-body">
          {table ? table : <p className="text-center">Skapa en lokal</p>}
      </div>
    </div>
  );
};

export default PremisesPage;

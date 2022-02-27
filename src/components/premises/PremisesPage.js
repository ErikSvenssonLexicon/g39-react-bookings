import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removePremises,
  addPremises,
} from "../redux/reducers/premisesListSlice";
import { Modal } from "bootstrap";
import { PremisesForm } from "./PremisesForm";
import ModalDisplay from "../layout/ModalDisplay";
import Table from "../layout/Table";
import { findAllPremisesAction } from "../redux/actions/premisesListActions";
import Spinner from "../layout/Spinner";

const PremisesPage = () => {
  const dispatch = useDispatch();
  const { premisesList, isLoading } = useSelector(
    (state) => state.premisesListState
  );
  const [modal, setModal] = useState(null);
  const exampleModal = useRef();

  useEffect(() => {

    setModal(new Modal(exampleModal.current));
      if(!isLoading){
          if(premisesList && premisesList.length === 0){
              dispatch(findAllPremisesAction());
          }
      }

  }, [dispatch, premisesList, isLoading]);

  const handleAddPremises = (premises) => {
    dispatch(addPremises(premises));
  };

  let table = null;

  if (premisesList.length > 0) {
    const headJsx = (
      <tr key={"table-columns"}>
        <th scope="col">Lokalnamn</th>
        <th scope="col">Gatuaddress</th>
        <th scope="col">Postnummer</th>
        <th scope="col">Stad</th>
        <th scope="col">Åtgärder</th>
      </tr>
    );
    const bodyJsx = premisesList.map((premises) => {
      return (
        <tr className="align-middle" id={premises.id} key={premises.id}>
          <td>{premises.name}</td>
          <td>{premises.address.streetAddress}</td>
          <td>{premises.address.zipCode}</td>
          <td>{premises.address.city}</td>
          <td>
            <div className="d-flex gap-1">
              <Link
                className="btn btn-sm btn-primary"
                to={`premises/${premises.id}`}
              >
                Visa
              </Link>
              <button
                onClick={() => dispatch(removePremises(premises.id))}
                className="btn btn-sm btn-danger"
              >
                Radera
              </button>
            </div>
          </td>
        </tr>
      );
    });
    table = <Table className="table-hover" thead={headJsx} tbody={bodyJsx} />;
  }

  return (
    <div className="card mt-5">
      <div className="d-flex justify-content-between card-header">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              Hem
            </Link>
          </li>
        </ul>
        <div className="d-flex gap-2">
          <button className="btn btn-success" onClick={() => modal.show()}>
            Skapa ny lokal
          </button>
            <button className="btn btn-primary" onClick={() => dispatch(findAllPremisesAction())}>
                Uppdatera ⟳
            </button>
        </div>
      </div>

      <div className="card-body">
        <ModalDisplay ref={exampleModal} modal={modal}>
          <PremisesForm handleAddPremises={handleAddPremises}/>
        </ModalDisplay>

        {!isLoading && table ? (
          table
        ) : (
          <p className="text-center">Skapa en lokal</p>
        )}
        {isLoading && <Spinner />}
      </div>
    </div>
  );
};

export default PremisesPage;

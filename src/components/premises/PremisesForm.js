import React, { useEffect, useState } from "react";
import {addNewPremisesAction} from "../redux/actions/formActions";
import { resetState } from "../redux/reducers/httpRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import FieldErrorMessage from "../FieldErrorMessage";
import Spinner from "../layout/Spinner";

export const PremisesForm = (props) => {
  const dispatch = useDispatch();
  const { isLoading, error, fieldErrors, object } = useSelector(
    (state) => state.httpRequestState
  );

  const [name, setName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  useEffect(() => {
    if(object){
      props.handleAddPremises(object)
      dispatch(resetState());
      props.closeModal();

      return () => {
        setName("");
        setStreetAddress("");
        setZipCode("");
        setCity("")
      }
    }
  },[object, props, dispatch])

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const premises = {
      name: name,
      address: {
        streetAddress: streetAddress,
        zipCode: zipCode,
        city: city,
      },
    };
    dispatch(addNewPremisesAction({ premises }));
  };

  const onResetHandler = (e) => {
    e.preventDefault();
    dispatch(resetState());
    setZipCode("");
    setCity("");
    setName("");
    setStreetAddress("");
  };

  return (
    <React.Fragment>
      {isLoading && <Spinner />}
      {error && <p className="text-center text-danger">{error}</p>}
      <form onSubmit={onSubmitHandler}>
        <div className="form-floating mb-2">
          <input
            value={name}
            className={`form-control ${
              fieldErrors && fieldErrors["name"] ? "is-invalid" : ""
            }`}
            type="text"
            id="name"
            onChange={(e) => setName((oldState) => e.target.value)}
          />
          <label htmlFor="name">Namn på lokal:</label>
          <FieldErrorMessage fieldErrors={fieldErrors} field="name" />
        </div>
        <div className="form-floating mb-2">
          <input
            className={`form-control ${
              fieldErrors && fieldErrors["address.streetAddress"]
                ? "is-invalid"
                : ""
            }`}
            type="text"
            id="streetAddress"
            value={streetAddress}
            onChange={(e) => setStreetAddress((oldState) => e.target.value)}
          />
          <label htmlFor="streetAddress">Gatuadress:</label>
          <FieldErrorMessage
            fieldErrors={fieldErrors}
            field="address.streetAddress"
          />
        </div>
        <div className="row g-2 mb-2">
          <div className="col-md form-floating">
            <input
              className={`form-control ${
                fieldErrors && fieldErrors["address.zipCode"]
                  ? "is-invalid"
                  : ""
              }`}
              type="text"
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode((old) => e.target.value)}
            />
            <label htmlFor="zipCode">Postnummer:</label>
            <FieldErrorMessage
              fieldErrors={fieldErrors}
              field="address.zipCode"
            />
          </div>
          <div className="col-md form-floating">
            <input
              className={`form-control ${
                fieldErrors && fieldErrors["address.city"] ? "is-invalid" : ""
              }`}
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity((old) => e.target.value)}
            />
            <label htmlFor="city">Postort:</label>
            <FieldErrorMessage fieldErrors={fieldErrors} field="address.city" />
          </div>
        </div>
        <div className="d-grid g-2 gap-2">
          <button type="submit" className="btn btn-success">
            Skicka
          </button>
          <button
            type="reset"
            className="btn btn-danger"
            onClick={onResetHandler}
          >
            Återställ
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

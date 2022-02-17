import React, { useState, useEffect, useRef } from "react";
import { updatePremises } from "../api/apiService";
import FieldErrorMessage from "../FieldErrorMessage";

export const PremisesUpdateForm = React.forwardRef(
  ({ modal, _premises, handleSetUpdatedPremises }, ref) => {
    
    const backup = useRef();
    const [premises, setPremises] = useState(_premises);
    const [errorMessage, setErrorMessage] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [isSubmit, setSubmit] = useState(false);

    useEffect(() => {
      console.log(_premises)
      backup.current = _premises;
      setPremises(backup.current);
    },[_premises])

    useEffect(() => {
      if (isSubmit && premises) {
        updatePremises(premises).then((data) => {
          if (data.error && data.error === "BAD_REQUEST") {
            setErrorMessage((oldState) => {
              return data.message;
            });
            if (data.errors) {
              setFieldErrors((oldState) => data.errors);
              console.log(fieldErrors);
            }
          } else {
            console.log(data);
            setErrorMessage("");
            setFieldErrors({});
            backup.current = null;
            setPremises({
              name: "",
              address: {
                streetAddress: "",
                zipCode: "",
                city: "",
              },
            });
            handleSetUpdatedPremises(data);
            modal.hide();
          }
        });
      }
      return () => {
        setSubmit(false);
      };
    }, [isSubmit, premises, fieldErrors, handleSetUpdatedPremises, modal]);

    return (
      <div className="modal" ref={ref} tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Uppdatera lokal</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => modal.hide()}
              > </button>
            </div>
            <div className="modal-body">
              {errorMessage && (
                <p className="text-center text-danger">{errorMessage}</p>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmit(true);
                }}
                onReset={(e) => {
                  e.preventDefault();
                  setPremises(backup.current);
                  setErrorMessage("");
                  setFieldErrors({});
                }}
              >
                <div className="form-floating mb-2">
                  <input
                    value={premises.name}
                    className={`form-control ${
                      fieldErrors && fieldErrors["name"] ? "is-invalid" : ""
                    }`}
                    type="text"
                    id="name"
                    onChange={(e) =>
                      setPremises((oldState) => {
                        return {
                          ...oldState,
                          name: e.target.value,
                        };
                      })
                    }
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
                    value={premises.address.streetAddress}
                    onChange={(e) =>
                      setPremises((oldState) => {
                        return {
                          ...oldState,
                          address: {
                            ...oldState.address,
                            streetAddress: e.target.value,
                          },
                        };
                      })
                    }
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
                      value={premises.address.zipCode}
                      onChange={(e) =>
                        setPremises((oldState) => {
                          return {
                            ...oldState,
                            address: {
                              ...oldState.address,
                              zipCode: e.target.value,
                            },
                          };
                        })
                      }
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
                        fieldErrors && fieldErrors["address.city"]
                          ? "is-invalid"
                          : ""
                      }`}
                      type="text"
                      id="city"
                      value={premises.address.city}
                      onChange={(e) =>
                        setPremises((oldState) => {
                          return {
                            ...oldState,
                            address: {
                              ...oldState.address,
                              city: e.target.value,
                            },
                          };
                        })
                      }
                    />
                    <label htmlFor="city">Postort:</label>
                    <FieldErrorMessage
                      fieldErrors={fieldErrors}
                      field="address.city"
                    />
                  </div>
                </div>
                <div className="d-grid g-2 gap-2">
                  <button type="submit" className="btn btn-success">
                    Skicka
                  </button>
                  <button type="reset" className="btn btn-danger">
                    Återställ
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => modal.hide()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

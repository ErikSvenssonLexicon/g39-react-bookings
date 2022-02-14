import React, { useState, useEffect } from "react";
import { postBooking } from "../api/apiService";

const initialErrorState = {
  errorMessage: null,
  fieldErrors: {}
}

const BookingForm = React.forwardRef(
  ({ premisesId, handleAddBooking, modal }, ref) => {
    const [booking, setBooking] = useState({
      vaccineType: "",
      dateTime: "",
      price: "",
    });
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState(initialErrorState);

    useEffect(() => {
      if (submit) {
        postBooking(premisesId, booking).then((data) => {
          if (data.status >= 400) {
            setError((old) => {
              return {
                ...old,
                errorMessage: data.message,
              };
            });
            if (data.errors) {
              setError((old) => {
                return {
                  ...old,
                  fieldErrors: data.errors,
                };
              });
            }
          } else {
            setBooking({
              vaccineType: "",
              dateTime: "",
              price: "",
            });
            setError(initialErrorState);
            handleAddBooking(data);            
            modal.hide();
          }
        });
      }
      return () => {
        setSubmit(false);  
      };
    }, [submit, booking, handleAddBooking, modal, premisesId]);
    
    const handleVaccineChange = (e) => {
      setBooking((prevState) => {
        return {
          ...prevState,
          vaccineType: e.target.value,
        };
      });
    };

    const handleDateTimeChange = (e) => {
      setBooking((prevState) => {
        return {
          ...prevState,
          dateTime: e.target.value,
        };
      });
    };

    const handlePriceChange = (e) => {
      setBooking((prevState) => {
        return {
          ...prevState,
          price: e.target.value,
        };
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmit(true);
    };

    const handleReset = (e) => {
      e.preventDefault();
      setBooking({
        vaccineType: "",
        dateTime: "",
        price: "",
      });
      setError(initialErrorState)
    };

    return (
      <div className="modal" ref={ref} tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Ny bokning:</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => modal.hide()}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="form-floating mb-2">
                  <input
                    className={`form-control ${
                      error.fieldErrors.vaccineType ? "is-invalid" : ""
                    }`}
                    type="text"
                    id="vaccine"
                    onChange={handleVaccineChange}
                    value={booking.vaccineType}
                  />
                  <label htmlFor="vaccine">Vaccin:</label>
                  <small className="text-danger">
                    {error.fieldErrors.vaccineType &&
                      error.fieldErrors.vaccineType.join(",")}
                  </small>
                </div>
                <div className="row g-2 mb-2">
                  <div className="col-md form-floating">
                    <input
                      className={`form-control ${
                        error.fieldErrors.dateTime ? "is-invalid" : ""
                      }`}
                      type="datetime-local"
                      id="dateTime"
                      onChange={handleDateTimeChange}
                      value={booking.dateTime}
                    />
                    <label htmlFor="dateTime">Datum och tid:</label>
                    <small className="text-danger">
                      {error.fieldErrors.dateTime &&
                        error.fieldErrors.dateTime.join(",")}
                    </small>
                  </div>
                  <div className="col-md form-floating">
                    <input
                      className={`form-control ${
                        error.fieldErrors.price ? "is-invalid" : ""
                      }`}
                      type="number"
                      id="price"
                      min="0"
                      step="0.01"
                      onChange={handlePriceChange}
                      value={booking.price}
                    />
                    <label htmlFor="price">Pris SEK:</label>
                    <small className="text-danger">
                      {error.fieldErrors.price &&
                        error.fieldErrors.price.join(",")}
                    </small>
                  </div>
                </div>
                <div className="d-grid g-2 gap-2">
                  <button type="submit" className="btn btn-success">
                    Skapa
                  </button>
                  <button type="reset" className="btn btn-success">
                    Rensa
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

export default BookingForm;

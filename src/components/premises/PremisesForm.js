import React, { useEffect, useState } from "react";
import { addNewPremisesAction } from "../redux/actions/formActions";
import { resetState } from "../redux/reducers/httpRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import FloatingFormGroup from "../layout/FloatingFormGroup";
import FloatingInput from "../layout/FloatingInput";

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
    if (object) {
      props.handleAddPremises(object);
      dispatch(resetState());
      props.closeModal();

      return () => {
        setName("");
        setStreetAddress("");
        setZipCode("");
        setCity("");
      };
    }
  }, [object, props, dispatch]);

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
        <FloatingFormGroup className="mb-2">
          <FloatingInput
            label="Namn på lokal:"
            field="name"
            fieldErrors={fieldErrors}
            input={{
              id: "name",
              type: "text",
              value: name,
              onChange: (e) => setName(e.target.value),
            }}
          />
        </FloatingFormGroup>
        <FloatingFormGroup className="mb-2">
          <FloatingInput
            label="Gatuadress:"
            field="address.streetAddress"
            fieldErrors={fieldErrors}
            input={{
              id: "streetAddress",
              type: "text",
              value: streetAddress,
              onChange: (e) => setStreetAddress(e.target.value),
            }}
          />
        </FloatingFormGroup>
        <div className="row g-2 mb-2">
          <FloatingFormGroup className="col-md">
            <FloatingInput
              label="Postnummer:"
              field="address.zipCode"
              fieldErrors={fieldErrors}
              input={{
                id: "zipCode",
                type: "text",
                value: zipCode,
                onChange: (e) => setZipCode(e.target.value),
              }}
            />
          </FloatingFormGroup>

          <FloatingFormGroup className="col-md">
            <FloatingInput
              label="Postort:"
              field="address.city"
              fieldErrors={fieldErrors}
              input={{
                id: "city",
                type: "text",
                value: city,
                onChange: (e) => setCity(e.target.value),
              }}
            />
          </FloatingFormGroup>
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

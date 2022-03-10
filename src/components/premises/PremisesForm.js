import React, { useEffect, useReducer } from "react";
import { addNewPremisesAction, updatePremisesAction } from "../redux/actions/formActions";
import { resetState } from "../redux/reducers/httpRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import FloatingFormGroup from "../layout/FloatingFormGroup";
import FloatingInput from "../layout/FloatingInput";
import premisesReducer,{initialState} from "../reducers/premisesReducer";

export const PremisesForm = (props) => {
  let _premises = props._premises ? props._premises : initialState;
  const dispatch = useDispatch();
  const { isLoading, error, fieldErrors, object } = useSelector(
    (state) => state.httpRequestState)

  const [premises, premisesDispatch] = useReducer(premisesReducer, _premises)


  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  useEffect(() => {
    if (object) {
        if(props.method === "put"){
            props.handleSetUpdatedPremises(object);
        }
        if(props.method === "post"){
            props.handleAddPremises(object);
        }
      dispatch(resetState());
      props.closeModal();

      return () => {premisesDispatch({
        type: "SET_PREMISES", payload: null
      })}
    }
  }, [object, props, dispatch, premisesDispatch]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(props.method === "post"){
      dispatch(addNewPremisesAction({premises}));
    }
    if(props.method === "put"){
      dispatch(updatePremisesAction({premises}));
    }
  };

  const onResetHandler = (e) => {
    e.preventDefault();
    dispatch(resetState());
    let payload = null;
    if(props.method === "post"){
      payload = initialState;
    }else if(props.method === "put"){
      payload = props._premises;
    }
    premisesDispatch({type: "SET_PREMISES", payload: payload})
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
              value: premises.name,
              onChange: (e) => premisesDispatch({type: "SET_NAME", payload: e.target.value})
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
              value: premises.address.streetAddress,
              onChange: (e) => premisesDispatch({type: "SET_STREET_ADDRESS", payload: e.target.value})
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
                value: premises.address.zipCode,
                onChange: (e) => premisesDispatch({type: "SET_ZIP_CODE", payload: e.target.value}),
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
                value: premises.address.city,
                onChange: (e) => premisesDispatch({type: "SET_CITY", payload: e.target.value}),
              }}
            />
          </FloatingFormGroup>
        </div>
        <div className="d-grid g-2 gap-2">
          <button type="submit" className="btn btn-success">
            {props.method === "post" ? "Skapa" : "Uppdatera"}
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

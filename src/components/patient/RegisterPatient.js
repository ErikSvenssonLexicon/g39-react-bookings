import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FloatingFormGroup from "../layout/FloatingFormGroup";
import FloatingInput from "../layout/FloatingInput";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import { resetState } from "../redux/reducers/httpRequestSlice";
import Spinner from "../layout/Spinner";
import {newPatientAction} from "../redux/actions/formActions";

const initialAppUserState = {
    username: "",
    password: "",
    passwordConfirm: ""
}

const initialPatientState = {
    pnr: "",
    firstName: "",
    lastName: "",
    birthDate: ""
}

const initialContactState = {
    email: "",
    phone: ""
}

const RegisterPatient = (props) => {
  const dispatch = useDispatch();

  const { isLoading, error, fieldErrors, object } = useSelector(
    (state) => state.httpRequestState
  );
  const history = useHistory();

  const [appUser, setAppUser] = useState(initialAppUserState);
  const [patient, setPatient] = useState(initialPatientState);
  const [contact, setContact] = useState(initialContactState);
  const [passwordConfirmErrors, setPasswordConfirmErrors] = useState(null)

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  useEffect(() => {
    if (object) {
      dispatch(resetState());
      history.push("/login");
      return () => {
          setAppUser(initialAppUserState);
          setPatient(initialPatientState);
          setContact(initialContactState);
          setPasswordConfirmErrors(null)
      }
    }
  }, [history, object, dispatch]);

  const onAppUserChange = (e, field) => {
    switch (field) {
      case "password":
        setAppUser((prevState) => {
          return {
            ...prevState,
            password: e.target.value,
          };
        });
        break;
      case "username":
        setAppUser((prevState) => {
          return {
            ...prevState,
            username: e.target.value,
          };
        });
        break;
      case "passwordConfirm":
        setAppUser((prevState) => {
          return {
            ...prevState,
            passwordConfirm: e.target.value,
          };
        });
        break;
      default:
    }
  };

  const onPatientChange = (e, field) => {
    switch (field) {
      case "pnr":
        setPatient((oldState) => {
          return {
            ...oldState,
            pnr: e.target.value,
          };
        });
        break;
      case "firstName":
        setPatient((oldState) => {
          return {
            ...oldState,
            firstName: e.target.value,
          };
        });
        break;
      case "lastName":
        setPatient((oldState) => {
          return {
            ...oldState,
            lastName: e.target.value,
          };
        });
        break;
      case "birthDate":
        setPatient((oldState) => {
          return {
            ...oldState,
            birthDate: e.target.value,
          };
        });
        break;
      default:
    }
  };

  const handleContactInfoChange = (e, field) => {
    switch (field) {
      case "email":
        setContact((oldState) => {
          return {
            ...oldState,
            email: e.target.value,
          };
        });
        break;
      case "phone":
        setContact((oldState) => {
          return {
            ...oldState,
            phone: e.target.value,
          };
        });
        break;
      default:
    }
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      if(appUser.passwordConfirm !== appUser.password){
          setPasswordConfirmErrors("Varning: angiven lösenordsbekräftelse matchar inte lösenordet");
      }else{
          const result = {
              pnr: patient.pnr,
              firstName: patient.firstName,
              lastName: patient.lastName,
              birthDate: patient.birthDate,
              contactInfo : contact,
              userCredentials: appUser
          }
          dispatch(newPatientAction({patient: result}));
      }


  }

  const handleReset = (e) => {
      e.preventDefault();
      setAppUser(initialAppUserState);
      setPatient(initialPatientState);
      setContact(initialContactState);
      setPasswordConfirmErrors(null);
      dispatch(resetState())
  }

  const passwordConfirmOnBlur = () => {
      if(appUser.password !== appUser.passwordConfirm){
          setPasswordConfirmErrors("Varning: angiven lösenordsbekräftelse matchar inte lösenordet")
      }else {
          setPasswordConfirmErrors(null);
      }
  }

  return (
    <div className="card mt-5">
      <div className="card-header">
        <div className="nav d-flex justify-content-between align-items-center text-center">
          <h4 className="m-0">Registrering:</h4>
          <Link className="btn btn-warning btn-large text-white" to="/index">
            Avbryt
          </Link>
        </div>
      </div>
      <div className="card-body">
        {isLoading && <Spinner />}
        {error && <p className="text-center text-danger">{error}</p>}
          {passwordConfirmErrors && <p className="text-center text-danger">{passwordConfirmErrors}</p>}
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <h6 className="card-subtitle mb-2">Inloggningsinformation:</h6>
          <FloatingFormGroup className="mb-2">
            <FloatingInput
              label="Användarnamn:"
              fieldErrors={fieldErrors}
              field="userCredentials.username"
              input={{
                id: "username",
                type: "text",
                value: appUser.username,
                onChange: (e) => onAppUserChange(e, "username"),
              }}
            />
          </FloatingFormGroup>
          <div className="row g-2">
            <FloatingFormGroup className="col-md">
              <FloatingInput
                label="Lösenord:"
                fieldErrors={fieldErrors}
                field="userCredentials.password"
                input={{
                  id: "password",
                  type: "password",
                  value: appUser.password,
                  onChange: (e) => onAppUserChange(e, "password"),
                }}
              />
            </FloatingFormGroup>
            <FloatingFormGroup className="col-md">
              <FloatingInput
                label="Upprepa lösenord:"
                fieldErrors={fieldErrors}
                field={"userCredentials.passwordConfirm"}
                input={{
                  id: "repeat",
                  type: "password",
                  value: appUser.passwordConfirm,
                  onChange: (e) => onAppUserChange(e, "passwordConfirm"),
                    onBlur: passwordConfirmOnBlur
                }}
              />
            </FloatingFormGroup>
          </div>
          <hr />
          <h6 className="card-subtitle mb-2">Patient uppgifter:</h6>
          <div className="row g-2 mb-2">
            <FloatingFormGroup className="col-md">
              <FloatingInput
                label="Personnummer:"
                fieldErrors={fieldErrors}
                field={"pnr"}
                input={{
                  id: "pnr",
                  type: "text",
                  value: patient.pnr,
                  onChange: (e) => onPatientChange(e, "pnr"),
                }}
              />
            </FloatingFormGroup>
            <FloatingFormGroup className="col-md">
              <FloatingInput
                label="Födelsedatum:"
                fieldErrors={fieldErrors}
                field="birthDate"
                input={{
                  id: "birthDate",
                  type: "date",
                  value: patient.birthDate,
                  onChange: (e) => onPatientChange(e, "birthDate"),
                }}
              />
            </FloatingFormGroup>
          </div>
          <div className="row g-2 mb-2">
            <FloatingFormGroup className="col-md">
              <FloatingInput
                label="Tilltalsnamn:"
                fieldErrors={fieldErrors}
                field="firstName"
                input={{
                  id: "firstName",
                  type: "text",
                  value: patient.firstName,
                  onChange: (e) => onPatientChange(e, "firstName"),
                }}
              />
            </FloatingFormGroup>
            <FloatingFormGroup className="col-md">
              <FloatingInput
                label="Efternamn:"
                fieldErrors={fieldErrors}
                field="lastName"
                input={{
                  id: "lastName",
                  type: "text",
                  value: patient.lastName,
                  onChange: (e) => onPatientChange(e, "lastName"),
                }}
              />
            </FloatingFormGroup>
          </div>
          <hr />
          <h6 className="card-subtitle mb-2">Kontaktuppgifter:</h6>

          <div className="row g-2 mb-2">
            <FloatingFormGroup className="col-md">
              <FloatingInput
                label="E-post:"
                fieldErrors={fieldErrors}
                field="contactInfo.email"
                input={{
                  id: "email",
                  type: "email",
                  value: contact.email,
                  onChange: (e) => handleContactInfoChange(e, "email"),
                }}
              />
            </FloatingFormGroup>
            <FloatingFormGroup className="col-md">
              <FloatingInput
                label="Telefon:"
                fieldErrors={fieldErrors}
                field="contactInfo.phone"
                input={{
                  id: "phone",
                  type: "text",
                  value: contact.phone,
                  onChange: (e) => handleContactInfoChange(e, "phone"),
                }}
              />
            </FloatingFormGroup>
          </div>
          <hr />
          <div className="d-grid g-2 gap-2">
            <button type="submit" className="btn btn-success">
              Skicka
            </button>
            <button type="reset" className="btn btn-danger">
              Rensa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPatient;

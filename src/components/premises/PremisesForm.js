import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const PremisesForm = (props) => {
  const [name, setName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");

  const onSubmitHandler = (e) =>{
      e.preventDefault();
      const premises = {
          id: uuidv4(),
          name: name,
          address: {
              id: uuidv4(),
              streetAddress: streetAddress,
              zipCode: zipCode,
              city: city
          }    
      }
      props.handleAddPremises(premises);
      setName("");
      setStreetAddress("");
      setZipCode("");
      setCity("");      
  }

  return (
    <div className="card mt-2">
      <div className="card-body">
        <form onSubmit={onSubmitHandler}>
          <div className="form-floating mb-2">
            <input
              value={name}
              className="form-control"
              type="text"
              id="name"
              onChange={(e) => setName((oldState) => e.target.value)}
            />
            <label htmlFor="name">Namn på lokal:</label>
          </div>
          <div className="form-floating mb-2">
            <input
              className="form-control mb-2"
              type="text"
              id="streetAddress"
              value={streetAddress}
              onChange={(e) => setStreetAddress((oldState) => e.target.value)}
            />
            <label htmlFor="streetAddress">Gatuadress:</label>
          </div>
          <div className="row g-2 mb-2">
            <div className="col-md form-floating">
              <input
                className="form-control"
                type="text"
                id="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode((old) => e.target.value)}
              />
              <label htmlFor="zipCode">Postnummer:</label>
            </div>
            <div className="col-md form-floating">
              <input
                className="form-control"
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity((old) => e.target.value)}
              />
              <label htmlFor="city">Postort:</label>
            </div>
          </div>
          <div className="d-grid g-2 gap-2">
            <button type="submit" className="btn btn-success">
              Skicka
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PremisesForm;

import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { findPremisesById } from "../api/apiService";
import Table from "../layout/Table";

const Premises = (props) => {
  const params = useParams();
  const id = params.id;
  const [premises, setPremises] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    findPremisesById(id).then((data) => {
      if (data.status) {
        setError((old) => data);
      } else {
        setPremises((old) => data);
      }
    });
  }, [id]);

  let table = null;
  if (premises && premises.bookings.length > 0) {
    const headJsx = (
      <tr key="bookings-columns">
        <th scope="col">Tid</th>
        <th scope="col">Pris</th>
        <th scope="col">Vaccin</th>
        <th scope="col">Åtgärder</th>
      </tr>
    );

    const bodyJsx = premises.bookings.map((booking) => {
      return (
        <tr className="align-middle" id={booking.id} key={booking.id}>
          <td>{booking.dateTime}</td>
          <td>{`${booking.price} SEK`}</td>
          <td>{booking.vaccineType}</td>
          <td>
            <div className="d-flex">
              <button className="btn btn-info text-white me-2">Visa</button>
              <button className="btn btn-primary me-2">Ändra</button>
              <button className="btn btn-danger">Ta bort</button>
            </div>
          </td>
        </tr>
      );
    });

    table = <Table className="table-hover" thead={headJsx} tbody={bodyJsx} />;
  }

  return (
    <div className="card mt-5">
      <div className="card-header">
        <div className="nav d-flex justify-content-between align-items-center text-center">
          <div className="d-flex gap-2">
            <button className="btn btn-primary">Uppdatera</button>
          </div>
        </div>
      </div>
      <div className="card-body">
        {premises && (
          <Fragment>
            <h5 className="card-title mb-2">{`Lokal: ${premises.name}`}</h5>
            <hr />
            <h5 className="card-subtitle mb-2">Adress:</h5>
            <p>
              <span>{`${premises.address.streetAddress}, ${premises.address.zipCode}, ${premises.address.city}`}</span>
            </p>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-subtitle">Upplagda tider:</h5>
              <button className="btn btn-success">Skapa bokning</button>
            </div>
            {table ? (
              table
            ) : (
              <p className="text-center">Finns inga bokningar</p>
            )}
          </Fragment>
        )}
        {error && <p className="text-center text-danger">{error.message}</p>}
      </div>
    </div>
  );
};

export default Premises;

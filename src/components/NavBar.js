import { useSelector, useDispatch } from "react-redux";
import NavigationLink from "./layout/NavigationLink";
import { Link } from "react-router-dom";
import { setToken, setIsLoggedIn } from "./redux/reducers/authSlice";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.authState);

  const handleLogOut = () => {
    localStorage.removeItem("booking_user");
    dispatch(setToken({ token: null, userDetails: null }));
    dispatch(setIsLoggedIn(false));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavigationLink text="Lokaler" to="/premises" userDetails={userDetails} />
            <NavigationLink text="Bokningar" to="/bookings" userDetails={userDetails} />
            <NavigationLink text="Patienter" to="/patients" userDetails={userDetails} />
          </ul>
          <div className="d-flex">
            <button className="btn btn-success" onClick={handleLogOut}>
              Logga Ut
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

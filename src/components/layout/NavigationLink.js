import {Link} from "react-router-dom";

const NavigationLink = props => {
    return (
        <li className={`nav-item ${props.className}`}>
            {props.userDetails && props.userDetails.authorities.includes("ADMIN") && (
                <Link className="nav-link" to={props.to}>
                    {props.text}
                </Link>
            )}
        </li>
    )
}

export default NavigationLink;
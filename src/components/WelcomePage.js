import {Link} from "react-router-dom";

const WelcomePage = props =>{
    return (
        <div className="p-5 mb-4 bg-success rounded text-white">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">Immunity Vaccin bokning</h1>
                <p className="col-md-8 fs-4">
                    Välkommna till Immunity vaccin boknings portal. Vi samordnar vaccin boknings tider över hela Sverige
                    och
                    vi lovar dig snabb service oberoende var du bor.
                </p>
                <div className="d-grid gap-3">
                    <Link className="btn btn-primary btn-lg" to="/register">Registrera</Link>
                    <Link className="btn btn-info btn-lg text-white" to="/login">Logga in</Link>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage;
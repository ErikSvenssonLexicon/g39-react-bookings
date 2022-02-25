
const LoginPage = props =>{
    return(
        <div className="d-flex min-vh-100 justify-content-center align-items-center">
            <div className="col-8">
                <div className="card">
                    <div className="card-header">
                        <div className="nav d-flex justify-content-end">
                            <a className="btn btn-primary btn-large">Avbryt</a>
                        </div>
                    </div>
                    <div className="card-body shadow-sm">
                        <h4 className="card-title">Du behöver logga in</h4>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="username" />
                                <label htmlFor="username">Användarnamn</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="password" />
                                <label htmlFor="password">Lösenord</label>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-success">Logga in</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
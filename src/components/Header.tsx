import React, { useContext } from "react"
import AuthContext from "../context"
import { Link } from "react-router-dom"

const Header = () => {
  const { token, setToken } = useContext(AuthContext)

  return <>
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container-fluid justify-content-center">
        <Link className="navbar-brand" to="/">
          <i className="fa fa-cutlery" aria-hidden="true" />
          Recipe E-Book
        </Link>
        <button
          className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recipes">Recipes Page</Link>
            </li>
            {token ? (
              <li className="nav-item">
                <a className="nav-link" onClick={() => setToken("")}>Logout</a>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}

            {token && (
              <li className="nav-item btn-submit-recipe">
                <Link className="nav-link" to="/submit-recipe">
                  <i
                    className="fa fa-upload"
                    aria-hidden="true"
                  />
                  Submit Recipe
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  </>
}

export default Header

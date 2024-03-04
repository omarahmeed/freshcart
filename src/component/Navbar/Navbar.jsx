import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext.js";
import logo from "../../Assets/images/freshcart-logo.svg";

export default function Navbar() {
  let navigate = useNavigate();
  let { UserToken, setUserToken } = useContext(UserContext);

  function logOut() {
    localStorage.removeItem("usertokern");
    setUserToken(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            {" "}
            <img src={logo} alt="logo of freshcart site" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {UserToken != null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/"}>
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to={"cart"}>
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to={"wishlist"}>
                      Wishlist
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to={"products"}>
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to={"categoris"}>
                      Categoris
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to={"brands"}>
                      Brands
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
                <i className="fab fa-facebook me-2"></i>
                <i className="fab fa-twitter me-2"></i>
                <i className="fab fa-instagram me-2"></i>
                <i className="fab fa-youtube me-2"></i>
              </li>

              {UserToken != null ? (
                <>
                  <li className="nav-item list-unstyled cursor-pointer  ">
                    <span onClick={logOut} className="nav-link ">
                      {" "}
                      logout{" "}
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item list-unstyled">
                    <Link className="nav-link " to={"register"}>
                      Register
                    </Link>
                  </li>
                  <li className="nav-item list-unstyled">
                    <Link className="nav-link " to={"login"}>
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

// <ul className="navbar-nav ms-auto mb-2 mb-lg-0 " />

// <ul/>

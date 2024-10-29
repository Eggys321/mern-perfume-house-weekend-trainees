import React, { useContext } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import menuIcon from "../assets/menu.svg";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";
import LogOut from "./LogOut";

const OffCanvass = ({ name, ...props }) => {
  const [show, setShow] = useState(false);
  const {user} = useContext(CartContext)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.getItem("perf-token")

  return (
    <>
      <div onClick={handleShow}>
        <img src={menuIcon} alt="menu-icon" />
      </div>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Body>
          {token ? <div className="d-flex pt-5 flex-column justify-content-center align-items-center">
            <h1>   {`Hi, ${user?.firstName} ${user?.lastName}`} </h1>
            <div className="w-50">
              <LogOut/>
            </div>
           

          </div> : <div className="d-flex flex-column container mt-3 gap-3">
            <button className="login-btn w-100">
              <Link
                className="text-decoration-none login-link"
                to="/auth/login"
              >
                Log In
              </Link>
            </button>
            <button className="sign-up-btn w-100">
              <Link
                className="text-decoration-none sign-up-link"
                to="/auth/signup"
              >
                Sign Up
              </Link>
            </button>
          </div> }
         
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffCanvass;

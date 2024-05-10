import React from "react";
import "./NavbarPage.css";

const NavbarPage = () => {
  return (
    <nav className="nav">
      <div className="nav-left">
        <a href="">
          <img src="../../assets/img/qsd_logo.png" alt="Company Logo" />
        </a>
        <p>Text 1</p>
        <p>Text 2</p>
        <p>Text 3</p>
      </div>
      <div className="nav-right">
        <svg className="icon">
          <use href="#search" />
        </svg>
        <svg className="icon">
          <use href="#cart" />
        </svg>
        <svg className="icon">
          <use href="#user" />
        </svg>
      </div>
    </nav>
  );
};

export default NavbarPage;

import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../store/reducers/auth";

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  return (
    <Navbar className="bg-success" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <img
            src={process.env.PUBLIC_URL + "/img/logo.png"}
            alt="logo"
            className="me-1"
            style={{ maxHeight: "25px" }}
          ></img>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Nav className="me-auto">
          <Nav.Link
            as={NavLink}
            to="/home"
            className="text-uppercase fw-bold me-4"
          >
            Trang chủ
          </Nav.Link>
          <NavDropdown
            title="Cửa hàng"
            id="collasible-nav-dropdown"
            className="text-uppercase fw-bold me-4"
          >
            <NavDropdown.Item
              as={NavLink}
              to="/product"
              className="text-uppercase fw-bold me-4"
              style={{ backgroundColor: "#b7dc36" }}
            >
              Products
            </NavDropdown.Item>
            <NavDropdown.Item
              as={NavLink}
              to="/category"
              className="text-uppercase fw-bold me-4 mt-2"
              style={{ backgroundColor: "#b7dc36" }}
            >
              Category
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="/home">
            <FontAwesomeIcon className="fs-5 text-secondary" icon={faSyncAlt} />
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link to="#home">welcome to ... {userInfo.fullName}</Nav.Link>
          <Nav.Link onClick={() => dispatch(logout)}>
            <i className="bi-box-arrow-right" />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;

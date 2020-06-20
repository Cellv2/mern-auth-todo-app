import React from "react";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";

type Props = {};

// TODO:
// sign in  / register if not authed
// show name / profile dropdown if authed

const HeaderProfile = (props: Props) => {
    return (
        <Nav>
            <NavDropdown title="Dropdown" id="nav-dropdown">
                <NavDropdown.Item as={Link} to="/login" eventKey="sign-in-page">
                    Sign In
                </NavDropdown.Item>
                <NavDropdown.Item
                    as={Link}
                    to="/register"
                    eventKey="register-page"
                >
                    Register
                </NavDropdown.Item>
                <NavDropdown.Item
                    as={Link}
                    to="/profile"
                    eventKey="profile-page"
                >
                    Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/logout" eventKey="logout-page">
                    Logout
                </NavDropdown.Item>
            </NavDropdown>
        </Nav>
    );
};

export default HeaderProfile;

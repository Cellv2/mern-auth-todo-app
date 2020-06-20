import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";

interface Props extends RouteComponentProps {}

// TODO:
// sign in  / register if not authed
// show name / profile dropdown if authed

const HeaderProfile = (props: Props) => {
    const { location } = props;
    return (
        <Nav activeKey={location.pathname}>
            <NavDropdown title="Dropdown" id="nav-dropdown">
                <NavDropdown.Item as={Link} to="/login" eventKey="/login">
                    Sign In
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register" eventKey="/register">
                    Register
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profile" eventKey="/profile">
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

export default withRouter(HeaderProfile);

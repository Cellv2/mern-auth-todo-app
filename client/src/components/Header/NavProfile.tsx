import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";

interface Props extends RouteComponentProps {
    isAuthenticated: boolean;
}

const NavProfile = (props: Props) => {
    const { location } = props;

    if (!props.isAuthenticated) {
        return (
            <Nav activeKey={location.pathname}>
                <NavDropdown
                    title="My Account"
                    id="nav-dropdown"
                    className="text-center"
                    alignRight
                >
                    <NavDropdown.Item
                        as={Link}
                        to="/login"
                        eventKey="/login"
                        className="text-center"
                    >
                        Sign In
                    </NavDropdown.Item>
                    <NavDropdown.Item
                        as={Link}
                        to="/register"
                        eventKey="/register"
                        className="text-center"
                    >
                        Register
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        );
    }

    return (
        <Nav activeKey={location.pathname}>
            <NavDropdown
                title="My Account"
                id="nav-dropdown"
                className="text-center"
                alignRight
            >
                <NavDropdown.Item
                    as={Link}
                    to="/profile"
                    eventKey="/profile"
                    className="text-center"
                >
                    Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                    as={Link}
                    to="/logout"
                    eventKey="/logout"
                    className="text-center"
                >
                    Logout
                </NavDropdown.Item>
            </NavDropdown>
        </Nav>
    );
};

export default withRouter(NavProfile);

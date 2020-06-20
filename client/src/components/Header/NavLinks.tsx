import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

const NavLinks = (props: Props) => {
    const { location } = props;
    return (
        <Nav
            fill
            variant="pills"
            className="mr-auto"
            activeKey={location.pathname}
        >
            <Nav.Item>
                <Nav.Link as={Link} to="/" eventKey="/">
                    Home
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/about" eventKey="/about">
                    About
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default withRouter(NavLinks);

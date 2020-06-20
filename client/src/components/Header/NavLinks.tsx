import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

type Props = {};

const NavLinks = (props: Props) => {
    return (
        <Nav
            fill
            variant="pills"
            defaultActiveKey="home-page"
            className="mr-auto"
        >
            <Nav.Item>
                <Nav.Link as={Link} to="/" eventKey="home-page">
                    Home
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/about" eventKey="about-page">
                    About
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default NavLinks;

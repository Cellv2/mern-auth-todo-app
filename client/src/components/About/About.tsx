import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import mongoDbLogo from "./mongodb-leaf@4x.png";
import expressLogo from "./Expressjs.png";
import reactLogo from "./React-icon.svg";
import nodeJsLogo from "./NodeJsLogo.png";
import typescriptLogo from "./typescript.png";

import styles from "./About.module.scss";

type Props = {};

const aboutItems = [
    {
        src: mongoDbLogo,
        alt: "MongoDB Logo",
        title: "MongoDB title",
        text: "MongoDB text",
    },
    {
        src: expressLogo,
        alt: "Express Logo",
        title: "Express title",
        text: "Express text",
    },
    {
        src: reactLogo,
        alt: "React Logo",
        title: "React title",
        text: "React text",
    },
    {
        src: nodeJsLogo,
        alt: "NodeJS Logo",
        title: "NodeJS title",
        text: "NodeJS text",
    },
    {
        src: typescriptLogo,
        alt: "TypeScript Logo",
        title: "TypeScript title",
        text: "TypeScript text",
    },
];

const About = (props: Props) => {
    return (
        <div className={styles.gridMain}>
            <h1 className="text-center mb-5">Techs Used</h1>
            {aboutItems.map((item) => {
                return (
                    <Container className={`${styles.containerItem} my-3`}>
                        <Row className="h-100">
                            <Col className="text-center h-100">
                                <Image
                                    fluid
                                    src={item.src}
                                    alt={item.alt}
                                    className="h-100"
                                />
                            </Col>
                            <Col className="h-100">
                                <div className="h-100">
                                    <h5 className="m-0">{item.title}</h5>
                                    <p className="m-0">{item.text}</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                );
            })}
        </div>
    );
};

export default About;

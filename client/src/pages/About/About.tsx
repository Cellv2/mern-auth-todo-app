import React from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import { themeSelector } from "../../app/user-slice";

import mongoDbLogo from "./mongodb-leaf@4x.png";
import expressLogo from "./expressjslogo.png";
import reactLogo from "./React-icon.svg";
import nodeJsLogo from "./NodeJsLogo.png";
import nodeJsLogoDark from "./NodeJsLogoReversed.png";
import typescriptLogo from "./typescript.png";

import styles from "./About.module.scss";

type Props = {};

const aboutItems = [
    {
        srcLight: mongoDbLogo,
        srcDark: mongoDbLogo,
        alt: "MongoDB Logo",
        title: "MongoDB title",
        text: "MongoDB text",
    },
    {
        srcLight: expressLogo,
        srcDark: expressLogo,
        alt: "Express Logo",
        title: "Express title",
        text: "Express text",
    },
    {
        srcLight: reactLogo,
        srcDark: reactLogo,
        alt: "React Logo",
        title: "React title",
        text: "React text",
    },
    {
        srcLight: nodeJsLogo,
        srcDark: nodeJsLogoDark,
        alt: "NodeJS Logo",
        title: "NodeJS title",
        text: "NodeJS text",
    },
    {
        srcLight: typescriptLogo,
        srcDark: typescriptLogo,
        alt: "TypeScript Logo",
        title: "TypeScript title",
        text: "TypeScript text",
    },
];

const About = (props: Props) => {
    const theme = useSelector(themeSelector);

    return (
        <div className={styles.gridMain}>
            <h1 className="text-center mb-5">Techs Used</h1>
            {aboutItems.map((item) => {
                return (
                    <Container
                        key={item.title}
                        className={`${styles.containerItem} my-3`}
                    >
                        <Row className="h-100">
                            <Col className="text-center h-100">
                                <Image
                                    fluid
                                    src={
                                        theme === "light"
                                            ? `${item.srcLight}`
                                            : `${item.srcDark}`
                                    }
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

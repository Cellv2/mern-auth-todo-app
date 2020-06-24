import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

import mongoDbLogo from "./mongodb-leaf@4x.png";
import expressLogo from "./Expressjs.png";
import reactLogo from "./React-icon.svg";
import nodeJsLogo from "./NodeJsLogo.png";
import typescriptLogo from "./typescript.png";

import styles from "./About.module.scss";

type Props = {};

const About = (props: Props) => {
    return (
        <div className={styles.gridMain}>
            <h1 className="text-center">This is the about page</h1>
            <Container style={{ height: "5rem" }}>
                <Row
                    //  style={{ height: "100%" }}
                    className="h-100"
                >
                    <Col
                        sm={3}
                        // style={{ height: "100%" }}
                        className="text-center h-100"
                    >
                        <Image
                            fluid
                            src={mongoDbLogo}
                            alt="MongoDB Logo"
                            className="h-100"
                            // style={{ maxHeight: "100%" }}
                        />
                    </Col>
                    <Col sm={9} className="h-100">
                        <h5>MongoDB title</h5>
                        <p>MongoDB text</p>
                    </Col>
                </Row>
            </Container>
            {/*  */}
            {/*  */}
            {/*  */}
            {/* <Container>
                <Card className="flex-row" style={{backgroundColor: "inherit"}}>
                    <Col sm={2} className="m-auto">

                        <Image
                            fluid
                            src={mongoDbLogo}
                            alt="MongoDB Logo"
                            // style={{ maxHeight: "5rem", maxWidth: "5rem" }}
                            />
                    </Col>
                    <Card.Body className="p-0">
                        <Card.Title>MongoDB title</Card.Title>
                        <Card.Text>MongoDB text</Card.Text>
                    </Card.Body>
                </Card>
            </Container> */}
            {/*  */}
            {/*  */}
            {/*  */}
            {/* <Container  className="justify-content-md-center">
                <Row as={Card}>
                    <Row>
                        <Col sm={2}>
                            <Image fluid src={mongoDbLogo} alt="MongoDB Logo" />
                        </Col>

                        <Col sm={6}>
                            <Card.Body>
                                <Card.Title>MongoDB title</Card.Title>
                                <Card.Text>MongoDB text</Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                </Row>
            </Container> */}
            {/*  */}
            {/*  */}
            {/*  */}
            {/* <Row >
                <Container>
                    <Card>
                        <Row noGutters sm={8}>
                            <Col sm={2}>
                                <Image
                                    fluid
                                    src={mongoDbLogo}
                                    alt="MongoDB Logo"
                                />
                            </Col>

                            <Col sm={6}>
                                <Card.Body>
                                    <Card.Title>MongoDB title</Card.Title>
                                    <Card.Text>MongoDB text</Card.Text>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </Row> */}
            {/*  */}
            {/* <Row> */}
            {/*  */}
            {/* <Col>
                    <div>
                        <div className={styles.logo}>
                            <img src={mongoDbLogo} alt="MongoDB Leaf Logo" />
                        </div>
                        <p>MongoDB</p>
                    </div>
                    <div>
                        <div className={styles.logo}>
                            <img src={expressLogo} alt="ExpressJS Logo" />
                        </div>
                        <p>Express.js</p>
                    </div>
                    <div>
                        <div className={styles.logo}>
                            <img src={reactLogo} alt="ReactJS Logo" />
                        </div>
                        <p>React.js</p>
                    </div>
                    <div>
                        <div className={styles.logo}>
                            <img src={nodeJsLogo} alt="NodeJS Logo" />
                        </div>
                        <p>Node.js</p>
                    </div>
                    <div>
                        <div className={styles.logo}>
                            <img src={typescriptLogo} alt="TypeScript Logl" />
                        </div>
                        <p>TypeScript</p>
                    </div>
                </Col> */}
            {/*  */}
            {/* </Row> */}
            {/*  */}
        </div>
        // <div className={styles.grid}>
        //     <h1>This is the about page</h1>
        //     <p>Add a short description of the techs used</p>
        //     <div className={styles.flexContainer}>
        //         <div className={styles.flexItem}>
        //             <div className={styles.logo}>
        //                 <img src={mongoDbLogo} alt="MongoDB Leaf Logo" />
        //             </div>
        //             <p>MongoDB</p>
        //         </div>
        //         <div className={styles.flexItem}>
        //             <div className={styles.logo}>
        //                 <img src={expressLogo} alt="ExpressJS Logo" />
        //             </div>
        //             <p>Express.js</p>
        //         </div>
        //         <div className={styles.flexItem}>
        //             <div className={styles.logo}>
        //                 <img src={reactLogo} alt="ReactJS Logo" />
        //             </div>
        //             <p>React.js</p>
        //         </div>
        //         <div className={styles.flexItem}>
        //             <div className={styles.logo}>
        //                 <img src={nodeJsLogo} alt="NodeJS Logo" />
        //             </div>
        //             <p>Node.js</p>
        //         </div>
        //         <div className={styles.flexItem}>
        //             <div className={styles.logo}>
        //                 <img src={typescriptLogo} alt="TypeScript Logl" />
        //             </div>
        //             <p>TypeScript</p>
        //         </div>
        //     </div>
        // </div>
    );
};

export default About;

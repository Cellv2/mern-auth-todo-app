import React from "react";

import quotes from "./footer-quotes";

import styles from "./Footer.module.scss";

type Props = {};

class Footer extends React.PureComponent<Props> {
    render() {
        const randomQuoteNumber: number = Math.floor(
            Math.random() * quotes.length
        );
        const randomQuote: string = quotes[randomQuoteNumber];

        return <div className={styles.footer}>{randomQuote}</div>;
    }
}

export default Footer;

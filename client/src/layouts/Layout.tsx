import React from "react";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

type Props = {
    children: React.ReactNode;
};

const Layout = (props: Props) => {
    return (
        <div>
            <Header />
            <h1>This is the main content</h1>
            {props.children}
            <Footer />
        </div>
    );
};

export default Layout;

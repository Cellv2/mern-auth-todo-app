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
            {props.children}
            <Footer />
        </div>
    );
};

export default Layout;

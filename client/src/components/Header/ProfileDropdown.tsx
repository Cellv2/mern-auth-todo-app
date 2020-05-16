import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./ProfileDropdown.module.scss";

type Props = {
    isAuthenticated: boolean;
};

type State = {
    isOpen: boolean;
};

class ProfileDropdown extends Component<Props, State> {
    state: State = {
        isOpen: false,
    };

    handleDropdownToggle = (): void => {
        this.setState({ isOpen: !this.state.isOpen });

        return;
    };

    render() {
        return (
            <div>
                <button onClick={this.handleDropdownToggle}>
                    Click me to {this.state.isOpen ? "close" : "open"}
                </button>
                <ul className={this.state.isOpen ? "open" : `${styles.closed}`}>
                    {this.props.isAuthenticated ? (
                        <>
                            <Link to="/user">View Profile</Link>
                            <Link to="/logout">Log Out</Link>
                        </>
                    ) : (
                        <Link to="/login">Log In</Link>
                    )}
                </ul>
            </div>
        );
    }
}

export default ProfileDropdown;

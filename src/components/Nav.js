import React from "react";
import { FaAlignJustify } from "react-icons/fa";

const Nav = () => {
    const [state, setState] = React.useState(true);
    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar__container">
                    <ul className="navbar__left">
                        <div className="navbar__left-logo">
                            <img src="/portfolio/images/logo.png" alt="logo" />
                        </div>
                    </ul>
                    {state ? (
                        <ul className="navbar__right">
                            <li>
                                <a href="#header">Home</a>

                            </li>
                            <li>
                                <a href="#about">About</a>

                            </li>
                            <li>
                                <a href="#skills">Skills</a>
                            </li>
                            <li>
                                <a href="#projects">Projects</a>
                            </li>
                            <li>
                                <a href="#awards">Achievements</a>
                            </li>
                            <li className="navbar_contact">
                                <a href="#contact">Contact</a>
                            </li>
                        </ul>
                    ) : (
                            ""
                        )}
                </div>
            </div>
            <div className="toggle" onClick={() => setState(!state)}>
                <FaAlignJustify />
            </div>
        </nav>
    );
};

export default Nav;

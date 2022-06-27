import React from "react";
import {
    FaLinkedinIn,
    FaRegEnvelope,
    FaGithub,
    FaRegFileAlt
} from "react-icons/fa";

const Banner = () => {
    const [state] = React.useState({
        title: "Hi, I'm Kiran Muppana",
        subtitle: "Infra Developer@Amdocs",
        text:
            "I creat applications using trending technologies, love exploring cloud and ML related things.​",
        image: "/portfolio/images/symbiote-2.png",
    });
    return (
        <header className="header" id="header">
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="header__content">
                            <div className="header__section">
                                <ul className="header__ul">
                                    <li>
                                        <a href="https://www.linkedin.com/in/kiran-muppana" target="_blank"> <FaLinkedinIn className="headerIcon" /> </a>
                                    </li>
                                    <li>
                                        <a href="mailto:kiranmuppana09@gmail.com" target="_blank"> <FaRegEnvelope className="headerIcon" /> </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/sairamkiran9" target="_blank"> <FaGithub className="headerIcon" /> </a>
                                    </li>
                                    <li>
                                        <FaRegFileAlt className="headerIcon" />
                                    </li>
                                </ul>
                                <h1>{state.title}</h1>
                                <p className="header__section_p1">{state.subtitle}</p>
                                <p className="header__section_p2">{state.text}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="banner__img">
                            <img src={state.image} alt="man" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Banner;

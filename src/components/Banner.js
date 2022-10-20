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
        subtitle: "CS grad at Florida State University",
        text:
            "I create, deploy applications with latest technologies, love exploring cloud and ML related blogs.​",
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
                                        <a href="https://www.linkedin.com/in/kiran-muppana" target="_blank" rel="noopener"> <FaLinkedinIn className="headerIcon" /> </a>
                                    </li>
                                    <li>
                                        <a href="mailto:kiranmuppana09@gmail.com" target="_blank" rel="noopener"> <FaRegEnvelope className="headerIcon" /> </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/sairamkiran9" target="_blank" rel="noopener"> <FaGithub className="headerIcon" /> </a>
                                    </li>
                                    <li> 
                                    <a href="https://drive.google.com/file/d/1JrWKx8wUj4cj3x2xJR40DW_nDTsSRc5B/view?usp=sharing" target="_blank" rel="noopener"> <FaRegFileAlt className="headerIcon" /> </a>
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

import React from "react";
import {
    FaLinkedinIn,
    FaRegEnvelope,
    FaGithub,
    FaStackOverflow
} from "react-icons/fa";
import Form from "./Form";
const Contact = () => {
    return (
        <div className="contact" id="contact">
            <div className="container">
                <div className="contactSection">
                    <div className="contactSection-logo">
                        <img src="/portfolio/images/logo.png" alt="" />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="row justifyConter">
                                <p className="contactSection-p">
                                    Want to give a feedback or discuss something or just want to say hi? My inbox is always open.
                                </p>
                                <ul className="contactCircles">
                                    <li>
                                        <a href="https://www.linkedin.com/in/kiran-muppana" target="_blank" rel="noopener"><FaLinkedinIn className="contactIcon" /> </a>
                                    </li>
                                    <li>
                                        <a href="mailto:kiranmuppana09@gmail.com" target="_blank" rel="noopener"> <FaRegEnvelope className="contactIcon" /> </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/sairamkiran9" target="_blank" rel="noopener"> <FaGithub className="contactIcon" /> </a>
                                    </li>
                                    <li>
                                        <a href="https://stackoverflow.com/users/19210144/lazybug" target="_blank" rel="noopener"> <FaStackOverflow className="contactIcon" /> </a>
                                    </li>
                                </ul>
                                <h1 className="final">with <span className="heart">&hearts;</span> ReactJS</h1>
                            </div>
                        </div>
                        <div className="col-6">
                            <Form />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

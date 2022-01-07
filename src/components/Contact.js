import React from "react";
import {
  FaLinkedinIn,
  FaRegEnvelope,
  FaGithub,
  FaInstagram
} from "react-icons/fa";
import Form from "./Form";
const Contact = () => {
  return (
    <div className="contact">
      <div className="container">
        <div className="contactSection">
          <div className="contactSection-logo">
            <img src="/portfolio/images/logo.png" alt="" />
          </div>
          <div className="row">
            <div className="col-6">
              <div className="row justifyConter">
                <p className="contactSection-p">
                  Whether you want to give a feedback or discuss something or just want to say hi? My inbox is always open for all.
                </p>
                <ul className="contactCircles">
                    <li>
                      <FaLinkedinIn className="contacIcon" />
                    </li>
                    <li>
                      <FaRegEnvelope className="contacIcon" />
                    </li>
                    <li>
                      <FaGithub className="contacIcon" />
                    </li>
                    <li>
                      <FaInstagram className="contacIcon" />
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

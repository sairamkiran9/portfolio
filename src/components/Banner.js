import React from "react";
import {
  FaLinkedinIn,
  FaRegEnvelope,
  FaGithub,
  FaFacebookF,
  FaInstagram
} from "react-icons/fa";
const Banner = () => {
  const [state] = React.useState({
    title: "Hi, I'm Kiran Muppana",
    subtitle: "Software developer, AI enthusiast.",
    text:
      "I love creating illustrations, exploring DevOps related stuff, cloud technlogies and AI blogs.​",
    image: "/portfolio/public/images/Gojo-no-bg.png",
  });
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="header__content">
              <div className="header__section">
                <ul className="header__ul">
                  <li>
                    <FaLinkedinIn className="headerIcon" />
                  </li>
                  <li>
                    <FaRegEnvelope className="headerIcon" />
                  </li>
                  <li>
                    <FaGithub className="headerIcon" />
                  </li>
                  <li>
                    <FaFacebookF className="headerIcon" />
                  </li>
                  <li>
                    <FaInstagram className="headerIcon" />
                  </li>
                </ul>
                <h1>{state.title}</h1>
                <p className="header__section_p1">{state.subtitle}</p>
                <p className="header__section_p2">{state.text}</p>
                {/* <div className="header__buttons">
                  <a href="" className="btn btn-outline">
                    My Portfolio
                  </a>
                  &nbsp;&nbsp;&nbsp;
                  <a href="" className="btn btn-smart">
                    <FaPlay className="play" />
                  </a>
                </div> */}
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

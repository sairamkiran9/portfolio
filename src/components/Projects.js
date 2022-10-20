import React from "react";
import {
  FaRobot,
  FaCircleNotch,
  FaYoutube,
  FaUsers,
} from "react-icons/fa";

const Projects = () => {
  const [state] = React.useState([
    {
      id: 1,
      icon: <FaRobot className="commonIcons" />,
      heading: "Text-to-Image Synthesis",
      text:
        "A deep learning application built on top of GANs and NLP Transformers, capable of generating images from the user provided text description.",
    },
    {
      id: 2,
      icon: <FaCircleNotch className="commonIcons" />,
      heading: "eLearning Portal",
      text:
        "An eLearning management system built in java using spring framework, MySQL database and web developmment technologies.",
    },
    {
      id: 3,
      icon: <FaUsers className="commonIcons" />,
      heading: "Face Recognition System",
      text:
        "From scratch python implementation of Eigenface and Fisherface algorithms for Yale Face Database recognition",
    },
    {
      id: 4,
      icon: <FaYoutube className="commonIcons" />,
      heading: "YouTube Video Category Classifier",
      text:
        "This ML application classifies the YouTube video based on the title and text description of the video.",
    },
  ]);
  return (
    <div className="projects" id="projects">
      <div className="container">
        <div className="projects__header">
          <div className="common">
            <h1 className="mainHeader">My Projects</h1>
            <div className="commonBorder"></div>
          </div>

          <div className="row bgMain">
            {state.map((info) => (
              <div className="col-6 bgMain">
                <div className="projects__box">
                  {info.icon}
                  <div className="projects__box-header">{info.heading}</div>
                  <div className="projects__box-p">{info.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

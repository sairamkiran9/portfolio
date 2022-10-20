import React from "react";

const About = () => {
  return (
    <div className="about" id="about">
      {/* <div className="container"> */}
        <div className="row">
          <div className="col-4">
            <div className="about__img">
              <img src="/portfolio/images/symbiote-1.png" alt="man" />
            </div>
          </div>
          <div className="col-8">
            <div className="about__info">
              <h1>About Me</h1>
              <div className="about__info-p1">
              - Bachelor's in Electronics and Communication Engineering, National Institute of technology - 2021.
              </div>
              <div className="about__info-p1">
              - I like talking, trying out new things, creating graphic design illustrations and long drives.
              </div>
              <div className="about__info-p1">
              - Currenlty working with MLOps and CICD shared library automations.
              </div>
              <div className="about_exp-common">
                <div className="row">
                  <div className="col-6">
                    <div className="about_exp">
                      <h1 className="about_exp-h1">Amdocs</h1>
                      <div className="commonBorder"></div>
                      <h2 className="about_exp-h2">Infra Developer</h2>
                      <p className="about_exp-p">July 2021 - present</p>
                      <ul>
                        <li>
                          Developer under the operational RnD unit, in AI-Driven-DevOps team. We devlop pipelines for monitoring and detecting future anomalies with insights.
                        </li>
                        <li>
                          Responsible for building ML pipelines, cloud technology integration, and developement CI/CD shared libraries.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="about_exp">
                      <h1 className="about_exp-h1">SDSC-SHAR</h1>
                      <div className="commonBorder"></div>
                      <h2 className="about_exp-h2">Intern</h2>
                      <p className="about_exp-p">June 2019 - July 2019</p>
                      <ul>
                        <li>
                          Developed a statistical linear regression model to forecast the impact location of the object.
                        </li>
                        <li>
                          Build from scratch using Python. Got exposure to basics of ML and UI tools.
                        </li>
                        {/* <br></br> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default About;

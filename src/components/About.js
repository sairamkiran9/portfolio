import React from "react";

const About = () => {
  // const [header] = React.useState({
  //   subHeader: "About Me",
  //   text:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum standard dummy text.",
  // });
  // const [state] = React.useState([
  //   { id: 1, title: "Name:", text: "Jonathan Doe" },
  //   { id: 2, title: "Email:", text: "example@domain.com" },
  //   { id: 3, title: "Phone:", text: "+1 023 454 345" },
  //   { id: 4, title: "Linkedin", text: "Jonathan_123" },
  // ]);
  return (
    <div className="about">
      <div className="container">
        {/* <div className="common">
          <h1 className="mainHeader">{header.subHeader}</h1>
          <p className="mainContent">{header.text}</p>
          <div className="commonBorder"></div>
        </div> */}
        <div className="row">
          <div className="col-4">
            <div className="about__img">
              <img src="/images/nobita-no-bg.png" alt="man" />
            </div>
          </div>
          <div className="col-8">
            <div className="about__info">
              <h1>About Me</h1>
              <div className="about__info-p1">
              - Bachelor's in Electronics and Communication Engineering, NITC'21. Turned developer to get my hands dirty with lot of technologies out there.
              </div>
              <div className="about__info-p1">
              - I like building applications, creating graphic design illustrations and binge-watching on OTT.
              </div>
              <div className="about__info-p1">
              - Currenlty vibing with ReactJS, AWS, OCP, DOCKER and AI tools.
              </div>
              {/* <div className="info__contacts">
                <div className="row">
                  {state.map((info) => (
                    <div className="col-6">
                      <strong>{info.title}</strong>
                      <p>{info.text}</p>
                    </div>
                  ))}
                </div>
              </div> */}
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
                          Part of AIOps (AI driven DevOps) adaption team.
                        </li>
                        <li>
                          Responsible for technology integration, code developement and testing of CI automation products.
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
                          Developed a linear regression model from scratch
                        </li>
                        <li>
                          Got exposure to basics of ML and UI tools.
                        </li>
                        <br></br>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

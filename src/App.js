import React from "react";
import "./App.css";
import Banner from "./components/Banner";
import Nav from "./components/Nav";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Awards from "./components/Awards";
import Work from "./components/Work";

function App() {
  return (
    <div>
      <Banner />
      <Nav />
      <About />
      <Projects />
      <Skills />
      <Awards />
      {/* <Work /> */}
      <Contact />
    </div>
  );
}

export default App;

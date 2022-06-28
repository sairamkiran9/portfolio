import React from 'react'
import WordCloud from './WordCloud'

const Skills = () => {
    return (
        <div className='skills' id='skills'>
            {/* <div className="container"> */}
            <div className="row">
                <div className="col-8">
                    {/* <div className="skills-content">     */}
                    <h1 className="skills-h1">My Skills</h1>
                    <div className="commonBorder-2"></div>
                    <div className='skills-section'>
                        <h3 className='skills-header'>Programming Languages</h3>
                        <ul className="labels">
                            <li>Python</li>
                            <li>Groovy</li>
                            <li>Java</li>
                            <li>Shell</li>
                            <li>SQL</li>
                        </ul>
                        <h3 className='skills-header'>Technologies</h3>
                        <ul className="labels">
                            <li>AWS</li>
                            <li>Docker</li>
                            <li>Kubernetes</li>
                            <li>Jenkins</li>
                        </ul>
                        <h3 className='skills-header'>Frameworks</h3>
                        <ul className="labels">
                            <li>Flask</li>
                            <li>Spring</li>
                            <li>ReactJS</li>
                        </ul>
                        <h3 className='skills-header'>Other</h3>
                        <ul className="labels">
                            <li>AI</li>
                            <li>Figma</li>
                            <li>Adobe Illustrator</li>
                        </ul>
                    </div>
                    {/* </div>  */}
                </div>
                <div className="col-4">
                    <WordCloud />
                </div>
                {/* </div> */}
            </div>

        </div>
    )
}

export default Skills

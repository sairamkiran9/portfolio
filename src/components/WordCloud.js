import React, { useEffect } from 'react'
import TagCloud from 'TagCloud';

const container = '.content';

const texts = [
    'Python', 'AWS', 'JavaScript',
    'JAVA', 'Flask', 'Spring',
    'ReactJS', 'SQL', 'CSS',
    'Groovy', 'Shell', 'C++',
    'HTML', 'AI',
];

const options = {
    radius: 200,
    maxSpeed: 'fast',
    initSpeed: 'slow',
    direction: 135,
    keep: true
};

const WordCloud = () => {

    useEffect(() => {
        TagCloud(container, texts, options);
    })

    return (
        <div>
            <span className="content"></span>
        </div>
    )
}

export default WordCloud;

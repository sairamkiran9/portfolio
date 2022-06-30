import React from 'react'

const Awards = () => {
    return (
        <div className='awards' id='awards'>
            <h1 className='awards-h1'>Achievements</h1>
            <div className='row'>
                <div className='col-6'>
                    <div className='awards-section'>
                        <h1 className='title'>Paper publication in Elsevier's journal</h1>
                        <div className="commonBorder"></div>
                        <p className='description'> Research paper titled
                    <i> Transformer models for enhancing AttnGAN based text to image generation </i>
                    has been published in Elsevier's Image and Vision Computing journal.
                </p>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='awards-section'>
                        <h1 className='title'> Amdocs ICE Fair Winner </h1>
                        <div className="commonBorder"></div>
                        <p className='description'>
                            Winner of Amdocs ICE Fair event for the most innovative project of the year among new grads. <br />
                    Achieved a cash prize: $500
                </p>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <div className='awards-section'>
                        <h1 className='title'>HACK-THE-NEED</h1>
                        <div className="commonBorder"></div>
                        <p className='description'> Winner of this design thinking hackathon where our team created a solution for a brainstorming problem statement.
                </p>
                    </div>
                </div>
                {/* <div className='col-6'>
                    <div className='awards-section'>
                        <h1 className='title'> New Tech aFactor Event </h1>
                        <div className="commonBorder"></div>
                        <p className='description'>
                            Bronze visionary badge.
                </p>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Awards

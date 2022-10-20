import React from 'react'

const Form = () => {
    return (
        <div>
            <FormInput description="Name" placeholder="Enter your name" type="text" />
            <FormInput description="Mail" placeholder="Enter your mail" type="text" />
            <FormInput description="Message" placeholder="Enter your message" type="text" />
            <FormButton title="send" />
        </div>
    )
}
const FormButton = props => (
    <div id="button" class="form">
        <button>{props.title}</button>
    </div>
);

const FormInput = props => (
    <div class="form">
        <label>{props.description}</label>
        <input type={props.type} placeholder={props.placeholder} />
    </div>
);

export default Form

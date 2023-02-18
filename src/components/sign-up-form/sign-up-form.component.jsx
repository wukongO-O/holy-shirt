import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    //formFields is an obj w values from defaultFormFields
    const [formFields, setFormFields] = useState(defaultFormFields);
    //destructure 4 values
    const { displayName, email, password, confirmPassword } = formFields;

    //reset form to default values
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        //prevent form's default behavior
        event.preventDefault();
        //check if passwords match
        if(password != confirmPassword) {
            alert('passwords do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, { displayName });
            //reset form after creating a user
            resetFormFields();
        } catch(error) {
            //firebase error code
            if(error.code === 'auth/email-already-in-use') {
                alert('cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error', error);
            }
            
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        //spread all formfields & only update the one w name & value of event.target
        setFormFields({...formFields, [name]: value})
    };

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit} >
                <FormInput
                label='Display Name' 
                type='text' 
                required 
                onChange={handleChange} 
                name='displayName' 
                value={displayName}/>

                <FormInput 
                label='Email'
                type='email' 
                required 
                onChange={handleChange} 
                name='email' 
                value={email} />

                <FormInput 
                label='Password'
                type='password' 
                required 
                onChange={handleChange} 
                name='password' 
                value={password} />

                <FormInput 
                label='Confirm Password'
                type='password' 
                required 
                onChange={handleChange} 
                name='confirmPassword' 
                value={confirmPassword} />

                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default SignUpForm;
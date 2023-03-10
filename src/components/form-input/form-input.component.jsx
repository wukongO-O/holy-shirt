import './form-input.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
    //render label if label exists ? check the syntax
    return (
        <div className="group">
            <input className="form-input" {...otherProps}/>
            {label && (
                <label 
                className={`${otherProps.value.length} ? 'shrink' : ''} form-input-label`} 
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default FormInput;
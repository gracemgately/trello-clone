import React, { useState } from 'react';
import PropTypes from 'prop-types';

const validate = text => {
    if (text.length > 500) throw 'Maximum card length is 500 characters';
}

const Draft = ({ cancel, confirm }) => {
    const [text, setText] = useState('Enter a title for this card');
    const [validationError, setValidationError] = useState(null);

    const onChange = e => {
        if (validationError) setValidationError(null);
        setText(e.target.value);
    };

    const validateDraftText = () => {
        try {
            validate(text);
            confirm(text);
        }
        catch(e) {
            setValidationError(e);
        }
    };

    return (
        <div>
        <textarea className='card draft' data-testid='draft' defaultValue={text} onChange={onChange}/>
        <button className='text-button confirm' onClick={validateDraftText}>
            Add a card</button>
        <button className='text-button' aria-label='Cancel' onClick={cancel}>
            X</button>
        { validationError ? <p>{validationError}</p> : null }
        </div>
    );
};

export default Draft;

Draft.propTypes = {
    cancel: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
};
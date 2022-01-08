import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Draft = ({ cancel, confirm }) => {
    const [text, setText] = useState('Enter a title for this card');

    const onChange = e => {
        setText(e.target.value);
    };

    return (
        <div>
        <textarea className='card draft' data-testid='draft' defaultValue={text} onChange={onChange}/>
        <button className='text-button confirm' onClick={() => confirm(text)}>
            Add a card</button>
        <button className='text-button' aria-label='Cancel' onClick={cancel}>
            X</button>
        </div>
    );
};

export default Draft;

Draft.propTypes = {
    cancel: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
};
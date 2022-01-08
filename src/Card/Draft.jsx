import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Draft = ({ cancel, confirm }) => {
    const [text, setText] = useState('Enter a title for this card');

    const onChange = e => {
        setText(e.target.value);
    };

    return (
        <>
        <textarea data-testid='draft' defaultValue={text} onChange={onChange}/>
        <button onClick={() => confirm(text)}>Add a card</button>
        <button aria-label='Cancel' onClick={cancel}>X</button>
        </>
    );
};

export default Draft;

Draft.propTypes = {
    cancel: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
};
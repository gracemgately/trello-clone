import React from 'react';
import PropTypes from 'prop-types';

const textValidation = t => t;

const Card = ({ text, type, edit }) => {
    const onChange = e => {
        type(e.target.value);
    };

    return edit ? 
    <textarea data-testid='draft' defaultValue={text} onChange={onChange}/> : 
    [text].filter(textValidation).map(t => <div key={t} data-testid='card'>{t}</div> );
};

export default Card;

Card.propTypes = {
    text: PropTypes.string,
    edit: PropTypes.bool,
    type: PropTypes.func,
};

Card.defaultProps = {
    text: '',
    edit: false,
    type: () => {},
};

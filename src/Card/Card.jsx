import React from 'react';
import PropTypes from 'prop-types';

const validateText = text => text;

const Card = ({ text }) => validateText(text) ? 
    <div data-testid="card">{text}</div> 
    : null;

export default Card;

Card.propTypes = {
    text: PropTypes.string,
};

Card.defaultProps = {
    text: '',
};

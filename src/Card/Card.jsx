import React from 'react';
import PropTypes from 'prop-types';

const textValidation = t => t;

const Draggable = ({ testId, text, id }) => {
    const onDragStart = e => {
        e.dataTransfer.setData("text/plain", e.target.id);
        e.dataTransfer.dropEffect = "move";
    };

    return (
        <div
            className='card'
            data-testid={testId}
            id={id}
            draggable
            onDragStart={onDragStart}
        >
            {text}
        </div>);
};

const Card = ({ card }) => {
    return [card.text]
        .filter(textValidation)
        .map(() => 
            <Draggable testId='card' key={card.id} {...card} /> );
};

export default Card;

Card.propTypes = {
    card: PropTypes.shape({
        text: PropTypes.string,
        id: PropTypes.string,
    }),
};

Card.defaultProps = {
    card: {
        text: '',
        id: '0',
    },
};

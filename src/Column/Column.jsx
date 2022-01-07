import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';

const Column = ({ title, cards }) => <div>
    { title }
    { cards.map(card => <Card key={card.text} card={card} /> )}
</div>;

export default Column;

Column.propTypes = {
    title: PropTypes.string,
    cards: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string
    })),
};

Column.defaultProps = {
    cards: [],
    title: '',
};
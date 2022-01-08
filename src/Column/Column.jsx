import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';

const Draft = ({ cancel, confirm }) => {
    const [text, setText] = useState('Enter a title for this card');

    const updateText = input => {
        setText(input);
    }; 

    return (
        <>
        <Card text={text} type={updateText} edit/>
        <button onClick={() => confirm(text)}>Add a card</button>
        <button aria-label='Cancel' onClick={cancel}>X</button>
        </>
    );
};

const Column = ({ title, cards: initialCards }) => {
    
    const [cards, setCards] = useState(initialCards);
    const [displayUserPrompt, setDisplayUserPrompt] = useState(false);

    const close = () => {
        setDisplayUserPrompt(false);
    };
    
    const addCard = text => {
        close();
        const newCards = [...cards, { text }];
        setCards(newCards);
    };
    
    const toggleUserPrompt = () => {
        setDisplayUserPrompt(!displayUserPrompt);
    };

    return (
        <div>
            { title }

            { cards.map(card => <Card key={card.text} text={card.text} /> )}
            
            { displayUserPrompt ? 
                <Draft confirm={addCard} cancel={close} />
                : null 
            }

            { !displayUserPrompt ? 
                 <button onClick={toggleUserPrompt}>
                    Add another card
                </button> : 
                null 
            }
        </div>
    );
};

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
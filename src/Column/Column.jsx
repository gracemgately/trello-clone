import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import Draft from '../Card/Draft'
;import Card from '../Card/Card';

const Column = ({ title, cards: initialCards }) => {
    
    const [cards, setCards] = useState(initialCards);
    const [displayUserPrompt, setDisplayUserPrompt] = useState(false);

    const close = () => {
        setDisplayUserPrompt(false);
    };
    
    const addCard = text => {
        close();
        //eventually when these cards are stored in a db,
        //we would call the POST endpoint here and create
        //the card, returning an identifier back as confirmation
        const newCards = [...cards, { text, id: uuid() }];
        setCards(newCards);
    };
    
    const toggleUserPrompt = () => {
        setDisplayUserPrompt(!displayUserPrompt);
    };

    const reorderCards = (locationId, cardToDropId) => {
        let cardToMove = cards.filter(c => c.id === cardToDropId)[0];
        let removeDroppedCard = cards.filter(c => c.id !== cardToDropId);

        let reordered = removeDroppedCard;
        return reordered.reduce((newCards, currentCard, index) => {
            if (locationId === currentCard.id) {
                newCards.splice(index, 0, cardToMove);
            }
            return newCards;
        }, removeDroppedCard);
    };

    const onDragOver = e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const onDrop = () => e => {
        e.preventDefault();
        var data = e.dataTransfer.getData('text/plain');
        e.dataTransfer.clearData();

        const locationForDrop = e.target.id;
        const cardToDrop = data;
        const reorderedCards = reorderCards(locationForDrop, cardToDrop);
        setCards(reorderedCards);
    };

    return (
        <div onDrop={onDrop()} onDragOver={onDragOver} id={title}>
            { title }

            { cards.map(card => <Card key={card.id} card={card} /> )}
            
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
        id: PropTypes.string,
        text: PropTypes.string,
    })),
};

Column.defaultProps = {
    cards: [],
    title: '',
};
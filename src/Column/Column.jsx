import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import Draft from '../Card/Draft'
;import Card from '../Card/Card';

const Column = ({ id, title, cards, addCard: addCardToColumn, onDragOver, onDrop: onColumnDrop }) => {
    const [displayUserPrompt, setDisplayUserPrompt] = useState(false);

    const close = () => {
        setDisplayUserPrompt(false);
    };

    const onDrop = columnId => e => {
        onColumnDrop(columnId)(e);
    }
    
    const addCard = text => {
        close();
        //eventually when these cards are stored in a db,
        //we would call the POST endpoint here and create
        //the card, returning an identifier back as confirmation
        const newCard = { text, id: uuid(), columnId: id };
        addCardToColumn(newCard);
    };
    
    const toggleUserPrompt = () => {
        setDisplayUserPrompt(!displayUserPrompt);
    };

    return (
        <div className='column'
            id={id} 
            onDrop={onDrop(id)} 
            onDragOver={onDragOver}>
            { title }

            <div className='column-cards'>
                { cards.map(card => <Card key={card.id} card={card} /> )}
                
                { displayUserPrompt ? 
                <Draft confirm={addCard} cancel={close} />
                : null 
            }
            </div>

            { !displayUserPrompt ? 
                 <button 
                    aria-label='Add another card' 
                    className='text-button add-card' 
                    onClick={toggleUserPrompt}>+ Add another card</button> : 
                null 
            }
        </div>
    );
};

export default Column;

Column.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    addCard: PropTypes.func.isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape({
        columnId: PropTypes.string,
        id: PropTypes.string,
        text: PropTypes.string,
    })),
};

Column.defaultProps = {
    id: '0',
    cards: [],
    title: '',
};
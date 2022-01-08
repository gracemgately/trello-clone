import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Column from '../Column/Column';
import './Board.css';

const Board = ({ columns, cards: initialCards }) => {
    const [cards, setCards] = useState(initialCards);

    const addCard = (card, cardsToAddTo=cards) => {
        const newCards = [...cardsToAddTo, card];
        setCards(newCards);
    };

    const onDragOver = e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const removeDraggedCard = cardId => {
        const cardToMove = cards.filter(c => c.id === cardId)[0];
        const filtered = cards.filter(c => c.id !== cardId);
        return [cardToMove, filtered];
    };

    const addCardAtLocation = (locationId, cardToAdd, cards) => {
        let reorderdCards = [];
        cards.forEach(card => {
            if(locationId === card.id) {
                reorderdCards.push(cardToAdd);
            }
            reorderdCards.push(card);
        });
        return reorderdCards;
    };

    const reorderCards = columnId => e => {
        e.preventDefault();
        var data = e.dataTransfer.getData('text/plain');
        e.dataTransfer.clearData();

        const locationForDrop = e.target.id;
        const cardToDrop = data;
        const [cardMoved, filteredCards] = removeDraggedCard(cardToDrop);
        const movedCardWithNewColumn = { ...cardMoved, columnId };

        if (!locationForDrop) {
            addCard(movedCardWithNewColumn, filteredCards);
        }
        else {
            const reorderedCards = addCardAtLocation(locationForDrop, movedCardWithNewColumn, filteredCards);
            setCards(reorderedCards);
        }
    };

    return (
        <div className='board'>
            {columns.map(column => 
                <Column 
                    key={column.id} 
                    onDrop={reorderCards}
                    onDragOver={onDragOver}
                    id={column.id}
                    title={column.title} 
                    cards={cards.filter(c => c.columnId === column.id)}
                    addCard={addCard}
                />)
            }
        </div>
    );
}

export default Board;

Board.propTypes = {
    cards: PropTypes.array,
    columns: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        cards: PropTypes.array,
    }))
};

Board.defaultProps = {
    columns: [],
    cards: [],
}
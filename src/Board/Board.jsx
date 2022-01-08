import React from 'react';
import PropTypes from 'prop-types';
import Column from '../Column/Column';

const Board = ({ columns }) => <div>
    { columns.map(column => <Column key={column.title} title={column.title}/> ) }
</div>

export default Board;

Board.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string
    }))
};

Board.defaultProps = {
    columns: []
}
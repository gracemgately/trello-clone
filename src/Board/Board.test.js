import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Board from './Board';

describe('Board', () => {
  it('renders an empty board by default', () => {
    render(<Board />);
    
    const columnsRendered = screen.queryByTestId("column");
    expect(columnsRendered).not.toBeInTheDocument();
  });
  
  it('renders an empty board when no columns are provided', () => {
    const props = {
      columns: [],
    }
    render(<Board {...props}/>);
    
    const columnsRendered = screen.queryByTestId("column");
    expect(columnsRendered).not.toBeInTheDocument();
  });

  it('renders the number of provided columns', () => {
    const props = {
      columns: [
      { title: 'Column 1', id: '1'},
      { title: 'Column 2', id: '2'},
    ] 
  };

    render(<Board {...props}/>);
    
    const column1 = screen.getByText('Column 1');
    expect(column1).toBeInTheDocument();
    const column2 = screen.getByText('Column 2');
    expect(column2).toBeInTheDocument();
  });

  it('sorts the cards into their columns by id', () => {
    const props = {
      cards: [
        { id: '123', columnId: '2', text: 'Column 2 card'},
        { id: '345', columnId: '1', text: 'Column 1 card'},
      ],
      columns: [
      { title: 'Column 1', id: '1'},
      { title: 'Column 2', id: '2'},
    ] 
  };

    render(<Board {...props}/>);
    
    const column1 = screen.getByText('Column 1');
    const card1 = screen.getByText('Column 1 card');
    const column2 = screen.getByText('Column 2');
    const card2 = screen.getByText('Column 2 card');

    expect(column1).toContainElement(card1);
    expect(column1).not.toContainElement(card2);
    expect(column2).toContainElement(card2);
    expect(column2).not.toContainElement(card1);
  });

  it('creates a card when the user confirms', async () => {
    const props = {
      cards: [],
      columns: [
      { title: 'TODO', id: '1'},
    ] 
  };

    render(<Board {...props}/>);

    const newCard = () => screen.queryByText('Enter a title for this card: hooray!');
    expect(newCard()).not.toBeInTheDocument();
    
    const addACard = screen.getByRole('button', { name: 'Add another card' });
    userEvent.click(addACard);

    userEvent.type(screen.getByRole('textbox'), ': hooray!');

    const confirm = screen.getByRole('button', { name:'Add a card'} );
    userEvent.click(confirm);

    await waitFor(() => expect(newCard()).toBeInTheDocument());
  });
});
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Column from './Column';

describe('Column', () => {  
  it('renders a title', () => {
    const props = {
      title: 'TODO'
    };

    render(<Column {...props}/>);
    
    const title = screen.getByText('TODO');
    expect(title).toBeInTheDocument();
  });

  it('renders no cards by default', () => {
    const props = {
      title: 'In Progress'
    };

    render(<Column {...props}/>);
    
    const cards = screen.queryByTestId('card');
    expect(cards).not.toBeInTheDocument();
  });

  it('renders no cards when none are provided', () => {
    const props = {
      title: 'In Progress',
      cards: [],
    };

    render(<Column {...props}/>);
    
    const cards = screen.queryByTestId('card');
    expect(cards).not.toBeInTheDocument();
  });

  it('renders the number of provided cards', () => {
    const props = {
      title: 'In Progress',
      cards: [
        { text: 'Finish homework assignment', id: '1' },
        { text: 'Do laundry', id: '2' },
        { text: 'Call my mom', id: '3' },
      ],
    };

    render(<Column {...props}/>);
    
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(3);
  });

  it('displays the option to create a card', () => {
    const buttonText = 'Add another card';
    const props = {
      title: 'TODO'
    };

    render(<Column {...props}/>);
    
    const addACard = screen.getByRole('button', { name: buttonText });
    expect(addACard).toBeInTheDocument();
  });

  describe('Add another card', () => {
    it('prompts the user when selected', () => {
      const props = {
        title: 'TODO'
      };
  
      render(<Column {...props}/>);
      
      const addACard = screen.getByRole('button', { name: 'Add another card' });
      userEvent.click(addACard);

      const textArea = screen.getByText('Enter a title for this card');
      const confirm = screen.getByText('Add a card');
      const cancel = screen.getByText('X');
      expect(textArea).toBeInTheDocument();
      expect(confirm).toBeInTheDocument();
      expect(cancel).toBeInTheDocument();
    });

    it('creates a card when the user confirms', async () => {
      const props = {
        title: 'TODO',
        cards: [],
      };
  
      render(<Column {...props}/>);
      
      const addACard = screen.getByRole('button', { name: 'Add another card' });
      userEvent.click(addACard);

      userEvent.type(screen.getByRole('textbox'), ': hooray!');

      const confirm = screen.getByRole('button', { name:'Add a card'} );
      userEvent.click(confirm);

      const newCard = screen.getByTestId('card');
      expect(newCard).toBeInTheDocument();
      expect(newCard).toHaveTextContent('Enter a title for this card: hooray!');

      await waitFor(() => {
        expect(confirm).not.toBeInTheDocument();
      });
    });

    it('closes the draft when the user cancels', async () => {
      const props = {
        title: 'TODO',
        cards: [],
      };
  
      render(<Column {...props}/>);
      
      const addACard = screen.getByRole('button', { name: 'Add another card' });
      userEvent.click(addACard);

      const cancel = screen.getByRole('button', { name: 'Cancel' });
      userEvent.click(cancel);

      await waitFor(() => {
        expect(screen.queryByTestId('card')).not.toBeInTheDocument();
      });
    });
  });
});
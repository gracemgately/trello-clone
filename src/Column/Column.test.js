import { render, screen } from '@testing-library/react';
import Column from './Column';

jest.mock('../Card/Card', () => () => <div data-testid="card"/>)

describe('Column', () => {  
  it('renders a title', () => {
    const props = {
      title: 'TODO'
    }
    render(<Column {...props}/>);
    
    const title = screen.getByText('TODO');
    expect(title).toBeInTheDocument();
  });

  it('renders no cards by default', () => {
    const props = {
      title: 'In Progress'
    }
    render(<Column {...props}/>);
    
    const cards = screen.queryByTestId('card');
    expect(cards).not.toBeInTheDocument();
  });

  it('renders no cards when none are provided', () => {
    const props = {
      title: 'In Progress',
      cards: [],
    }
    render(<Column {...props}/>);
    
    const cards = screen.queryByTestId('card');
    expect(cards).not.toBeInTheDocument();
  });

  it('renders the number of provided cards', () => {
    const props = {
      title: 'In Progress',
      cards: [
        { text: 'Finish homework assignment' },
        { text: 'Do laundry' },
        { text: 'Call my mom' },
      ],
    }
    render(<Column {...props}/>);
    
    const cards = screen.queryAllByTestId('card');
    expect(cards).toHaveLength(3);
  });
});
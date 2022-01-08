import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from './Card';

describe('Card', () => {  
  it('does not render if there is no text content', () => {
    render(<Card />);
    
    const task = screen.queryByTestId('card');
    expect(task).not.toBeInTheDocument();
  });

  it('does not render if there is no valid text content', () => {
    const props = {
      card: {
        text: '',
        id: '1',
      },
    }
    render(<Card {...props}/>);
    
    const task = screen.queryByTestId('card');
    expect(task).not.toBeInTheDocument();
  });

  it('renders text', () => {
    const props = {
      card: {
        text: 'It\'s time to update your driver\'s license',
        id: '3',
      },
    }
    render(<Card {...props}/>);


    const task = screen.queryByTestId('card');
    expect(task).toBeInTheDocument();
    expect(task).toHaveTextContent('It\'s time to update your driver\'s license');
  });
});
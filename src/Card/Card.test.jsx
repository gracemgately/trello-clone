import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {  
  it('does not render if there is no text content', () => {
    render(<Card />);
    
    const task = screen.queryByTestId('card');
    expect(task).not.toBeInTheDocument();
  });

  it('does not render if there is no valid text content', () => {
    const props = {
      text: ''
    }
    render(<Card {...props}/>);
    
    const task = screen.queryByTestId('card');
    expect(task).not.toBeInTheDocument();
  });

  it('renders text', () => {
    const props = {
      text: 'It\'s time to update your driver\'s license'
    }
    render(<Card {...props}/>);


    const task = screen.queryByTestId('card');
    expect(task).toBeInTheDocument();
    expect(task).toHaveTextContent('It\'s time to update your driver\'s license');
  });
});
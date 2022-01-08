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

  it('saves and displays edits', async () => {
    const typeFn = jest.fn();
    const props = {
      text: 'default',
      edit: true,
      type: typeFn,
    }
    render(<Card {...props}/>);


    const task = screen.queryByTestId('draft');
    expect(task).toBeInTheDocument();
    expect(task).toHaveTextContent('default');

    userEvent.type(screen.getByRole('textbox'), ' value');

    expect(typeFn).toHaveBeenCalledWith('default value');
  });
});
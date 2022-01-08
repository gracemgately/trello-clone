import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Draft from './Draft';

describe('Draft', () => {  
  it('saves and displays edits', () => {
    const props = { 
      cancel: () => {},
      confirm: () => {},
    };
    render(<Draft {...props}/>);


    const draft = screen.queryByTestId('draft');
    expect(draft).toBeInTheDocument();
    expect(draft).toHaveTextContent('Enter a title for this card');

    userEvent.type(screen.getByRole('textbox'), ' value');

    screen.getByText('Enter a title for this card value');
  });
});
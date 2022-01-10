import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

  it('validates text when the user tries to create the card', async () => {
    const textWith501Characters = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ' +
    'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus ' +
    'et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ' +
    'ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. ' +
    'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, ' +
    'imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus';

    const props = { 
      cancel: () => {},
      confirm: () => {},
    };
    render(<Draft {...props}/>);

    const draft = screen.queryByTestId('draft');
    expect(draft).toBeInTheDocument();
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });

    userEvent.type(screen.getByRole('textbox'), textWith501Characters);

    userEvent.click(screen.getByRole('button', { name: 'Add a card' }));
    
    await waitFor(() => screen.getByText('Maximum card length is 500 characters'));
  });
});
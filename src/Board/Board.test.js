import { render, screen } from '@testing-library/react';
import Board from './Board';

jest.mock('../Column/Column', () => () => <div data-testid="column"/>)

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
      { title: 'Column 1'},
      { title: 'Column 2'},
    ] 
  };

    render(<Board {...props}/>);
    
    const columnsRendered = screen.queryAllByTestId("column");
    expect(columnsRendered).toHaveLength(2);
  })
});
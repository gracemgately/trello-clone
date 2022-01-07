import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('../Board/Board', () => () => <div data-testid="board"></div>)

describe('App', () => {
  it('renders the board', () => {
    render(<App/>);
    
    const board = screen.getByTestId("board");
    expect(board).toBeInTheDocument();
  });
});

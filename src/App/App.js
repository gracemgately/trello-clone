import Board from '../Board/Board';

//with a backend, you could fetch
//this data for the user and render
//their columns and cards
const columns = [
  { title: 'TODO', id: '1' },
  { title: 'In Progress', id: '2' },
  { title: 'QA', id: '3' },
  { title: 'Done', id: '4' },
];

const cards = [
  { text: 'first todo', id: '12345', columnId: '1' },
  { text: 'first in progress', id: '19872', columnId: '2' },
  { text: 'second todo', id: '13142', columnId: '1' },
  { text: 'third todo', id: '35435', columnId: '1' },
  { text: 'fourth todo', id: '43231', columnId: '1' }
];

const App = () => {
  return (
    <div className="App">
      <Board columns={columns} cards={cards}/>
    </div>
  );
}

export default App;

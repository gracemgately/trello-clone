# trello-clone
A replica of a Trello-esque task board, featuring draggable tasks within columns.

Full disclosure: I spent more than 2 hours on this -- more like ~5, since I was having fun with it (I've never gotten to implement drag and drop before, actually) and wanted to try CSS Grid and snap-scrolling, which I've wanted to try but haven't gotten the chance to yet in real life.

*Assumptions made while developing this board:*
- There are only four columns on the board; the user cannot create new, edit, or delete columns
- The user is not allowed to create infinite cards; there is a limit on the number of cards that can be in a column
- The "mobile/tablet" view is set by screen size rather than strictly by device (i.e. a desktop window sized the same as a tablet should also see the tablet view)

*Where I think there's room for more work/improvement:*
- I'd like to think more about the difference between a created card and a draft
It feels like a draft is just a version of a card (one that allows editing)
- I'd definitely want to add more testing around drag and drop behavior
- It would be nice to have more typing validation (Typescript) and some code-style validation (maybe with something like prettier)
- Once a database is added, this will need some reworking in order to think about preserving the order of the cards as it appears on the board -- maybe each card will need to have an order of field and be sorted in the columns as per that order
- There's a lof of filtering and sorting going on through _all_ the cards, which is definitely not ideal if you
want to get to the point where there could be many columns and many cards in each column -- at that point it would
be nicer to have the drag and drop events just trigger column-specific reorganization
- Something I was thinking about, as well, is how we'd want to set up the API calls (or a PWA?) so that we didn't end up with a situation where a user makes some edits to their board and then loses their connection and their work "disappears" when they come back online

# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Don't forget to run `npm i`!

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

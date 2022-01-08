# trello-clone
A replica of a Trello-esque task board, featuring draggable tasks within columns.

Assumptions made while developing this board:
- There are only four columns on the board; the user cannot create new, edit, or delete columns
- The user is not allowed to create infinite cards; there is a limit on the number of cards that can be in a column

Where I think there's room for more work/improvement:
- I'd like to think more about the difference between a created card and a draft
It feels like a draft is just a version of a card (one that allows editing)
- I'd want to add more testing around drag and drop - this feels like a functional-type test
- I'm not super-happy with the way the cards are reordered/moved, right now I'm only
allowing people to reorder cards above the target, but it would be better for the user to be able to move a card to the bottom of the list, too
- It would be nice to have more typing validation on the components, as well as just generally
some code-style validation (maybe with something like prettier)

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

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

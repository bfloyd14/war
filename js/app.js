/*------------------ Constants -----------------------*/
// const cardDeck
// Include values of each card within War rules


/*----------------- Variables ---------------------*/
// Use a variable named playerCardDeck to keep track of cards won
let playerCardDeck = []
// Use a variable named computerCardDeck to keep track of cards won
let computerCardDeck = []
// Use a variable name playerUnusedCardDeck to keep track of cards remaining to be played
let playerUnusedCardDeck 
// Use a variable named computerUnusedCardDeck  to keep track of cards remaining to be played
let computerUnusedCardDeck
// Use a variable named checkForWinner to check for a victory when opponent has ran out of cards
let winner, war, doubleWar, choseCountry
// Use a variable named war to deploy when player 1 & player 2 turn over same card
// Use a variable named doubleWar to represent when war has resulted in drawing the same card
// Use a variable name playerCountry to determine which civilization is chosen
// Stretch goal - have a drop down box to pick a country
// Default country would be Vikings
// Use a variable name computerCountry to determine which civilization is chosen
// Stretch goal - randomized
// Default country would be the English


/*------------ Cached Element References -----------*/
// const reset button for AAU to reset the game
// const message to display updated message throughout the game
// const playerActiveCard to keep track of the card that is played by the player
// const computerActiveCard to keep track of the card that is played by computer


/*----------------- Event Listeners -------------------*/
// 6) Handle a player clicking a card deck with a `handleClick` function
// When a user clicks on their card deck, the player and the computer play their next card for their respective card decks.  
// Create a Surrender (reset) button that shuffles the 56 card deck and deals out 28 cards to each player
// 8) Create a score display for each player keeping track of cards won

/*------------------- Functions ----------------------*/
// 3) Upon loading, the game state should be initialized, and a function should be 
//    called to render this game state
// Call a function named init upon loading of game
// The init function will always be used for the game reset
// Call a function name render at the end of the init function
// The render function can be used in other functions
// 4) The state of the game should be rendered to the user
// Create a function called render
// Create a function called updateMessage 
// Displays new messages based on what the state of the game is:
// Start
// Play card
// Evaluate winner
// War
// Double ware
// Defeat
// Create a function called handleClick to play a card from player deck and a card from computer deck
// Create a compareCard function that evaluates the player card and computer card
// 5) Define the required constants

//  The cards played are evaluating for a winner, if both cards have the same value, then initiate war which add 3 cards face down then a 4th card is flipped over and evaluated for a winner, if player or computer does not have 4 cards in unusedCardDeck then the other player wins.  If both cards have the same value, then initiate double war,  if player or computer does not have 4 cards in unusedCardDeck then the other player wins.
// Run checkForWinner variable to see if any player has no cards remaining
// 7) Create Reset functionality
// 9) Adding sound effects for actions of the game
// Country selection (Player default Vikings)
// When a card is played
// When there is a War
// When there is a Double War
// When you forfeit
// Victory


// BONUS
// 10) Create a drop down box for Country/Civilization selection (BONUS FEATURE)
// User can select a country from a drop down box
// When specific country is selected, it changes the theme of the cards
// The computer Country is randomly selected

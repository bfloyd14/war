/*------------------ Constants -----------------------*/

const allCards = ["dA","dK","dQ","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hK","hQ","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cK","cQ","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sK","sQ","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]

/*----------------- Variables ---------------------*/
let gameIsInPlay
let playerHand, computerHand
let playerCard, computerCard 
let playerWinsPile = [], computerWinsPile = []
let winner, choseCountry
let cardVal
let playerWarCards = [], computerWarCards = []
let playerScoreTotal, computerScoreTotal
// Use a variable name playerCountry to determine which civilization is chosen
// Stretch goal - have a drop down box to pick a country
// Default country would be Vikings
// Use a variable name computerCountry to determine which civilization is chosen
// Stretch goal - randomized
// Default country would be the English


/*------------ Cached Element References -----------*/

const messageEl = document.getElementById('message')
const attackBtn = document.getElementById('play-card-btn')
const resetBtn = document.getElementById('reset')
const startBtn = document.getElementById('start')
const cardContainer = document.querySelector('.card-container')
const playerDeck = document.getElementById('player-deck')
const computerDeck = document.getElementById('computer-deck')
const playerCardInPlay = document.getElementById('player-card-inplay')
const computerCardInPlay = document.getElementById('computer-card-inplay')
const playerWinningPile = document.getElementById('player-winning-pile')
const computerWinningPile = document.getElementById('computer-winning-pile')
const computerWarDraw = document.getElementById('computer-war-container')
const playerWarDraw = document.getElementById('player-war-container')
const playerScore = document.getElementById('player-score')
const computerScore = document.getElementById('computer-score')
const medievalWar = new Audio('../audio/medievalwar.wav')
/*----------------- Event Listeners -------------------*/

attackBtn.addEventListener('click', handleDrawButton)
resetBtn.addEventListener('click', init)
startBtn.addEventListener('click', handleStart)
// 8) Create a score display for each player keeping track of cards won

/*------------------- Functions ----------------------*/
init()

function init(){
  gameIsInPlay = false
  winner = false
  playerHand = []
  computerHand = []
  generateDecks()
  resetScore()
  render()
}

function setMessage(message){
  messageEl.textContent = message
}

function handleStart(evt){
  medievalWar.volume = .05
  medievalWar.play()
  gameIsInPlay = true
  gameDeck = generateDecks
  render()
  
}

function shuffleCards(cards){
  let shuffledCards = []
  let shuffleCount = cards.length
  for (i=0; i < shuffleCount; i++){
    let randIdx = Math.floor(Math.random()* cards.length)
    shuffledCards.push(cards.splice(randIdx, 1)[0])
  }
  // console.log(shuffledCards)
  return shuffledCards
}

function generateDecks(){
  let deckCopy = [...allCards]
  let playerCardsToAdd = []
  let computerCardsToAdd = []
  for(let i = 0; i < 52; i++){
    let randIdx = Math.floor(Math.random() * deckCopy.length)
    let cardToAdd = deckCopy.splice(randIdx, 1)[0]
    if(i % 2){
      playerCardsToAdd.push(cardToAdd)
  } else {
    computerCardsToAdd.push(cardToAdd)
    }
  }
  playerHand = shuffleCards(playerCardsToAdd)
  computerHand = shuffleCards(computerCardsToAdd)
}

function handleDrawButton(){
  // clearCardInPlay()
  checkForWinner()
  redistribute()
  playerCardInPlay.classList.remove(playerCard)
  computerCardInPlay.classList.remove(computerCard)
  playerCard = playerHand.pop()
  computerCard = computerHand.pop()
  playerCardInPlay.classList.add(playerCard)
  playerCardInPlay.classList.remove('outline')
  computerCardInPlay.classList.add(computerCard)
  computerCardInPlay.classList.remove('outline')
  compareCards()
}

function clearCardInPlay (){
  playerCardInPlay.classList.remove(playerCard)
  computerCardInPlay.classList.remove(computerCard)
  playerCardInPlay.classList.add('outline')
  computerCardInPlay.classList.add('outline')
}

function checkCardVal(card){
  let cardVal = card.slice(1)
  if(cardVal === 'A') return 14
  if(cardVal === 'K') return 13
  if(cardVal === 'Q') return 12
  if(cardVal === 'J') return 11
  return parseInt(cardVal)
  console.log(cardVal(playerCard, computerCard))
}

function compareCards(){
  setMessage.innerHTML = ''
  if(checkCardVal(playerCard) > checkCardVal(computerCard)){
    playerWinsPile.push(playerCard,(computerCard))
    // setTimeout(setMessage, 1000)
    setMessage('The player wins the hand!')
    playerWinningPile.classList.remove('outline')
    playerWinningPile.classList.add('back-blue')
    console.log(playerCard, computerCard)
    updateScore()
  } 
  if (checkCardVal(playerCard) < checkCardVal(computerCard)){
    computerWinsPile.push(playerCard,(computerCard)) 
    // setTimeout(setMessage, 1000)
    setMessage('The computer wins the hand!')
    computerWinningPile.classList.remove('outline')
    computerWinningPile.classList.add('back-red')
    updateScore()
  } 
  if (checkCardVal(playerCard) === checkCardVal(computerCard)){
    //Iniates War
    setMessage('WAR has begun!')
    setTimeout(displayWarDrawCard, 400)
    setTimeout(displayWarDrawCard, 800)
    setTimeout(displayWarDrawCard, 1200)
    setTimeout(war, 1600)
  }
}

function war (){
  checkForWinner()
  redistribute()
  let playerWarCards = playerHand.slice(0,4) 
  playerCardInPlay.classList.remove(playerCard)
  playerCard = playerWarCards[3]
  playerCardInPlay.classList.add(playerCard)
  console.log(playerWarCards)
  checkForWinner()
  redistribute()
  let computerWarCards = computerHand.slice(0,4)
  computerCardInPlay.classList.remove(computerCard)
  computerCard = computerWarCards[3]
  computerCardInPlay.classList.add(computerCard)
  console.log(computerWarCards)
  checkForWinner()
  redistribute()
  if(checkCardVal(playerWarCards[3]) > checkCardVal(computerWarCards[3])){
    playerWinsPile.push(...playerWarCards, ...
    computerWarCards)
    // setTimeout(setMessage, 1200)
    setMessage('The Player has won this battle!')
    updateScore()
    console.log(playerWinsPile, playerWarCards)
  } else if(checkCardVal(playerWarCards[3]) < checkCardVal(computerWarCards[3])){
    computerWinsPile.push(...playerWarCards, ...computerWarCards)
    // setTimeout(setMessage, 1200)
    setMessage('The Computer has won this battle!')
    updateScore()
    console.log(computerWinsPile, computerWarCards)
  } else{
    playerWarCards = []
    computerWarCards = []
    war()
    setTimeout(setMessage, 1200)
    setMessage('You must fight again!')
    updateScore()
  }
}

function displayWarDrawCard(){
  let playerNewWarCard1 = document.createElement('div')
  playerNewWarCard1.className = 'card large back-blue'
  playerWarDraw.appendChild(playerNewWarCard1)
  let computerNewWarCard1 = document.createElement('div')
  computerNewWarCard1.className = 'card large back-red'
  computerWarDraw.appendChild(computerNewWarCard1)
  setTimeout(clearDisplayWarDrawCards, 3000)
}

function clearDisplayWarDrawCards(){
  playerWarDraw.innerHTML = ''
  computerWarDraw.innerHTML = ''
  console.log(playerWarDraw)
  console.log(computerWarDraw)
}

function updateScore(){
  let playerScoreTotal = playerWinsPile.length + playerHand.length
  let computerScoreTotal = computerWinsPile.length + computerHand.length
  playerScore.textContent = 'Player Cards: ' + playerScoreTotal 
  computerScore.textContent = 'Computer Cards: ' + computerScoreTotal 
  console.log(playerScoreTotal, computerScoreTotal)
}

function resetScore(){
  playerScore.innerHTML = 'Player Cards: 26'
  computerScore.innerHTML = 'Computer Cards: 26 '
}

function checkForWinner(){
  if(playerHand.length === 0 && playerWinsPile.length === 0){
    winner = true
    setMessage('DEFEAT! The computer has won the WAR.')
  } else if(computerHand.length === 0 && computerWinsPile.length === 0){
    winner = true
    setMessage('VICTORY! The player has won the WAR.')
  } else {
    winner = false
  }
}

function redistribute(){
  if(playerHand.length === 0 && playerWinsPile.length > 0){
    playerHand = shuffleCards([...playerWinsPile])
    playerWinsPile = []
  } if(computerHand.length === 0 && computerWinsPile.length > 0){
    computerHand = shuffleCards([...computerWinsPile])
    computerWinsPile = []
  } 
}

function render(){
  if(gameIsInPlay){
    startBtn.style.display = 'none'
    reset.style.display = ''
    attackBtn.style.display = ''
    playerCardInPlay.classList.remove(playerCard)
    computerCardInPlay.classList.remove(computerCard)
    computerWinningPile.classList.add('outline')
    computerWinningPile.classList.remove('back-red')
    playerWinningPile.classList.add('outline')
    playerWinningPile.classList.remove('back-blue')
    setMessage('Press Attack to begin your battle!')
  } else {
    reset.style.display = 'none'
    attackBtn.style.display = 'none'
    startBtn.style.display = ''
    playerCardInPlay.classList.remove(playerCard)
    computerCardInPlay.classList.remove(computerCard)
    computerCardInPlay.classList.add('outline')
    playerCardInPlay.classList.add('outline')
    computerWinningPile.classList.add('outline')
    computerWinningPile.classList.remove('back-red')
    playerWinningPile.classList.add('outline')
    playerWinningPile.classList.remove('back-blue')
  }
}






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

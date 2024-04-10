/*------------------ Constants -----------------------*/

const allCards = ["dA","dK","dQ","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hK","hQ","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cK","cQ","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sK","sQ","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]

/*----------------- Variables ---------------------*/
let gameIsInPlay
let playerHand = [], computerHand = []
let playerCard, computerCard 
let playerWinsPile = [], computerWinsPile = []
let winner
let cardVal
let playerWarCards = [], computerWarCards = []
let playerScoreTotal, computerScoreTotal 

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
const cardFlip = new Audio('../audio/cardflip.wav')
const cardShuffle = new Audio('../audio/cardshuffle.mp3')
/*----------------- Event Listeners -------------------*/

attackBtn.addEventListener('click', handleDrawButton)
resetBtn.addEventListener('click', handleReset)
startBtn.addEventListener('click', handleStart)


/*------------------- Functions ----------------------*/
init()

function init(){
  gameIsInPlay = false
  winner = false
  resetScore()
  render()
}

function setMessage(message){
  messageEl.textContent = message
}

function handleStart(evt){
  medievalWar.volume = .05
  medievalWar.play()
  setTimeout(stopMusic, 3000)
  resetMusic()
  gameIsInPlay = true
  generateDecks()
  render()
}

function stopMusic(){
  medievalWar.pause()
}

function resetMusic(){
    medievalWar.currentTime = 0
  }


function shuffleCards(cards){
  let shuffledCards = []
  let shuffleCount = cards.length
  for (i=0; i < shuffleCount; i++){
    let randIdx = Math.floor(Math.random()* cards.length)
    shuffledCards.push(cards.splice(randIdx, 1)[0])
  }
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
  cardFlip.volume = .1
  cardFlip.play()
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
  redistribute()
  let cardVal = card.slice(1)
  if(cardVal === 'A') return 14
  if(cardVal === 'K') return 13
  if(cardVal === 'Q') return 12
  if(cardVal === 'J') return 11
  return parseInt(cardVal)
}

function compareCards(){
  setMessage.innerHTML = ''
  if(checkCardVal(playerCard) > checkCardVal(computerCard)){
    playerWinsPile.push(playerCard,computerCard)
    setMessage('The player wins the hand!')
    playerWinningPile.classList.remove('outline')
    playerWinningPile.classList.add('back-blue')
    updateScore()
  } 
  if (checkCardVal(playerCard) < checkCardVal(computerCard)){
    computerWinsPile.push(playerCard,computerCard) 
    setMessage('The computer wins the hand!')
    computerWinningPile.classList.remove('outline')
    computerWinningPile.classList.add('back-red')
    updateScore()
  } 
  if (checkCardVal(playerCard) === checkCardVal(computerCard)){
    cardFlip.volume = .1
    cardFlip.play()
    setMessage('WAR has begun!')
    setTimeout(displayWarDrawCard, 400)
    setTimeout(displayWarDrawCard, 800)
    setTimeout(displayWarDrawCard, 1200)
    setTimeout(war, 1600)
    
  }
  console.log(playerHand, playerWinsPile, computerHand, computerWinsPile)
}

function war (){
  checkForWinner()
  redistribute()
  let playerWarCards = playerHand.splice(0,4) 
  playerCardInPlay.classList.remove(playerCard)
  playerCardInPlay.classList.add(playerWarCards[3])
  checkForWinner()
  redistribute()
  let computerWarCards = computerHand.splice(0,4)
  computerCardInPlay.classList.remove(computerCard)
  computerCardInPlay.classList.add(computerWarCards[3])
  checkForWinner()
  redistribute()
  if(checkCardVal(playerWarCards[3]) > checkCardVal(computerWarCards[3])){
    playerWinsPile.push(...playerWarCards, ...
    computerWarCards, playerCard, computerCard)
    setMessage('The Player has won this battle!')
    updateScore()
  } else if(checkCardVal(playerWarCards[3]) < checkCardVal(computerWarCards[3])){
    computerWinsPile.push(...playerWarCards, ...computerWarCards, playerCard, computerCard)
    setMessage('The Computer has won this battle!')
    updateScore()
  } else{
    war()
    setTimeout(setMessage, 1200)
    setMessage('You must fight again!')
    updateScore()
  }
  clearDisplayWarDrawCards()
}

function displayWarDrawCard(){
  let playerNewWarCard1 = document.createElement('div')
  playerNewWarCard1.className = 'card large back-blue'
  playerWarDraw.appendChild(playerNewWarCard1)
  let computerNewWarCard1 = document.createElement('div')
  computerNewWarCard1.className = 'card large back-red'
  computerWarDraw.appendChild(computerNewWarCard1)
}

function clearDisplayWarDrawCards(){
  computerCardInPlay.classList.remove(computerWarCards[3])
  playerCardInPlay.classList.remove(playerWarCards[3])
  playerCardInPlay.classList.add('outline')
  computerCardInPlay.classList.add('outline')
}

function updateScore(){
  playerScoreTotal = playerWinsPile.length + playerHand.length
  computerScoreTotal = computerWinsPile.length + computerHand.length
  playerScore.textContent = 'Player Cards: ' + `${playerScoreTotal}` 
  computerScore.textContent = 'Computer Cards: ' + `${computerScoreTotal}` 
}

function resetScore(){
  playerScore.innerHTML = 'Player Cards: ' + `${playerHand.length}` 
  computerScore.innerHTML = 'Computer Cards: ' + `${computerHand.length}` 
}

function checkForWinner(){
  if(playerHand.length === 0 && playerWinsPile.length === 0){
    winner = true
    setMessage('DEFEAT! The computer is victorious!')
  } else if(computerHand.length === 0 && computerWinsPile.length === 0){
    winner = true
    setMessage('VICTORY! The player has won!')
  } else {
    winner = false
  }
}

function redistribute(){
  if(playerHand.length < 5 ){
    playerHand = shuffleCards([...playerWinsPile, ...playerHand])
    playerWinsPile = []
    cardShuffle.volume = .1
    cardShuffle.play()
  } if(computerHand.length < 5 ){
    computerHand = shuffleCards([...computerWinsPile, ...computerHand])
    computerWinsPile = []
    cardShuffle.volume = .1
    cardShuffle.play()
  } 
}

function handleReset(evt){
  init()
  clearDisplayWarDrawCards()
  clearCardInPlay()
  playerWinsPile = []
  computerWinsPile = []

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
  
  }
}




//
//BlackJack
//by Luis Hinostroza
//

//Card variables
let suits = [ "Hearts", "Clubs", "Diamonds", "Spades" ];
let cards = [ "King", "Queen", "Ten", "Nine", "Eight", "Seven", "Five",
              "Four", "Three", "Two", "Ace"];

//DOM variables
let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let passButton = document.getElementById('stay-button');

//Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

hitButton.style.display = 'none';
passButton.style.display = 'none';
showStatus();

newGameButton.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [ getNextCard(), getNextCard() ];
  playerCards = [ getNextCard(), getNextCard() ];

  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  passButton.style.display = 'inline';
  showStatus();
});

hitButton.addEventListener('click', function() {
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

passButton.addEventListener('click', function() {
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

function createDeck()      //function
{
  let deck = [];
  for (let indDeck = 0; indDeck < suits.length; indDeck++)
  {
    for (let indCards = 0; indCards < cards.length; indCards++)
    {
      let card = {
        suit: suits[indDeck],
        value: cards[indCards]
      };
      deck.push(card)
    }
  }
  return deck;
}

function shuffleDeck(deck) //function
{
  for (let i = 0; i < deck.length; i++)
  {
    let swapIdx = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp;
  }
}

function getCardString(card)    //function
{
  return card.value + " of " + card.suit;
}


function getNextCard()     //function
{
  return deck.shift();
}

function getCardNumericValue(card)
{
  switch(card.value)
  {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}

function getScore(cardArray)    //function
{
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++)
  {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === 'Ace')
    {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21)
  {
    return score + 10;
  }
  return score;
}

function updateScores()    //function
{
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function checkForEndOfGame()
{
  updateScores();

  if (gameOver)    //let dealer take cards
  {
    while(dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21)
    {
      dealerCards.push(getNextCard());
      updateScores();
    }
  }

  if (playerScore > 21)
  {
    playerWon = false;
    gameOver = true;
  }
  else if (dealerScore > 21)
  {
    playerWon = true;
    gameOver = true;
  }
  else if (gameOver)
  {
    if (playerScore > dealerScore)
    {
      playerWon = true;
    }
    else
    {
      playerWon = false;
    }
  }
}

function showStatus()      //function
{
  if (!gameStarted)
  {
    textArea.innerText = 'Welcome to Blackjack!'
    return;
  }

  let dealerCardString = '';
  for (let i = 0; i < dealerCards.length; i++)
  {
    dealerCardString += getCardString(dealerCards[i]) + '\n';
  }

  let playerCardString = '';
  for (let i = 0; i < dealerCards.length; i++)
  {
    playerCardString += getCardString(playerCards[i]) + '\n';
  }

  updateScores();

  textArea.innerText =
    'Dealer has:\n' +
    dealerCardString +
    '(score: '+ dealerScore + ')\n\n' +

    'Player has:\n' +
    playerCardString +
    '(score: '+ playerScore + ')\n\n';

    if (gameOver)
    {
      if (playerWon)
      {
        textArea.innerText += "You Won!";
      }
      else
      {
        textArea.innerText += "Dealer Won";
      }
      newGameButton.style.display = 'inline';
      hitButton.style.display = 'none';
      passButton.style.display = 'none';
    }
}







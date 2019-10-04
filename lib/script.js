//
//BlackJack
//by Luis Hinostroza
//

let suits = [ "Hearts", "Clubs", "Diamonds", "Spades" ];
let cards = [ "King", "Queen", "Ten", "Nine", "Eight", "Seven", "Five",
              "Four", "Three", "Two", "Ace"];

console.log("Welcome to Blackjack!");

function createDeck()
{
  let deck = [];
  for (let indDeck = 0; indDeck < suits.length; indDeck++)
  {
    for (let indCards = 0; indCards < cards.length; indCards++)
    {
      deck.push(cards[indCards] + " of " + suits[indDeck]);
    }
  }
  return deck;
}

function getNextCard()
{
  return deck.shift();
}

let deck = createDeck();

for (let i = 0; i < deck.length; i++)
{
  console.log(deck[i]);
}

let playersCards = [getNextCard(), getNextCard()];

console.log("You are dealt: ");
console.log(" " + playersCards[0]);
console.log(" " + playersCards[1]);







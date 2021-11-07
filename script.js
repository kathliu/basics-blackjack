var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥", "♦", "♣", "♠"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// aim when user click submit, each draw 2 card from shuffled deck, and return
//create a deck

var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
var dealerCard1 = shuffledDeck.pop();
var dealerCard2 = shuffledDeck.pop();
var playerCard1 = shuffledDeck.pop();
var playerCard2 = shuffledDeck.pop();

var input = "";

var dealerAdd = function () {
  var totalDealer = dealerCard1.rank + dealerCard2.rank;

  return totalDealer;
};

var playerAdd = function () {
  var totalPlayer = playerCard1.rank + playerCard2.rank;

  return totalPlayer;
};

var main = function (input) {
  //dealer draws 2 cards, player draws 2 cards
  //both value will be added

  var totalSumDealerCard = dealerAdd();
  var totalSumPlayerCard = playerAdd();

  var myOutputValue = `Dealer's card is ${dealerCard1.name} of ${dealerCard1.suit} and ${dealerCard2.name} of ${dealerCard2.suit}. total sum is ${totalSumDealerCard}<br> Your card is ${playerCard1.name} of ${playerCard1.suit} and ${playerCard2.name} of ${playerCard2.suit}. total sum is ${totalSumPlayerCard} <br> `;

  // A tie. When both the player and dealer have the same total hand values - or if both draw Blackjack
  if (
    totalSumDealerCard == totalSumPlayerCard &&
    totalSumDealerCard &&
    totalSumPlayerCard <= 21
  ) {
    myOutputValue += "its a tie!";
  }

  //wining condition
  //either dealer or player sum more than 21, busted
  else if (totalSumDealerCard > 21 && totalSumPlayerCard < 21) {
    myOutputValue += "Dealer busted! Player wins!";
  } else if (totalSumPlayerCard > 21 && totalSumDealerCard < 21) {
    myOutputValue += "Player busted! Dealer wins!";

    //balckjack wins
  } else if (totalSumPlayerCard == 21 || totalSumDealerCard == 21) {
    myOutputValue += "Blackjack WIN!";
  }

  //both player and dealer more than 21, restart la
  else if (totalSumDealerCard && totalSumPlayerCard > 21) {
    myOutputValue += "Restart la!";

    //hit or stand
  } else {
    myOutputValue = `Dealer's card is ${dealerCard1.name} of ${dealerCard1.suit} and ${dealerCard2.name} of ${dealerCard2.suit}. total sum is ${totalSumDealerCard}<br> Your card is ${playerCard1.name} of ${playerCard1.suit} and ${playerCard2.name} of ${playerCard2.suit}. total sum is ${totalSumPlayerCard} <br> Player choose to hit or stand?`;
  }

  return myOutputValue;
};

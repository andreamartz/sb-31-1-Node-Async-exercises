$(function() {
  // Asynchronous Code in JavaScript
  // Let’s have some fun working with callbacks, promises, and then async / await after the next subunit!

  // For these challenges, start by solving them with promises.

  // Once you’ve solved this using promises continue to the next subunit and after learning about async functions solve these using async await.

  // *************************
  // PART 2: DECK OF CARDS
  // *************************

  // 1.  Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

  const CARDS_BASE_URL = "https://deckofcardsapi.com/api/deck";


  $.getJSON(`${CARDS_BASE_URL}/new/draw/?count=1`, response => {
    console.log(response);
    console.group("The card drawn was: ", response.cards[0].value, "of", response.cards[0].suit);
    $("body").append('<h2>Part 2: Deck of Cards</h2>')
    $("body").append('<h3>1. Shuffle deck and draw a card.</h3>')
    $("body").append(`<p>The card drawn was the ${response.cards[0].value} of ${response.cards[0].suit}.</p>`);
  });

  // 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

  // Once you have both cards, console.log the values and suits of both cards.

  $.getJSON(`${CARDS_BASE_URL}/new/draw/?count=1`, response => {
    let firstCard=response.cards[0];
    let deckId=response.deck_id;
    console.log(response);
    console.log("The first card drawn was: ", firstCard.value, "of", firstCard.suit);
    $.getJSON(`${CARDS_BASE_URL}/${deckId}/draw/?count=1`, response => {
      let secondCard=response.cards[0];
      [firstCard, secondCard].forEach(card => {
        console.log(`Card drawn: ${card.value} of ${card.suit}`);
      });
      $("body").append('<h3>2. Shuffle deck and draw two cards.</h3>')
      $("body").append(`<p>The first card drawn was the ${firstCard.value} of ${firstCard.suit}.</p>
      <p>The second card drawn was the ${secondCard.value} of ${secondCard.suit}.</p>`);
    })
  });

  // 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

  // create new deck (save the deck id)
  // show button on page to draw a card
  // on click of button, display a new card
  // use the same deck for every click of the button

  $.getJSON(`${CARDS_BASE_URL}/new/shuffle/?deck_count=1`, response => {
    console.log(response);
    deckId = response.deck_id;



});
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

  async function cardDraw1() {
    let response = await $.getJSON(`${CARDS_BASE_URL}/new/draw/?count=1`);
    console.log(response);
    console.group("The card drawn was: ", response.cards[0].value, "of", response.cards[0].suit);
    $("body").append('<h2>Part 2: Deck of Cards</h2>');
    $("body").append('<h3>1. Shuffle deck and draw a card.</h3>');
    $("body").append(`<p>The card drawn was the ${response.cards[0].value} of ${response.cards[0].suit}.</p>`);
  }

  cardDraw1();


  // 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

  // Once you have both cards, console.log the values and suits of both cards.


  async function cardDraw2() {
    let firstCardInfo = await($.getJSON(`${CARDS_BASE_URL}/new/draw/?count=1`));
    let deckId = firstCardInfo.deck_id;
    let secondCardInfo = await($.getJSON(`${CARDS_BASE_URL}/new/draw/?count=1`));
    $("body").append('<h3>2. Shuffle deck and draw two cards.</h3>')
    $("body").append(`<p>The first card drawn was the ${firstCardInfo.value} of ${firstCardInfo.suit}.</p>
    <p>The second card drawn was the ${secondCardInfo.value} of ${secondCardInfo.suit}.</p>`);
    return [firstCardInfo, secondCardInfo];
  };
  
  cardDraw2();

  // 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

  async function cardDraw3() {
    const $drawCard = $('#draw-card');
    const $displayCard = $('#display-card');
    const $btn = $('button');
    let response = await $.getJSON(`${CARDS_BASE_URL}/new/shuffle/?deck_count=1`);
    let deckId = response.deck_id;
    $btn.show().on("click", async function () {
      let cardInfo = await $.getJSON(`${CARDS_BASE_URL}/${deckId}/draw/?count=1`);
      let cardImgSrc = cardInfo.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $displayCard.append(
        $('<img>', {
          src: cardImgSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      );
      if (cardData.remaining === 0) $btn.remove();
    });
  }

  cardDraw3();
});
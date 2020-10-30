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


  $.getJSON(`${CARDS_BASE_URL}/new/draw/?count=1`)
  .then(response => {
    console.log(response);
    console.group("The card drawn was: ", response.cards[0].value, "of", response.cards[0].suit);
    $("body").append('<h2>Part 2: Deck of Cards</h2>')
    $("body").append('<h3>1. Shuffle deck and draw a card.</h3>')
    $("body").append(`<p>The card drawn was the ${response.cards[0].value} of ${response.cards[0].suit}.</p>`);
  });

  // 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

  // Once you have both cards, console.log the values and suits of both cards.

  let firstCard;
  let secondCard;
  $.getJSON(`${CARDS_BASE_URL}/new/draw/?count=1`)
  .then(response => {
    firstCard=response.cards[0];
    let deckId=response.deck_id;
    console.log(response);
    console.log("The first card drawn was: ", firstCard.value, "of", firstCard.suit);
    return($.getJSON(`${CARDS_BASE_URL}/${deckId}/draw/?count=1`));
  })
  .then(response => {
    secondCard=response.cards[0];
    [firstCard, secondCard].forEach(card => {
      console.log(`Card drawn: ${card.value} of ${card.suit}`);
    });
    $("body").append('<h3>2. Shuffle deck and draw two cards.</h3>')
    $("body").append(`<p>The first card drawn was the ${firstCard.value} of ${firstCard.suit}.</p>
    <p>The second card drawn was the ${secondCard.value} of ${secondCard.suit}.</p>`);
  });


  // 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.


  const $drawCard = $('#draw-card');
  const $displayCard = $('#display-card');
  const $btn = $('button');

  $.getJSON(`${CARDS_BASE_URL}/new/shuffle/?deck_count=1`)
  .then(response => {
    console.log(response);
    deckId = response.deck_id;
    $btn.show();
  });

  $btn.on('click', function() {
    $.getJSON(`${CARDS_BASE_URL}/${deckId}/draw/?count=1`)
    .then(response => {
      $card = response.cards[0];
      $cardURL = $card.image;
      $cardValue = $card.value;
      $cardSuit = $card.suit;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      console.log(response, $cardValue, "of", $cardSuit, "from deck: ", deckId);
      $cardImg = $("<img>").attr('src', `${$cardURL}`);
      $displayCard.append(
        $($cardImg, {
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      );
    });
  });

  // solution code - DOES NOT WORK LIKE THE ANIMATION SHOWN ON ASSIGNMENT
  // let deckId = null;
  // let $btn = $('button');
  // let $cardArea = $('#card-area');

  // $.getJSON(`${CARDS_BASE_URL}/new/shuffle/`, function(data) {
  //   deckId = data.deck_id;
  //   $btn.show();
  // });

  // $btn.on('click', function() {
  //   $.getJSON(`${CARDS_BASE_URL}/${deckId}/draw/`, function(data) {
  //     let cardSrc = data.cards[0].image;
  //     let angle = Math.random() * 90 - 45;
  //     let randomX = Math.random() * 40 - 20;
  //     let randomY = Math.random() * 40 - 20;
  //     $cardArea.append(
  //       $('<img>', {
  //         src: cardSrc,
  //         css: {
  //           transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
  //         }
  //       })
  //     );
  //     if (data.remaining === 0) $btn.remove();
  //   });
  // });
});
// Asynchronous Code in JavaScript
// Let’s have some fun working with callbacks, promises, and then async / await after the next subunit!

// For these challenges, start by solving them with promises.

// Once you’ve solved this using promises continue to the next subunit and after learning about async functions solve these using async await.

// *************************
// PART 1: NUMBER FACTS
// *************************

// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.

const favNumber = 0;
const baseURL = "http://numbersapi.com";

$("body").append('<h1>Asynchronous Code in JavaScript</h1>')
$("body").append('<h2>Part 1: Number Facts</h2>')

$.getJSON(`${baseURL}/${favNumber}/trivia?json`, response => {
  console.log(response);
  $("body").append('<h3>1. One Fact About 0:</h3>');
  $("body").append(`<p>${response.text}</p>`);
});


// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

let nums = [2, 4, 6, 8];

$.getJSON(`${baseURL}/${nums}/trivia?json`, response => {
  console.log(response);
  const facts = Object.values(response);
  $("body").append('<h3>2. Facts about 2, 4, 6, and 8:</h3>');
  facts.forEach(fact => 
  $("body").append(`<p>${fact}</p>`));
});

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

// (Note: You’ll need to make multiple requests for this.)

// ****************
// SEE Async Callbacks Review at 9:36
// ****************

let facts=[]
$.getJSON(`${baseURL}/${favNumber}/trivia?json`, response => {
  console.log(response);
  facts.push(response.text);
  $.getJSON(`${baseURL}/${favNumber}/trivia?json`, response => {
    console.log(response);
    facts.push(response.text);
    $.getJSON(`${baseURL}/${favNumber}/trivia?json`, response => {
      console.log(response);
      facts.push(response.text);
      $.getJSON(`${baseURL}/${favNumber}/trivia?json`, response => {
        console.log(response);
        facts.push(response.text);
        $("body").append('<h3>3. More about the number 0:</h3>');
        facts.forEach(fact => {
          $("body").append(`<p>${fact}</p>`);
        })
      })
    })
  })
});

//declare favorite number
const favoriteNumber = 42;
//define URL with favorite and JSON format query key
const apiURL_1 = `http://numbersapi.com/${favoriteNumber}?json`;

// 1. Make a GET request to the Numbers API
async function getFact() {
  let data = await $.getJSON(apiURL_1);
  console.log(data);
}

getFact();

//define favorite numbers in an array
const favoriteNumbers = [7, 31, 25];
//define URL  with array and JSON format query key
const apiURL_2 = `http://numbersapi.com/${favoriteNumbers}?json`;

// 2. Make multiple requests to Numbers API
async function getFacts() {
  let data = await $.getJSON(apiURL_2);
  console.log(data);
}

getFacts();

// 3. Get four facts for favorite number and display them on page
async function getFourFacts() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(apiURL_1))
  );
  facts.forEach(data => {
    $("body").append(`<p>${data.text}</p>`)
  });
}

getFourFacts();
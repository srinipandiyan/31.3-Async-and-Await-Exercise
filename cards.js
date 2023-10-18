// 1. Make a GET request to the Cards API for a single card from a shuffled deck
const baseURL = `https://deckofcardsapi.com/api`

async function getSingleCard() {
    const data = await $.getJSON(`${baseURL}/deck/new/shuffle/?deck_count=1`);
    const deckId = data.deck_id;
    const resp = await $.getJSON(`${baseURL}/deck/${deckId}/draw/?count=1`);
    console.log(`${resp.cards[0]['value'].toLowerCase()} of ${resp.cards[0]['suit'].toLowerCase()}`);
}

getSingleCard();

//2. Make a GET request to the Cards API for a single card from a shuffled deck and the another card from the same deck

async function getDoubleCards() {
    const card1 = await $.getJSON(`${baseURL}/deck/new/draw`);
    const deckId = card1.deck_id;
    const card2 = await $.getJSON(`${baseURL}/deck/${deckId}/draw/?count=1`);

    console.log(`${card1.cards[0].value.toLowerCase()} of ${card1.cards[0].suit.toLowerCase()}`);
    console.log(`${card2.cards[0].value.toLowerCase()} of ${card2.cards[0].suit.toLowerCase()}`);
}

getDoubleCards();

//3. Create an HTML page to draw cards from deck with a button
async function getCard() {
    let $btn = $('button');
    let $cardArea = $('#card-area');
    let deck = await $.getJSON(`${baseURL}/deck/new/shuffle/`);

    $btn.show().on('click', async function() {
        let data = await $.getJSON(`${baseURL}/deck/${deck.deck_id}/draw/`);
        let cardSrc = data.cards[0].image;
        let cardAlt = `${data.cards[0]['value'].toLowerCase()} of ${data.cards[0]['suit'].toLowerCase()}`
      $cardArea.append(
        $('<img>', {
          src: cardSrc,
          alt: cardAlt
        })
      );
      if (deck.remaining === 0) $btn.remove();
    });
}

getCard();
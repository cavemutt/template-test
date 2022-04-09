
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// run the fetch request once and then pluck one from the array
// get a new quote
function newQuote() {
    loading();
    // pick a random quote from the api
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(quote);
    // authorText.textContent = quote.source;

    // check if author field blank, replace
    if (!quote.source) {
        author.Text.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.source
    }
    // check quote length is needs long quote class
    if (quote.quote.length > 80) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    
    quoteText.textContent = quote.quote;
    // set quote and hide loader 
    complete();
}

// using local quotes.js instead of the api

// function newQuote() {
//     // pick a random quote from the api
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     console.log(quote);
// }



// get quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://inspirational-quotes-api.herokuapp.com/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        // console.log(apiQuotes[]);
    } catch (error) {
        alert(error);
    }
}

// tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load

getQuotes();
// newQuote();
// loading();



// take input to put into html


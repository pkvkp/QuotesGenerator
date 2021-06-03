const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

// Get quotes from API
let apiQuotes = [];

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show the new Quotes
function newQuotes() {
    loading();
    // pick the random quotes from apiQuotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if the author field is blank and replace with anonymous
    if (!quote.author) {
        authorText.textContent = 'Anonymous'
    } else {
        authorText.textContent = quote.author;
    }
    // Check the quotes is longer and change font-size
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        loading();
        const response = await fetch(apiUrl)
        apiQuotes = await response.json();
        newQuotes();
    } catch (error) {
        // Catch the error
    }
}

// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Eventlistener
newQuoteBtn.addEventListener('click', newQuotes);
twitterBtn.addEventListener('click', tweetQuote);
//On loades
getQuotes();

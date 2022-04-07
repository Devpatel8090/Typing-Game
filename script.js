
// all of our quotes
const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];
// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');


document.getElementById('start').addEventListener("click" , () => {
    const quoteIndex = Math.floor(Math.random() * quotes.length); // for selecting random quote from quotes array
    const quote = quotes[quoteIndex]; // taking quote from quote array
    
    words = quote.split(" "); // dividing the quoted in to words array
    wordIndex = 0;

    const spanWords = words.map(
        (word) =>{ return `<span>${word} </span>`}
    );
        quoteElement.innerHTML = spanWords.join(' '); //display quotes on the user screen 
        quoteElement.childNodes[0].className = 'highlight'; //giving the css property of highlight class to the first word
        messageElement.innerText = ''; // removing the previous msg

    typedValueElement.value = ' '; // to clear the input box
    typedValueElement.focus();  // focus the input box so that user know it is started
    startTime = new Date().getTime(); // timecounting is going to start
});

// logic for  checking typed string is correct or not 

typedValueElement.addEventListener ( 'input' , () => {
    const currentWord = words[wordIndex]; // position of the current word 
    const typedValue = typedValueElement.value; // value of the current word 

    // if typevalue is equal to current value and word is the last of the array index then success 
    if (typedValue === currentWord && wordIndex === words.length - 1) {
        const timeTaken = new Date.getTime() - startTime ;
        const message = `Congratulations !! You finished quote in ${timeTaken} seconds. `

        messageElement.innerHTML = message;
    }

    // if word ends with space and we delete all the space and same as quote then move the highlight 
    else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {

        typedValueElement.value = ' ';
        wordIndex++;

        for (const wordElement of quoteElement.childNodes) {
            wordElement.className= "";
        }
        
        quoteElement.childNodes[wordIndex].className = "highlight";

    }
    else if (currentWord.startsWith(typedValue)) {
        
        typedValueElement.className = " ";
        
    }
    // shows the error msg 
    else {
        typedValueElement.className = "error";
    }

});
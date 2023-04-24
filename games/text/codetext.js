var apiKey = 'be7cbf41-2b93-472c-a42b-675042ae3bd1';

async function checkWordExists(word) {
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`);
    const data = await response.json();
    if (!Array.isArray(data) || data.length < 1) {
      return false;
    }
    const firstResult = data[0];
    if (!firstResult || !firstResult.meta) {
      return false;
    }
    return true;
}

// Choose accent mode. If true, then accent must be correct. If false, accents won't matter. 
var accentMode = true

// The correct answer to be found
var answer = "JavaScript"

// Here are the words that will be displayed at the beginning 
var whitelist = ["often ", "as", "is", "a", "that", "is", "of", "the", "of", "along", "and", "As", "use", "on","the","for","often","All","have","a","to","the","on","is","a","often","in","that","to","the","has","and","and","has","for","with","and","the","The","does","not","any","such","as","or","the","or","other","for","were","only","in","but","are","now","of","some","and","a","of","The","most","for","this","is","Although","and","are","in","and","the","are","and","in"]

// Text to be displayed below the answer/title
var textoOriginal = `
JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World C Web, alongside HTML and CSS. As of 2022, 98% of websites use JavaScript on the client side for webpage behavior, often incorporating third-party libraries. All major web browsers have a dedicated JavaScript engine to execute the code on users' devices. JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard.[10] It has dynamic typing, prototype-based object-orientation, and first-class functions. It is multi-paradigm, supporting event-driven, functional, and imperative programming styles. It has application programming interfaces (APIs) for working with text, dates, regular expressions, standard data structures, and the Document Object Model (DOM).The ECMAScript standard does not include any input/output (I/O), such as networking, storage, or graphics facilities. In practice, the web browser or other runtime system provides JavaScript APIs for I/O.JavaScript engines were originally used only in web browsers, but are now core components of some servers and a variety of applications. The most popular runtime system for this usage is Node.js.Although Java and JavaScript are similar in name, syntax, and respective standard libraries, the two languages are distinct and differ greatly in design.
`
function openNav(){
    document.getElementById("myNav").style.width= '45%'
}
function closeNav(){
    document.getElementById("myNav").style.width= '0%'
}


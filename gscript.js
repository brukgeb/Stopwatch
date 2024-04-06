// Constants
const fixButton = document.querySelector("#fixButton");
const pasteButton = document.querySelector("#pasteButton");
const clearButton = document.querySelector("#clearButton");
const fixedText = document.querySelector("#fixedText");
const originalText = document.querySelector("#originalText");
const originalTextCounter = document.querySelector("#originalTextCounter");
const fixedTextCounter = document.querySelector("#fixedTextCounter");
const fixGrammarTemplate = 'Your task is to correct any grammatical errors in the following text. Please ensure that you only focus on grammar and do not make any changes to the content or structure of the text. Once you have completed the corrections, kindly return only the corrected text. (After that, rewrite the text in 4 different tones and include the tone name used:\n'

const url = "https://epicaz-testapi.hf.space/chat2";
const model = 'gpt-3.5-turbo';
const headers = {
    "User-Agent": navigator.userAgent,
    "Content-Type": "application/json"
};

// Event Listeners
fixButton.addEventListener("click", fixGrammar);
pasteButton.addEventListener("click", pasteFromClipboard);
clearButton.addEventListener("click", clearOriginalText);
originalText.addEventListener("input", () => updateCounter(originalTextCounter, originalText.value.length));
fixedText.addEventListener("input", () => updateCounter(fixedTextCounter, fixedText.value.length));


// Functions
async function fixGrammar() {
    const text = originalText.value.trim();
    if (!text) return;

    fixedText.textContent = `Fixing your text using AI...`;
    try {
        const response = await getResponse(fixGrammarTemplate + text);
        fixedText.textContent = response;

        if (typeof response === 'string' || Array.isArray(response)) {
            updateCounter(fixedTextCounter, response.length);
        } else {
            console.error('Response does not have a length property');
        }
    } catch (error) {
        console.error(error);
        fixedText.textContent = error;
    }
}

async function getResponse(text) {
    const body = { "message": text, "model": model };
    try {
        const response = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
        const data = await response.json();
        if (data["text"]) {
            return data["text"];
        } else {
            return data;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


async function pasteFromClipboard() {
    if (!navigator.clipboard) {
        // Clipboard API not available
        return;
    }
    const text = await navigator.clipboard.readText();
    originalText.value = text;
    updateCounter(originalTextCounter, originalText.value.length);
}

function clearOriginalText() {
    originalText.value = '';
    updateCounter(originalTextCounter, originalText.value.length);
}


function updateCounter(counter, value) {
    counter.textContent = `${value}`;
}

// Initial Counter Updates
updateCounter(originalTextCounter, originalText.value.length);
updateCounter(fixedTextCounter, fixedText.value.length);

import { go } from "../chess";
import { getBoard } from "../chessboard";

declare const window: any;

export const RunRecognition = (button: HTMLButtonElement) => {
    const isTestScenario = false;
    if (isTestScenario) {
        button.innerText = "TestScenario...";
        processTranscript("e2e4", button);
        return;
    }

    console.log("Loading Recognition API");

    var recognition = new window.webkitSpeechRecognition();
    var speechRecognitionList = new window.webkitSpeechGrammarList();
    speechRecognitionList.addFromString(getGrammer(), 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function (event: any) {
        var transcript = event.results[0][0].transcript;
        console.log("Transcript received: " + transcript);
        processTranscript(transcript, button)
        button.innerText = "Processing...";
    }

    recognition.onstart = function () {
        button.innerText = 'Listening...';
    }

    recognition.onspeechend = function () {
        button.innerText = 'Thinking...';
    }

    recognition.onerror = function (event: any) {
        button.innerText = "Try again...";
        if (event.error == 'no-speech') {
            console.log('No speech was detected. Try again.');
        };
    }

    recognition.start();
    console.log("Started Recognition API");
}

const getGrammer = () => {
    var grammar = '#JSGF V1.0;';
    grammar += 'grammar com.chess.vocab;';
    grammar += 'public <column> = [ alpha | bravo | charlie | delta | echo | foxtrot | golf | hotel ];';
    grammar += 'public <row> = [ one | two | three | four | five | six | seven | eight ];';
    grammar += "public <basiccommand> = <row> <column> <row> <column>;"
    return grammar;
}

const processTranscript = (transcript: string, button: HTMLButtonElement) => {
    var sentence = transcript.toLowerCase().replace(".", "").split(' ');
    if (sentence.length === 1 && sentence[0].length === 4) {
        const board = getBoard();

        if (board) {
            const success = go(board, sentence[0]);
            board && board.clearMarkedArrows();
        }

        button.innerText = "🎤 Ready!";
    } else {
        button.innerText = "Try again...";
        console.log("Sentence isnt the right length.");
        return;
    }
};
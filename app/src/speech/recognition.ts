import { go } from "../chess";
import { getBoard } from "../chessboard";
import { getGrammer } from "./grammer";

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
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function (event: any) {
        var transcript = event.results[event.results.length - 1][0].transcript;
        console.log("Transcript received: " + transcript);
        button.innerText = "🎤 Processing...";
        processTranscript(transcript, button)
    }

    recognition.onstart = function () {
        button.innerText = '🎤 Listening...';
    }

    recognition.onspeechend = function () {
        button.innerText = '🎤 Thinking...';
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

const processTranscript = (transcript: string, button: HTMLButtonElement) => {
    var sentence = transcript.toLowerCase().replaceAll(".", "").replaceAll(" ", "");
    if (sentence.length === 4) {
        const board = getBoard();

        if (board) {
            const success = go(board, sentence);
            board && board.clearMarkedArrows();
            button.innerText = "🎤";
            return;
        } else {
            button.innerText = "Board not found...";
            return;
        }
    } else {
        button.innerText = "🎤 Try again...";
        console.log("Sentence isnt the right length.");
        return;
    }
};
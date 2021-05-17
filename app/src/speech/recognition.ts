import { go, parseMoveInput } from "../chess";
import { getBoard } from "../chessboard";
import { getCommand } from "./commands";
import { getGrammar } from "./Grammar";
import { setStatusSpanText } from "./inject";
import { getNotation } from "./pieceSpeechData";
import { SpeechStrings } from "./strings";

declare const window: any;
var recognition: any = undefined;
var speechRecognitionList = undefined;

export const StartRecognition = (getIsListening: Function) => {
    if (getIsListening()) {
        if (recognition != undefined) {
            recognition.stop();
        }

        // wipeout existing recongition objects incase they get foobared
        SetupRecognition(getIsListening);
        recognition.start();
    }
}

export const StopRecognition = (getIsListening: Function) => {
    if (getIsListening()) {
        console.error("Tried to stop recognition while still listening.");
    }

    if (recognition) {
        recognition.stop();
    }
}

const SetupRecognition = (getIsListening: Function) => {
    const isTestScenario = false;
    if (isTestScenario) {
        // button.innerText = "TestScenario...";
        processTranscript("e2e4");
        return;
    }

    console.log("Loading Recognition API");
    recognition = new window.webkitSpeechRecognition();
    speechRecognitionList = new window.webkitSpeechGrammarList();
    speechRecognitionList.addFromString(getGrammar(), 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function (event: any) {
        var result = event.results[event.results.length - 1];
        var transcript = result[0].transcript;
        for (var counter = 0; counter < result.length; counter++) {
            console.log("Transcript received [0]: ", result);
        }
        console.log("Transcript received: " + transcript);
        setStatusSpanText(SpeechStrings.StatusSpan.processing);
        processTranscript(transcript)
    }

    recognition.onstart = function () {
        setStatusSpanText(SpeechStrings.StatusSpan.listening);
    }

    recognition.onend = function () {
        setStatusSpanText(SpeechStrings.StatusSpan.onEnd);
        if (getIsListening()) {
            console.log("restarting...");
            StartRecognition(getIsListening);
        }
    }

    recognition.onspeechend = function () {
        setStatusSpanText(SpeechStrings.StatusSpan.onSpeechEnd);
    }

    recognition.onerror = function (event: any) {
        setStatusSpanText(SpeechStrings.StatusSpan.onError);
        if (event.error == 'no-speech') {
            console.log('No speech was detected. Try again.');
        };
    }

    console.log("Started Recognition API");
}

const punctuationToRemove = [".", ",", "-", "?"];

const processTranscript = (transcript: string) => {
    var sentence = transcript.toLowerCase();
    for (var entry of punctuationToRemove) {
        sentence = sentence.replaceAll(entry, "");
    }

    var command = getCommand(sentence);
    if (command) {
        command.action();
        return;
    }

    var notation = getNotation(sentence);
    if (notation) {
        var moveInput = parseMoveInput(notation);
        if (moveInput && moveInput.from) {
            const board = getBoard();

            if (board) {
                // board.clearMarkedArrows();
                // board.markArrow(moveInput.from, moveInput.to);
                const success = go(board, notation);
                setStatusSpanText(SpeechStrings.StatusSpan.successStart + sentence + SpeechStrings.StatusSpan.successEnd);
                return;
            } else {
                setStatusSpanText(SpeechStrings.StatusSpan.boardNotFound);
                return;
            }
        }
    }
    
    if (notation) {
        
    } else {
        setStatusSpanText(SpeechStrings.StatusSpan.didNotUnderstandStart + transcript + SpeechStrings.StatusSpan.didNotUnderstandEnd);
        return;
    }
};
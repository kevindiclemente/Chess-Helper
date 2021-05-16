import { go } from "../chess";
import { getBoard } from "../chessboard";
import { getGrammer } from "./grammer";
import { setStatusSpanText } from "./inject";
import { SpeechStrings } from "./strings";

declare const window: any;
var recognition: any = undefined;
var speechRecognitionList = undefined;

export const StartRecognition = (statusSpan: HTMLElement, getIsListening: Function) => {
    if (getIsListening()) {
        if (recognition != undefined) {
            recognition.stop();
        }

        // wipeout existing recongition objects incase they get foobared
        SetupRecognition(statusSpan, getIsListening);
        recognition.start();
    }
}

export const StopRecognition = (statusSpan: HTMLElement, getIsListening: Function) => {
    if (getIsListening()) {
        console.error("Tried to stop recognition while still listening.");
    }

    if (recognition) {
        recognition.stop();
    }
}

const SetupRecognition = (statusSpan: HTMLElement, getIsListening: Function) => {
    const isTestScenario = false;
    if (isTestScenario) {
        // button.innerText = "TestScenario...";
        processTranscript("e2e4", statusSpan);
        return;
    }

    console.log("Loading Recognition API");
    recognition = new window.webkitSpeechRecognition();
    speechRecognitionList = new window.webkitSpeechGrammarList();
    speechRecognitionList.addFromString(getGrammer(), 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function (event: any) {
        var transcript = event.results[event.results.length - 1][0].transcript;
        console.log("Transcript received: " + transcript);
        setStatusSpanText(SpeechStrings.StatusSpan.processing);
        processTranscript(transcript, statusSpan)
    }

    recognition.onstart = function () {
        setStatusSpanText(SpeechStrings.StatusSpan.listening);
    }

    recognition.onend = function () {
        setStatusSpanText(SpeechStrings.StatusSpan.onEnd);
        if (getIsListening()) {
            console.log("restarting...");
            StartRecognition(statusSpan, getIsListening);
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

const processTranscript = (transcript: string, statusSpan: HTMLElement) => {
    var sentence = transcript.toLowerCase().replaceAll(".", "").replaceAll(" ", "");
    if (sentence.length === 4) {
        const board = getBoard();

        if (board) {
            const success = go(board, sentence);
            board && board.clearMarkedArrows();
            setStatusSpanText(SpeechStrings.StatusSpan.successStart + sentence + SpeechStrings.StatusSpan.successEnd);
            return;
        } else {
            setStatusSpanText(SpeechStrings.StatusSpan.boardNotFound);
            return;
        }
    } else {
        setStatusSpanText(SpeechStrings.StatusSpan.didNotUnderstandStart + transcript + SpeechStrings.StatusSpan.didNotUnderstandEnd);
        return;
    }
};
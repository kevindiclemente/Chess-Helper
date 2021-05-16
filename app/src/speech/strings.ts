export namespace SpeechStrings {
    export namespace ActionButton {
        export const startListening = "🎤 Start Listening";
        export const stopListening = "🎤 Stop Listening";
    }

    export namespace StatusSpan {
        const baseStatusString = "🎤 Status: ";
        const baseResultString = "🎤 Result: ";
        export const testScenario = baseStatusString + "Running Test Scenario...";
        export const notRunning = baseStatusString + "Not currently running.";
        export const onEnd = baseStatusString + "Stopped.";
        export const listening = baseStatusString + "Listening...";
        export const onSpeechEnd = baseStatusString + "Processing...";
        export const onError = baseResultString + "Error...\n" + listening;
        export const boardNotFound = baseResultString + "Board not found...\n" + listening;
        export const didNotUnderstandStart = baseResultString + "Your voice assistant didn't understand \"";
        export const didNotUnderstandEnd = "\".\n" + listening;
        export const successStart = baseResultString;
        export const successEnd = "\n" + listening;
        export const processing = baseStatusString + "Processing...";
    }
}



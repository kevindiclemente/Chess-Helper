console.log("Starting Chess Voice Extension");

import { StartRecognition, StopRecognition } from "./recognition";
import { SpeechStrings} from "./strings";

var isListening = false;
const statusSpan = document.createElement("span");

const getIsListening = () => {
    return isListening;
}

export const setStatusSpanText = (uiString: string) => {
    statusSpan.innerText = !isListening ? SpeechStrings.StatusSpan.notRunning : uiString;
}

const setActionButtonText = (actionButtonSpan: HTMLSpanElement, statusSpan: HTMLSpanElement) => {
    actionButtonSpan.innerText = isListening ? SpeechStrings.ActionButton.stopListening : SpeechStrings.ActionButton.startListening;
    setStatusSpanText(SpeechStrings.StatusSpan.listening);
}

export const injectSpeechControls = async () => {
    // declare custom ui elements
    const actionButton = document.createElement("button");
    const actionButtonSpan = document.createElement("span");
 
    // configure inital ui settings
    statusSpan.className = "ui_v5-button-component ui_v5-button-full "
    setActionButtonText(actionButtonSpan, statusSpan);
    actionButtonSpan.style.minWidth = "20px";
    actionButton.className = "ui_v5-button-component ui_v5-button-basic";
    actionButton.onclick = () => {
        isListening = !isListening;
        setActionButtonText(actionButtonSpan, statusSpan);
        if (isListening) {
            StartRecognition(statusSpan, getIsListening);
        } else {
            StopRecognition(statusSpan, getIsListening);
        }
    };

    // parent custom html elements
    actionButton.appendChild(actionButtonSpan);

    // retrieve existing elements
    console.log("Attaching elements...");
    const parents = [
        "body > div.layout-sidebar.sidebar > div.game-control-buttons-wrapper",
        "#board-layout-sidebar > div > div.tab-container-component.tab-content-component > div > div.live-game-buttons-component > div.move-list-buttons-component.live-game-buttons-arrows",
        "#board-layout-sidebar > div > div > div.rated-sidebar-footer > div.rated-sidebar-primary-control-wrapper > div"];
    await AttachToPage(actionButton, parents, InsertMode.inside);
    await AttachToPage(statusSpan, parents, InsertMode.before);
}

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

enum InsertMode {
    before,
    inside
}

// inject the div after page load complete
async function AttachToPage(element: HTMLElement, parents: string[], insertMode: InsertMode) {
    while (true) {
        for (var entry in parents) {
            var controls = document.querySelector(parents[entry]);
            if (controls) {
                switch (insertMode) {
                    case InsertMode.before:
                        var parent = controls.parentNode;
                        parent?.insertBefore(element, controls);
                        break;
                    case InsertMode.inside:
                        controls.appendChild(element);
                        break;
                }
                console.log("Element attached.");
                return;
            }
        }

        console.log("Waiting for element to attach to...");
        await sleep(1000);
    }
}
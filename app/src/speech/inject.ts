console.log("Starting Chess Voice Extension");

import { RunRecognition } from "./recognition";

export const injectSpeechControls = async () => {
    // declare custom ui elements
    const actionButton = document.createElement("button");
    const actionButtonSpan = document.createElement("span");

    // configure inital ui settings
    actionButton.className = "ui_v5-button-component ui_v5-button-basic";
    actionButton.onclick = () => {
        RunRecognition(actionButton)
    };
    actionButton.innerText = "🎤";
    actionButtonSpan.className = "icon-font-chess ui_v5-button-icon";

    // parent custom html elements
    actionButton.appendChild(actionButtonSpan);

    // retrieve existing elements
    const vsComputerWrapperPath = "body > div.layout-sidebar.sidebar > div.game-control-buttons-wrapper";
    const vsFriendWrapperPath = "#board-layout-sidebar > div > div.tab-container-component.tab-content-component > div > div.live-game-buttons-component > div.move-list-buttons-component.live-game-buttons-arrows";

    await AttachToPage(actionButton, vsComputerWrapperPath, vsFriendWrapperPath);
}

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// inject the div after page load complete
async function AttachToPage(actionButton: HTMLButtonElement, vsComputerWrapperPath: string, vsFriendWrapperPath: string) {
    var attached = false;
    while (!attached) {
        var cpuButtonControls = document.querySelector(vsComputerWrapperPath);
        if (cpuButtonControls) {
            cpuButtonControls.appendChild(actionButton);
            attached = true;
            console.log("Control mounted.");
            break;
        }

        var vsFriendButtonControls = document.querySelector(vsFriendWrapperPath);
        if (vsFriendButtonControls) {
            vsFriendButtonControls.appendChild(actionButton);
            attached = true;
            console.log("Control mounted.");
            break;
        }

        console.log("No button controls found to attach to.");
        await sleep(3000);
    }
}
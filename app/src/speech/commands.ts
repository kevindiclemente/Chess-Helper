import { setStatusSpanText } from "./inject";
import { SpeechStrings } from "./strings";

export interface CommandSyntax {
    id: number,
    speech: string[],
    action: Function,
}

export const restart: CommandSyntax = {
    id: 1,
    speech: [
        "restart puzzle",
    ],
    action: () => {
        var querySelector = "#board-layout-sidebar > div > div > div.rated-sidebar-footer > div.rated-sidebar-primary-control-wrapper > div > button.ui_v5-button-component.ui_v5-button-danger.primary-control-buttons-button.primary-control-buttons-first.primary-control-buttons-fourth";
        var element: HTMLElement | null = document.querySelector(querySelector);
        if (element) {
            element.click();
            return;
        }

        setStatusSpanText(SpeechStrings.StatusSpan.Puzzles.noRestart);
    }
};

export const next: CommandSyntax = {
    id: 2,
    speech: [
        "next puzzle",
    ],
    action: () => {
        var querySelectors = [
            "#board-layout-sidebar > div > div > div.rated-sidebar-footer > div.rated-sidebar-primary-control-wrapper > div > button:nth-child(5) > span",
            "#board-layout-sidebar > div > div > div.rated-sidebar-footer > div.rated-sidebar-primary-control-wrapper > div > button.ui_v5-button-component.ui_v5-button-primary.ui_v5-button-full.primary-control-buttons-button.primary-control-buttons-half > span"
        ];

        for (var querySelector of querySelectors) {
            // casting to any, otherwise line 36 complaines about potential null
            var element = document.querySelector(querySelector);
            if (element !== null) {
                var parent = element.parentElement;
                if (parent) {
                    parent.click();
                    setStatusSpanText(SpeechStrings.StatusSpan.listening);
                    return;
                }
            }
        }

        setStatusSpanText(SpeechStrings.StatusSpan.Puzzles.noNext);
    }
};

const commands: CommandSyntax[] = [
    restart,
    next
];

export const getCommand = (sentence: string): CommandSyntax | undefined => {
    for (var command of commands) {
        for (var speech of command.speech) {
            if (sentence.indexOf(speech) >= 0) {
                return command;
            }
        }
    }

    return undefined;
};
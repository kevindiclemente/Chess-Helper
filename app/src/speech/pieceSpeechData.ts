import { columnList, columnUtteranceList, pieceUtteranceList, rowList, rowUtteranceList } from "./english";
import { PieceSpeechData } from "./Grammar";

export interface NotationResult {
    foundMatch: boolean;
    errorMessage?: string;
    command?: string;
    index?: number
};

interface UtteranceMatchResult {
    match: string,
    index: number
};

// quick matching for best case scenarios
const getExactUCIMatch = (words: string[]): NotationResult[] => {
    var matches: NotationResult[] = [];
    for (var word of words) {
        if (word.length === 2 && 
            columnList.some(x => x === word[0]) && 
            rowList.some(x => x === word[1])) {
            matches.push({
                foundMatch: true,
                command: word,
                index: words.indexOf(word)
            });
        } else if (word.length === 4 && 
            columnList.some(x => x === word[0]) &&
            rowList.some(x => x === word[1]) && 
            columnList.some(x => x === word[2]) &&
            rowList.some(x => x === word[3])) {
            matches.push({
                foundMatch: true,
                command: word,
                index: words.indexOf(word)
            });
        }
    }
    return matches;
}

const getUtteranceMatch = (words: string[], list: PieceSpeechData[]): UtteranceMatchResult[] => {
    var matches: UtteranceMatchResult[] = [];
    for (var entry of list) {
        for (var utterance of entry.utterances) {
            var index = words.indexOf(utterance);
            if (index > -1) {
                matches.push({
                    match: entry.mapping,
                    index: index
                });
            }
        }
    }
    return matches;
}

const matchAlgebraicNotation = (transcript: string): NotationResult => {
    const words = transcript.split(' ');

    // 1. find a piece
    var pieces = getUtteranceMatch(words, pieceUtteranceList);
    for (var piece of pieces) {
        if (words.length < piece.index + 1) {
            continue;
        }

        // 2. find a uci match
        var matches = matchUCINotation(words.slice(piece.index + 1));
        for (var match of matches) {
            if (match.foundMatch && match.command) {
                return {
                    foundMatch: true,
                    command: piece.match + match.command
                }
            }
        }
    }

    return {
        foundMatch: false,
        errorMessage: "Found no algebraic notation match."
    };
}

// need to match both words "sea four", and letters "c4"
// the main pattern is: row column
const matchUCINotation = (words: string[]): NotationResult[] => {
    var results: NotationResult[] = [];
    var exactMatches = getExactUCIMatch(words);
    for (var exactMatch of exactMatches) {
        results.push({
            foundMatch: true,
            command: exactMatch.command
        });
    }
    var columns = getUtteranceMatch(words, columnUtteranceList);
    for (var column of columns) {
        if (words.length < column.index + 1) {
            continue;
        }

        var rows = getUtteranceMatch(words.slice(column.index + 1), rowUtteranceList);
        for (var row of rows) {
            if (words.length < row.index + 1) {
                continue;
            }

            results.push({
                foundMatch: true,
                command: column.match + row.match,
                index: row.index
            });
        }
    }

    return results;
}

const matchFullUCINotation = (transcript: string): NotationResult => {
    const words = transcript.split(' ');

    var matches = matchUCINotation(words);
    var completeNotation = matches.filter(x => x.command && x.command.length === 4);
    if (completeNotation.length > 0){
        return completeNotation[0];
    }
    
    if (matches.length >= 2) {
        if (matches[0].command && matches[1].command) {
            return {
                foundMatch: true,
                command: matches[0].command + matches[1].command
            };
        }
    }

    return {
        foundMatch: false,
        errorMessage: "Found no algebraic notation match."
    };
}

export const getNotation = (transcript: string): string | undefined => {
    var algebraicNotation = matchAlgebraicNotation(transcript);
    if (algebraicNotation.foundMatch && algebraicNotation.command) {
        return algebraicNotation.command;
    }

    var uciNotation = matchFullUCINotation(transcript);
    if (uciNotation.foundMatch && uciNotation.command) {
        return uciNotation.command;
    }

    return undefined;
}
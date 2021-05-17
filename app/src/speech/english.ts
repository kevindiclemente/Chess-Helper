import { PieceSpeechData } from "./Grammar";

export const pieceUtteranceList: PieceSpeechData[]  = [
    {
        utterances: [
            "pawn"
        ],
        mapping: ""
    },
    {
        utterances: [
            "rook",
            "rock",
            "rocky",
            "rick",
            "wreck"
            // omitting "castle" and reserving it for the act of castling
        ],
        mapping: "R"
    },
    {
        utterances: [
            "knight",
            "night",
            "nite",
            "nike"
        ],
        mapping: "N"
    },
    {
        utterances: [
            "bishop",
        ],
        mapping: "B"
    },
    {
        utterances: [
            "queen"
        ],
        mapping: "Q"
    },
    {
        utterances: [
            "king"
        ],
        mapping: "K"
    }
];

export const columnUtteranceList: PieceSpeechData[]  = [
    {
        utterances: [
            "a",
            "alpha"
        ],
        mapping: "a"
    },
    {
        utterances: [
            "b",
            "bravo",
            "be", 
            "bee"
        ],
        mapping: "b"
    },
    {
        utterances: [
            "c",
            "charlie",
            "sea",
            "see",
        ],
        mapping: "c"
    },
    {
        utterances: [
            "d",
            "delta"
        ],
        mapping: "d"
    },
    {
        utterances: [
            "e",
            "echo"
        ],
        mapping: "e"
    },
    {
        utterances: [
            "f",
            "foxtrot"
        ],
        mapping: "f"
    },
    {
        utterances: [
            "g",
            "golf"
        ],
        mapping: "g"
    },
    {
        utterances: [
            "h",
            "hotel",
            "age"
        ],
        mapping: "h"
    }
];

export const rowColumnUtteranceList: PieceSpeechData[] = [

];

export const rowUtteranceList: PieceSpeechData[]  = [
    {
        utterances: [
            "1",
            "one"
        ],
        mapping: "1"
    },
    {
        utterances: [
            "2",
            "two",
            "to", 
            "too"
        ],
        mapping: "2"
    },
    {
        utterances: [
            "3",
            "three"
        ],
        mapping: "3"
    },
    {
        utterances: [
            "4",
            "four",
            "for",
            "fore"
        ],
        mapping: "4"
    },
    {
        utterances: [
            "5",
            "five"
        ],
        mapping: "5"
    },
    {
        utterances: [
            "6",
            "six"
        ],
        mapping: "6"
    },
    {
        utterances: [
            "7",
            "seven"
        ],
        mapping: "7"
    },
    {
        utterances: [
            "8",
            "eight"
        ],
        mapping: "8"
    }
];

export const columnList: string[] = columnUtteranceList.map(x => x.mapping);
export const rowList: string[] = rowUtteranceList.map(x => x.mapping);
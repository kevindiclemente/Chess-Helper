import { columnUtteranceList, pieceUtteranceList, rowUtteranceList } from "./english";

export const getGrammar = () => {
    var grammar = '#JSGF V1.0;';
    grammar += 'grammar com.chess.vocab;';

    // UCI notation
    grammar += convertToGrammar("column", columnUtteranceList);
    grammar += convertToGrammar("row", rowUtteranceList);
    grammar += "public <ucinotationpiece> = <row> <column>;"
    grammar += "public <ucinotation> = <ucinotationpiece> <ucinotationpiece>;"

    // algebration notation
    grammar += convertToGrammar("pieceutterance", pieceUtteranceList);
    grammar += "public <optionalrow> = <row> | <column>;"
    grammar += "public <algebraicnotation> = <pieceutterance> [ <optionalrow> ] <row> <column>;"
    return grammar;
}

export interface PieceSpeechData {
    utterances: string[],
    mapping: string,
};

const convertToGrammar = (name: string, list: PieceSpeechData[]) => {
    var grammar = 'public <' + name + '> = [';
    grammar += list.map(x =>
        `(${x.utterances.join(' | ')}) {${x.mapping}}`
    ).join(' | ');
    grammar += ' ];';
    return grammar
}
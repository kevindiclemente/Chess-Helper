export const getGrammer = () => {
    var grammar = '#JSGF V1.0;';
    grammar += 'grammar com.chess.vocab;';
    grammar += 'public <column> = [ alpha | bravo | charlie | delta | echo | foxtrot | golf | hotel ];';
    grammar += 'public <row> = [ one | two | three | four | five | six | seven | eight ];';
    grammar += "public <basiccommand> = <row> <column> <row> <column>;"
    return grammar;
}
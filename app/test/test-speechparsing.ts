import jsDomGlobal from 'jsdom-global';
import assert from 'assert';
import { getNotation } from '../src/speech/pieceSpeechData';
import { getCommand, restart, next } from '../src/speech/commands';

jsDomGlobal();

describe('Piece Movement Parsing', function () {
    it('parse: pawn a4', function () {
        const result = getNotation('pawn a4');
        assert.strictEqual(result, 'a4');
    });
    it('parse: knight c3', function () {
        const result = getNotation('knight c3');
        assert.strictEqual(result, 'Nc3');
    });
    it('parse: d5e4', function () {
        const result = getNotation('d5e4');
        assert.strictEqual(result, 'd5e4');
    });
    // future scenarios:
    // ' when you are talking mid sentence pawn a4 does it work?'
    // it('parse: d5e for', function () {
    //     const result = getNotation('d5e for');
    //     assert.strictEqual(result, 'd5e4');
    // });
    // it('parse: f-4c seven', function () {
    //     const result = getNotation('f-4c seven');
    //     assert.strictEqual(result, 'f4c7');
    // });
    // it('parse: bishop sea three', function () {
    //     const result = getNotation('bishop sea three');
    //     assert.strictEqual(result, 'Bc3');
    // });
});

describe('Command Parsing', function () {
    it('parse: restart puzzle', function () {
        const result = getCommand('restart puzzle');
        assert.strictEqual(result.id, restart.id);
    });
    it('parse: next puzzle', function () {
        const result = getCommand('next puzzle');
        assert.strictEqual(result.id, next.id);
    });
});
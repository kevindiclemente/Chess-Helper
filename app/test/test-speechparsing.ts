import jsDomGlobal from 'jsdom-global';
import assert from 'assert';
import { getNotation } from '../src/speech/pieceSpeechData';

jsDomGlobal();

describe('Speech Parsing', function () {
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
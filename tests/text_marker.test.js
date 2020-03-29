const TextMarker = require('./../src/text_marker.js');

/**
 * The string 'A carpet is an awesome object' can be divided into character indexes:
 *
 * 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28
 * A  ·  c  a  r  p  e  t  ·  i  s  ·  a  n  ·  a  w  e  s  o  m  e  ·  o  b  j  e  c  t
 *
 * These indexes may be used for highlighting.
 */

test('text can be set using constructor', () => {
    const text = 'A carpet is an awesome object';

    const textMarker = new TextMarker(text);

    expect(textMarker.rawText).toBe(text);
    expect(textMarker.text).toBe(text);
});

test('text is undefined when not set', () => {
    const textMarker = new TextMarker();

    expect(textMarker.rawText).toBe(undefined);
    expect(textMarker.text).toBe(undefined);
});

test('multiple markings can be added', () => {
    const text = 'A carpet is an awesome object';

    const textMarker = new TextMarker(text);
    textMarker.addMarking([0, 1], 'red');
    textMarker.addMarking([2, 8], 'yellow');

    expect(textMarker.markings[0].startIndex).toBe(0);
    expect(textMarker.markings[0].endIndex).toBe(1);
    expect(textMarker.markings[0].color).toBe('red');

    expect(textMarker.markings[1].startIndex).toBe(2);
    expect(textMarker.markings[1].endIndex).toBe(8);
    expect(textMarker.markings[1].color).toBe('yellow');

    const expectedHtml = '<mark style="background-color: red;">A</mark> <mark style="background-color: yellow;">carpet</mark> is an awesome object';

    expect(textMarker.text).toBe(expectedHtml);
});

test('markings can overlap', () => {
    const text = 'A carpet is an awesome object';

    const textMarker = new TextMarker(text);
    textMarker.addMarking([2, 8], 'yellow');
    textMarker.addMarking([2, 5], 'green');

    const expectedHtml = 'A <mark style="background-color: yellow;"><mark style="background-color: green;">car</mark>pet</mark> is an awesome object';

    expect(textMarker.text).toBe(expectedHtml);
});

test('marking can go up to last character', () => {
    const text = 'A carpet is an awesome object';

    const textMarker = new TextMarker(text);
    textMarker.addMarking([15, 29], 'blue');

    const expectedHtml = 'A carpet is an <mark style="background-color: blue;">awesome object</mark>';

    expect(textMarker.text).toBe(expectedHtml);
});

test('marking works if index is before first character', () => {
    const text = 'A carpet is an awesome object';

    const textMarker = new TextMarker(text);
    textMarker.addMarking([-1, 1], 'red');

const expectedHtml = '<mark style="background-color: red;">A</mark> carpet is an awesome object';

    expect(textMarker.text).toBe(expectedHtml);
});

test('marking works if index is after last character', () => {
    const text = 'A carpet is an awesome object';

    const textMarker = new TextMarker(text);
    textMarker.addMarking([15, 29+1], 'blue');

    const expectedHtml = 'A carpet is an <mark style="background-color: blue;">awesome object</mark>';

    expect(textMarker.text).toBe(expectedHtml);
});

class TextMarking
{
    constructor(textSize, indexes, color)
    {
        this.textSize = textSize;
        this.startIndex = indexes[0];
        this.endIndex = indexes[1];
        this.color = color;
    }

    get startIndex()
    {
        return this._startIndex;
    }

    set startIndex(startIndex)
    {
        if (startIndex < 0) {
            startIndex = 0;
        }

        this._startIndex = startIndex;
    }

    get endIndex()
    {
        return this._endIndex;
    }

    set endIndex(endIndex)
    {
        if (endIndex > this.textSize) {
            endIndex = this.textSize;
        }

        this._endIndex = endIndex;
    }

    get openingMarker()
    {
        // WARN: No XSS protection applied
        return `<mark style="background-color: ${this.color};">`;
    }

    get closingMarker()
    {
        return '</mark>';
    }
}

class TextMarker
{
    constructor(text)
    {
        this.rawText = text;
        this.markings = [];
    }

    get text()
    {
        if (this.rawText === undefined) {
            return this.rawText;
        }

        let formattedTextArray = [];

        for (let i = 0; i < this.rawText.length; i++) {
            const char = this.rawText[i];

            formattedTextArray[i] = [char];

            this.markings.reverse().forEach((marking) => {
                if (marking.startIndex === i) {
                    formattedTextArray[i].unshift(marking.openingMarker);
                }

                if (marking.endIndex === i + 1) {
                    formattedTextArray[i].push(marking.closingMarker);
                }
            });
        }

        const formattedTextArrayFlattened = [].concat(...formattedTextArray);

        const formattedText = formattedTextArrayFlattened.join('');

        return formattedText;
    }

    addMarking(indexes, color)
    {
        const textSize = this.rawText.length;

        this.markings.push(
            new TextMarking(textSize, indexes, color)
        );
    }
}

module.exports = TextMarker;

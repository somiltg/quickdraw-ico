const path = require('path');
const fs = require('fs');
const line = require('d3-shape').line();

const svgWrapper = '<svg id="$ID" xmlns="http://www.w3.org/2000/svg" width="256" height="256" stroke-width="1px"' +
    ' fill="none"  stroke="#333">$SYMBOL</svg>';

function getAvailableWords(dir) {
    return fs
        .readdirSync(dir)
        .filter(f => /\.ndjson$/.test(f))
        .map(f => f.substring(0, f.indexOf('.ndjson')));
}

function readFile(
    file,
    filters = {sample: 10, recognized: true, countrycode: 'US'}
) {
    const COUNTRY_REGEX = new RegExp(`"countrycode":"${filters.countrycode}"`);
    const RECOGNIZED_REGEX = /"recognized":true/;
    const UNRECOGNIZED_REGEX = /"recognized":false/;
    return String(fs.readFileSync(file))
        .split('\n')
        .filter(line => line.length > 0)
        .filter(
            line =>
                (filters.recognized === true
                    ? RECOGNIZED_REGEX.test(line)
                    : filters.recognized === false
                        ? UNRECOGNIZED_REGEX.test(line)
                        : true)
        )
        .filter(
            line =>
                (filters.countrycode !== undefined
                    ? COUNTRY_REGEX.test(line)
                    : true)
        )
        .filter((_, i) => (filters.sample > 0 ? i < filters.sample : true))
        .map(line => JSON.parse(line));
}

function zip(a1, a2) {
    return a1.map((a, i) => [a, a2[i]]);
}

function concatStrokes(drawing) {
    return drawing.drawing.map(([xs, ys]) => zip(xs, ys));
}

function toSVG(strokes, id) {
    const lines = strokes.map(stroke => line(stroke)).join('');
    const g = `<path d="${lines}" />`;
    return svgWrapper.replace('$SYMBOL', g).replace('$ID', id);
}

function noWhitespace(str) {
    return str.replace(/\s+/g, '-');
}

module.exports = function generate(
    config = {
        drawingsDir: path.resolve(__dirname, 'drawings'),
        outputDir: path.resolve(__dirname, 'svg'),
        filter: {
            countrycode: 'US',
            words: [], // all words
            recognized: true,
            sample: 0, // How many to pick per word. 0 = all
        },
    }
) {
    const words = config.filter.words.length === 0
        ? getAvailableWords(config.drawingsDir)
        : config.filter.words;
    const symbols = [];
    words.forEach(word => {
        console.log(`[${word}] Reading file...`);
        const drawings = readFile(
            `${config.drawingsDir}/${word}.ndjson`,
            config.filter
        );
        console.log(`[${word}] Generate SVGs...`);
        Array.prototype.push.apply(
            symbols,
            drawings.map((drawing, i) => ({
                symbol: toSVG(
                    concatStrokes(drawing),
                    `${noWhitespace(drawing.word)}-${i}`
                ),
                id: `${noWhitespace(drawing.word)}-${i}`
            }))
        );
    });
    symbols.forEach(symbol => {
        fs.writeFileSync(`${config.outputDir}/${symbol.id}.svg`, symbol.symbol);
    });
    console.log(`Done, generated ${symbols.length} icons.`);
};

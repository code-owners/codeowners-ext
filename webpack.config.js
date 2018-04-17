const path = require('path');

module.exports = {
    entry: {
        content: './src/index.js',
        background: './src/background.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'ext/lib'),
    },
    node: {
        fs: 'empty',
    },
};

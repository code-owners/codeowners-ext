const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'ext.js',
        path: path.resolve(__dirname, 'ext/dist'),
    },
    node: {
        fs: 'empty',
    },
};

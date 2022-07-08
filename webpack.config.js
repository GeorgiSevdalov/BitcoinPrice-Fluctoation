module.ecports = {
    entry: './src/bitFluctoation.ts',
    output: {
        filename: 'bitFluctoation.js',
        path: __dirname + './dist'
    },
    resolve: {
        extension: ['.ts', '.js']
    },
    module: {
        rules: [
            {test: /\.ts$/, use: 'awesome-typescript-loader'}
        ]
    }
}
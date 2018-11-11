import path from 'path';

export default {
    context: __dirname,
    entry: './example.js',
    mode: 'development',
    output: {
        path: '/',
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: {
                loader: path.resolve(__dirname, '../index'),
                options: { }
            }
        }]
    }
}

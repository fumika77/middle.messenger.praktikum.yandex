module.exports = {
    presets: [
        ['@babel/preset-env', {targets: {node: 'jsdom'}}],
        '@babel/preset-typescript',
    ],
};

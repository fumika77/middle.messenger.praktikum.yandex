module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                "modules": false
            },
            "jest"
        ],
        '@babel/preset-typescript',
        'next/babel'
    ],

};
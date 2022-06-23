module.exports = {
    preset: "ts-jest",
    "testEnvironment": "jsdom",
    "transform": {
        '^.+\\.ts?$': 'ts-jest',
        'node_modules/^.+\\.ts?$': 'ts-jest',
    },
    "transformIgnorePatterns": [
        "node_modules/(?!variables/.*)"
    ],
    "roots": [
        "<rootDir>",
        "__tests__"
    ],
    "moduleDirectories": [
        "node_modules"
    ],
    moduleNameMapper: {
        '^nanoid': require.resolve('nanoid'),
    }
};
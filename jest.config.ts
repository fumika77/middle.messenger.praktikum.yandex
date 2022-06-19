module.exports = {
    preset: "ts-jest",
    "testEnvironment": "jsdom",
    "transform": {
        '^.+\\.ts?$': 'ts-jest',
    },
    "transformIgnorePatterns": [
        "node_modules/(?!variables/.*)"
    ],
    "roots": [
        "__tests__"
    ],
    "moduleDirectories": [
        "node_modules"
    ],
};
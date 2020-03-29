module.exports = {
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    moduleFileExtensions: ['js', 'mjs'],
    transform: {
        "^.+\\.m?js$": "<rootDir>/node_modules/babel-jest"
    }
}

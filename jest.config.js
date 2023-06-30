const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    rootDir: '.',
    transform: {
        '^.+\\.svg$': './svgTransform.js',
    },
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths, {
            prefix: '<rootDir>/src/',
        }),
        '^.+\\.(css|less|scss)$': 'babel-jest',
    },
}

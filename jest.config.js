const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.svg$': '<rootDir>/svgTransform.js',
    },
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths, {
            prefix: '<rootDir>/src/',
        }),
        '^.+\\.(css|less|scss)$': 'babel-jest',
    },
}

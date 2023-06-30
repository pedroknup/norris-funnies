module.exports = {
    '*.{js,jsx,ts,tsx}': [
        'eslint --max-warnings=0',
        'craco test --verbose -- --config=jest.config.js --watchAll=false',
        () => 'tsc-files --noEmit',
    ],
    '*.{js,jsx,ts,tsx,json,css}': ['prettier --write'],
}

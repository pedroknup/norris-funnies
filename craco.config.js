const path = require(`path`)

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@models': path.resolve(__dirname, 'src/models'),
            '@services': path.resolve(__dirname, 'src/services'),
        },
    },
}

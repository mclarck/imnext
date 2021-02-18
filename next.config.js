module.exports = {
    async redirects() {
        return [
            {
                source: '/graphql',
                destination: process.env.API_GRAPHQL_URL,
                permanent: true,
            },
        ]
    },
    images: {
        domains: ['api.inmarketify.lo', 'api.inmarketify.ml'],
    },
}
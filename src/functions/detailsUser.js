const { app } = require('@azure/functions');

app.http('details-user', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const teste = { teste: 'detailsUser' }

        return { jsonBody: teste };
    }
});

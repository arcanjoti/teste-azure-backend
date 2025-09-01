const { app } = require('@azure/functions');

app.http('update-user', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const teste = { teste: 'updateUser' }

        return { jsonBody: teste };
    }
});

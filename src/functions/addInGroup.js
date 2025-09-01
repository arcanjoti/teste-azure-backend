const { app } = require('@azure/functions');

app.http('add-in-group', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const teste = { teste: 'addInGroup' }

        return { jsonBody: teste };
    }
});

const { app } = require('@azure/functions');

app.http('home', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        return { body: `Seja bem vindo!` };
    }
});

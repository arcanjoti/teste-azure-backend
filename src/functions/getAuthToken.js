const { app } = require('@azure/functions')
const axios = require('axios')

app.http('get-auth-token', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'auth/get-token',
    handler: async (request, context) => {
        try {
            const tenantId = process.env.TENANT_ID
            const clientId = process.env.CLIENT_ID
            const clientSecret = process.env.CLIENT_SECRET

            const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`

            const options = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }

            const params = new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                scope: 'https://graph.microsoft.com/.default',
                grant_type: 'client_credentials',
            })

            const { data } = await axios.post(url, params, options)
            return { jsonBody: data }

        } catch (error) {
            console.log(error)
            return {
                status: 400,
                jsonBody: { 'erro': 'Erro!' }
            }
        }
    }
})

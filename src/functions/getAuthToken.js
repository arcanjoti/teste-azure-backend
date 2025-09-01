const { app } = require('@azure/functions')
const axios = require('axios')

app.http('get-auth-token', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'auth/get-token',
    handler: async (request, context) => {

        const tenantId = '9e55eccf-5e65-4178-98f9-bf59a066ae1a'
        const clientId = '60b48109-33a8-4feb-94ed-dc67a86135f9'
        const clientSecret = 'u148Q~L_ugvnWCpiW-QCK9mzD.w6BgET75zPLdgm'

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
    }
})

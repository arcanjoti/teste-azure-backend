const { app } = require('@azure/functions')
const axios = require('axios')


app.http('user-update-security-attributes', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'user/update/security-attributes',
    handler: async (request, context) => {
        try {
            const { data_nascimento, id, token } = request.params

            const endPoint = `https://graph.microsoft.com/v1.0`

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }

            const body = {
                "customSecurityAttributes": {
                    "Trabalhadores": {
                        "@odata.type": "#Microsoft.DirectoryServices.CustomSecurityAttributeValue",
                        "Aniversário": data_nascimento
                    }
                }
            }

            await axios.patch(`${endPoint}/users/${id}`, body, config)

            return { jsonBody: { 'sucesso': 'Sucesso!' } }

        } catch (error) {
            console.log(error)
            return {
                status: 400,
                jsonBody: { 'erro': 'Erro!' }
            }
        }
    }
})

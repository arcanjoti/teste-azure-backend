const { app } = require('@azure/functions')
const axios = require('axios')


app.http('user-details', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'user/details',
    handler: async (request, context) => {
        try {
            const { id, token } = request.params

            const url = `https://graph.microsoft.com/v1.0/users`

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }

            const extensionMobilePhone = 'extension_4d1f611a46e5425d849fce6293a0dd70_Celular'
            const securityAttributes = 'customSecurityAttributes'

            const responseBasic = await axios.get(`${url}/${id}`, config)

            const responseMobilePhone = await axios.get(`${url}/${id}?$select=${extensionMobilePhone}`, config)
            const responseSecurity = await axios.get(`${url}/${id}?$select=${securityAttributes}`, config)

            const response = {
                id: responseBasic.data.id,
                displayName: responseBasic.data?.displayName,
                mobilePhone: responseBasic.data?.mobilePhone,
                mail: responseBasic.data?.mail,
                extensionCelular: responseMobilePhone.data?.extension_4d1f611a46e5425d849fce6293a0dd70_Celular,
                birthday: responseSecurity.data?.customSecurityAttributes.Trabalhadores.Aniversário,
            }

            return { jsonBody: response }
        } catch (error) {
            console.log(error)
            return {
                status: 400,
                jsonBody: { 'erro': 'Erro!' }
            }
        }
    }
})

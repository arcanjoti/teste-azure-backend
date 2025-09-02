const { app } = require('@azure/functions')
const axios = require('axios')


app.http('user-details', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'user/details/{id:alpha}/',
    handler: async (request, context) => {
        try {

            const token = request.query.get('token')
            const { id } = request.params

            const url = `https://graph.microsoft.com/v1.0/users`

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }

            const extensionMobilePhone = 'extension_4d1f611a46e5425d849fce6293a0dd70_Celular'
            const extensionDataNascimento = 'extension_4d1f611a46e5425d849fce6293a0dd70_DatadeNascimento'

            const responseBasic = await axios.get(`${url}/${id}`, config)

            const responseMobilePhone = await axios.get(`${url}/${id}?$select=${extensionMobilePhone}`, config)
            const responseDataNascimento = await axios.get(`${url}/${id}?$select=${extensionDataNascimento}`, config)

            const response = {
                id: responseBasic.data.id,
                displayName: responseBasic.data?.displayName,
                mobilePhone: responseBasic.data?.mobilePhone,
                mail: responseBasic.data?.mail,
                extensionCelular: responseMobilePhone.data?.extension_4d1f611a46e5425d849fce6293a0dd70_Celular,
                extensionDataNascimento: responseDataNascimento.data?.extension_4d1f611a46e5425d849fce6293a0dd70_DatadeNascimento
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

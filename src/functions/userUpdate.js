const { app } = require('@azure/functions')
const axios = require('axios')


app.http('user-update', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'user/update/{id:alpha}/',
    handler: async (request, context) => {
        try {
            const token = request.query.get('token')
            const { param, value, id } = request.params

            console.log(request)
            // const endPoint = `https://graph.microsoft.com/v1.0`

            // const config = {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     }
            // }

            // const body = { [param]: value }

            // await axios.patch(`${endPoint}/users/${id}`, body, config)

            return { body: 'data' }
        } catch (error) {
            console.log(error)
            return {
                status: 400,
                jsonBody: { 'erro': 'Erro!' }
            }
        }
    }
})

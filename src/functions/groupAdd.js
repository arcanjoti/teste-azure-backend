const { app } = require('@azure/functions')
const axios = require('axios')

app.http('group-add', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'group/add',
    handler: async (request, context) => {
        try {
            const { group, user, token } = request.params

            const urlVerify = `https://graph.microsoft.com/v1.0/groups/${group}/members`
            const urlAdd = `https://graph.microsoft.com/v1.0/groups/${group}/members/$ref`

            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const bodyAdd = {
                '@odata.id': `https://graph.microsoft.com/v1.0/directoryObjects/${user}`
            }

            console.log(group, user, token)
            const { data } = await axios.get(urlVerify, config)

            const dados = data.value

            const dadosFiltrados = dados.filter(dado => dado.id === user)

            if (dadosFiltrados.length !== 0) {
                const mensagem = { sucesso: 'Sucesso' }
                return { jsonBody: mensagem }
            } else {
                const { status } = await axios.post(urlAdd, bodyAdd, config)
                return { body: status }
            }
        } catch (error) {
            console.log(error)
            return {
                status: 400,
                jsonBody: { 'erro': 'Erro!' }
            }
        }
    }
})

const Atendimento = require('../models/atendimento')

module.exports = app => {
    app.get('/atendimento', (req, res) => {
        res.send("GET atendimento!")
    })

    app.post('/atendimento', (req, res) => {
        const atendimento = req.body
        Atendimento.adiciona(atendimento)
        res.send("POST atendimento!")
    })
}
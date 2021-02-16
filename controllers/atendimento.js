const Atendimento = require('../models/atendimento')

module.exports = app => {
    app.get('/atendimento', (req, res) => {
        Atendimento.lista(res)
    })

    app.get('/atendimento/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.getById(id, res)
    })

    app.post('/atendimento', (req, res) => {
        const atendimento = req.body
        Atendimento.adiciona(atendimento, res)
        // res.send("POST atendimento!")
    })

    app.patch('/atendimento/:id', (req, res) => {
        const atendimento = req.body
        const id = parseInt(req.params.id)

        Atendimento.altera(id, atendimento, res)
        // res.send("POST atendimento!")
    })

    app.delete('/atendimento/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.deleta(id, res)
        // res.send("POST atendimento!")
    })
}
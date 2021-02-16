const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    
    adiciona(atendimento, res){
        const sql = 'INSERT INTO Atendimentos SET ?'
        const dataConsulta = moment(atendimento.dataConsulta, `DD/MM/YYYY`).format(`YYYY-MM-DD HH:mm:ss`)
        const dataCriacao = moment().format(`YYYY-MM-DD HH:mm:ss`)

        const dataEValida = moment(atendimento.dataConsulta).isSameOrAfter(dataCriacao)
        const clienteEValido = atendimento.cliente.length >= 4

        const validacoes = [
            {nome: "dataConsulta", valido: dataEValida, mensagem: "dataConsulta deve ser maior que a atual"},
            {nome: "cliente", valido: clienteEValido, mensagem: "cliente deve ter nome maior que 3 letras"}
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros){
            res.status(400).json(erros)
        }
        else {
            const atendimentoDatado = { ...atendimento, dataConsulta, dataCriacao }
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro)
                    console.log(erro)
                }else{
                    res.status(200).json(resultados)
                    console.log(resultados)
                }
            })
        }
    }

    lista(res){
        const sql = "SELECT * FROM Atendimentos"

        conexao.query(sql, (erro, resultados)=>{
            if (erro) {
                res.status(400).json(erro)
            }
            else{
                res.status(200).json(resultados)
            }
        })
    }

    getById(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`
        conexao.query(sql, (erro, resultados)=>{
            if (erro) {
                res.status(400).json(erro)
            }
            else{
                res.status(200).json(resultados[0])
            }
        })

    }

    altera(id, valores, res) {
        if(valores.dataConsulta){
            const dataConsulta = moment(valores.dataConsulta, `DD/MM/YYYY`).format(`YYYY-MM-DD HH:mm:ss`)
            valores.dataConsulta = dataConsulta
        }

        const sql = `UPDATE Atendimentos SET ? WHERE id=?`
        conexao.query(sql, [valores, id], (erro, resultado)=>{
            if (erro) {
                res.status(400).json(erro)
            }
            else{
                res.status(200).json(resultado)
            }
        })

    }

    deleta(id, res){
        const sql = `DELETE FROM Atendimentos WHERE id=?`
        conexao.query(sql, id, (erro, resultado)=>{
            if (erro) {
                res.status(400).json(erro)
            }
            else{
                res.status(200).json(resultado)
            }
        })
    }

}

module.exports = new Atendimento

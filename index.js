
const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')

conexao.connect(erro => {
    if (erro){
        console.log('Erro')
        console.log(erro)
    } else {
        const app = customExpress()

        Tabelas.init(conexao)
        app.listen(3000, ()=> {console.log("Rodando server NodeJS!")})
    }
})

// Import do express
const express = require('express')

// Criando um objeto de rota para os Endpoints de doces
const router = express.Router()

const bodyParser = require("body-parser")

//Permitindo a utilizaçãp de JSON no body da requisição
const bodyParserJson = bodyParser.json()

const controllerDoce = require("../controller/doce/controller_doce")

const controllerDoceSabor = require("../controller/doce/controller_doce_sabor")



router.post("/", bodyParserJson, async function(request, response) {

    let dados = request.body
    let contentType = request.headers["content-type"]
    let result = await controllerDoce.inserirNovoDoce(dados, contentType)
    response.status(result.status_code)
    response.json(result)
    
})

router.get("/", async function (request, response) {
    let result = await controllerDoce.listarDoce()

    response.status(result.status_code)
    response.json(result)
})

router.get("/sabor/:id", async function (req, res) {

    let idDoce = req.params.id

    let result = await controllerDoceSabor.buscarSaborIdDoce(idDoce)

    res.status(result.status_code)
    res.json(result)
})

router.get("/completo", async function (req, res) {

    let result = await controllerDoce.listarDoceCompleto()

    res.status(result.status_code)
    res.json(result)
})

router.get("/nome/:nome", async function (req, res) {

    let nome = req.params.nome

    let result = await controllerDoce.buscarNomeDoce(nome)

    res.status(result.status_code)
    res.json(result)
})

router.get("/categoria/:idCategoria", async function (req, res) {

    let idCategoria = req.params.idCategoria

    let result = await controllerDoce.buscarDocePorIdCategoria(idCategoria)

    res.status(result.status_code)
    res.json(result)
})


router.get("/:id", async function(request, response) {
    // Recebe o id do sabor via parametro
    let id = request.params.id

    // Recebendo o body da requisição
    let result = await controllerDoce.buscarDoce(id)
    
    response.status(result.status_code)
    response.json(result)

})


router.put('/:id', bodyParserJson, async function (request, response) {

    // Recebe o content-type da requisição para validar se é JSON
    let contentType = request.headers['content-type']
    // Recebe o ID do registro a ser atualizado
    let id = request.params.id
    // Recebe os dados do body que serão modificados no BD
    let dados  = request.body

    //Chama a função para atualizar o usuário , devemos encaminhar as 3 variaveis na mesma sequencia
    // que a função foi criada na controller

    let result = await controllerDoce.atualizarDoce(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})


router.delete("/:id", async function(request, response) {

    let id = request.params.id
    
    let result = await controllerDoce.excluirDoce(id)

    response.status(result.status_code)
    response.json(result)
    
})



module.exports = router
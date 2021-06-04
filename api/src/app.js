const express = require('express')
const produtos = require('./recursos/produtos.json')
const departamentos = require('./recursos/departamentos.json')

const app = express()
app.use(express.json())

function getProdutoById(id) {
    for (let produto of produtos) {
        if (String(produto.id) === id) {
            return produto
        }
    }
    return false
}

function atualizarProdutoById(id, produtoAtualizado) {
    for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i]
        if (produto.id == id) {
            produtos[i] = produtoAtualizado
            return true
        }
    }
    return false
}

function getDepartamentoById(id) {
    for (let departamento of departamentos) {
        if (String(departamento.id) === id) {
            return departamento
        }
    }
    return false
}


/** Verbos HTTP
 * GET -> Trazer informação
 * POST -> Salvar informação 
 * PUT / PATCH -> Atualizar informação
 * DELETE -> Deletar informação 
 */

/**
 * Rotas de entidade -> CRUD 
 * GET -> /{nome-entidade} -> Todos as entidades
 * GET -> /{nome-entidade}/{id} -> Uma entidade se existir
 * POST -> /{nome-entidade} -> Criar uma entidade 
 * PUT -> /{nome-entidade}/:id -> Atualizar uma entidade 
 * DELETE -> /{nome-entidade}/:id -> Atualizar uma entidade 
 */

// Rota inicial
app.get('/', async function (request, response) {
    const resposta = {
        status: 200,
        mensagem: 'API - Produtos'
    }
    return response.status(resposta.status).json(resposta)
})

/** Produtos */
app.get('/produtos', async function (request, response) {
    return response.status(200).json(produtos)
})

app.get('/produtos/:id', async function (request, response) {
    const { id } = request.params
    const produto = getProdutoById(id)

    // Se não existir
    if (!produto) {
        const resposta = {
            status: 400,
            mensagem: 'O produto não existe em nossa base'
        }
        return response.status(400).json(resposta)
    }

    const resposta = {
        status: 200,
        mensagem: 'Produto encontrado com sucesso',
        produto: produto
    }

    return response.status(200).json(resposta)
})

app.post('/produtos', async function (request, response) {
    const produto = request.body

    //@TODO: criar validacao para evitar duplicados
    produtos.push(produto)

    const resposta = {
        status: 201,
        mensagem: 'Produto criado com sucesso',
        produto: produto
    }

    return response.status(201).json(resposta)
})

app.put('/produtos/:id', async function (request, response) {
    const { id } = request.params
    const produto = request.body

    const isUpdated = atualizarProdutoById(id, produto)

    if (!isUpdated) {
        const resposta = {
            status: 400,
            mensagem: 'Produto nao foi atualizado'
        }
        return response.status(400).json(resposta)
    }

    const resposta = {
        status: 204,
        mensagem: 'Produto atualizado com sucesso',
        produto: produto
    }

    return response.status(204).json(resposta)
})


/** Departamentos */
app.get('/departamentos', async function (request, response) {
    return response.status(200).json(departamentos)
})

app.get('/departamentos/:id', async function (request, response) {
    const { id } = request.params
    const departamento = getDepartamentoById(id)

    // Se não existir
    if (!departamento) {
        const resposta = {
            status: 400,
            mensagem: 'O departamento não existe em nossa base'
        }
        return response.status(400).json(resposta)
    }

    const resposta = {
        status: 200,
        mensagem: 'Departamento encontrado com sucesso',
        departamento: departamento
    }

    return response.status(200).json(resposta)
})

app.post('/departamentos', async function (request, response) {
    const departamento = request.body

    //@TODO: criar validacao para evitar duplicados
    departamentos.push(departamento)

    const resposta = {
        status: 201,
        mensagem: 'Departamento criado com sucesso',
        departamento: departamento
    }

    return response.status(201).json(resposta)
})

// Rota not found 
app.get('*', async (request, response) => {
    const resposta = {
        status: 404,
        mensagem: 'API - Produtos'
    }
    return response.status(resposta.status).json(resposta)
})

app.listen(3000, () => {
    console.log('Servidor rodando | http://localhost:3000')
})

/**
 * Adicional
 * - Query string: http://localhost:3000/produtos?preco_maior=10&nome=blabla
 * - Parametros: http://localhost:3000/produtos/{id}
 */
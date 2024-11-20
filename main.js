const express = require('express')
const cors = require('cors')
const pool = require('./db.js')
const PORT = 3000

const app = express()


app.use(cors())
app.use(express.json())

app.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM dogs') // Correção aqui
    res.json(rows)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao conectar no banco', error: error.message })
  }
})

app.post('/users', async (req, res) => {
  const { nome, idade, imagem_url } = req.body

  try {
    const consulta =
      'INSERT INTO dogs(nome, idade, imagem_url) VALUES ($1, $2, $3)' // Correção aqui

    await pool.query(consulta, [nome, idade, imagem_url])

    res.status(201).json({ message: 'Os uário cadastrado com sucesso' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao cadastrar usuário', error: error.message })
  }
})


app.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const { nome, idade, imagem_url } = req.body

  try {
    const consulta =
      'UPDATE dogs SET nome = $1, idade = $2, imagem_url = $3 WHERE id = $4' // Correção aqui

    await pool.query(consulta, [nome, idade, imagem_url, id])
    res.status(200).json({ message: 'Usuário atualizado com sucesso' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao atualizar o  usuário', error: error.message })
  }
})

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const consulta = 'DELETE FROM dogs WHERE id = $1' // Correção aqui

    await pool.query(consulta, [id])
    res.status(200).json({ message: 'Usuário apagado com sucesso!' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao deletar usuário', error: error.message })
  }
})







//----------#PARTE DOS GATOS EM BAIXO

app.get('/users1', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM dogs') // Correção aqui
    res.json(rows)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao conectar no banco', error: error.message })
  }
})

app.post('/users1', async (req, res) => {
  const { nome, idade, imagem_url } = req.body

  try {
    const consulta =
      'INSERT INTO cats(nome, idade, imagem_url) VALUES ($1, $2, $3)' // Correção aqui

    await pool.query(consulta, [nome, idade, imagem_url])

    res.status(201).json({ message: 'Os uário cadastrado com sucesso' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao cadastrar usuário', error: error.message })
  }
})


app.put('/users1/:id', async (req, res) => {
  const { id } = req.params
  const { nome, idade, imagem_url } = req.body

  try {
    const consulta =
      'UPDATE cats SET nome = $1, idade = $2, imagem_url = $3 WHERE id = $4' // Correção aqui

    await pool.query(consulta, [nome, idade, imagem_url, id])
    res.status(200).json({ message: 'Usuário atualizado com sucesso' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao atualizar o  usuário', error: error.message })
  }
})

app.delete('/users1/:id', async (req, res) => {
  const { id } = req.params

  try {
    const consulta = 'DELETE FROM cats WHERE id = $1' // Correção aqui

    await pool.query(consulta, [id])
    res.status(200).json({ message: 'Usuário apagado com sucesso!' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Falha ao deletar usuário', error: error.message })
  }
})


app.listen(PORT, () => {
  console.log('API está no AR')
})

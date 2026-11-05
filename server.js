const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_retrogames"
})

db.connect((erro) => {
    if (erro) {
        console.error("Erro ao conectar:", erro)
    } else {
        console.log("Conectado ao DB")
    }
})

const mostrarJogos = (req, res) => {
    const sql = "SELECT id, titulo, desenvolvedora, genero, plataforma, imagem_url AS imagem, preco FROM jogos"

    db.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).send("Erro ao consultar o DB")
        }

        res.send(resultados)
    })
}

const novoJogo = (req, res) => {
    const { titulo, desenvolvedora, genero, plataforma, imagem, preco } = req.body

    if (titulo && desenvolvedora && genero && plataforma && imagem && preco) {
        const sql = "INSERT INTO jogos (titulo, desenvolvedora, genero, plataforma, imagem_url, preco) VALUES (?, ?, ?, ?, ?, ?)"
        const valores = [titulo, desenvolvedora, genero, plataforma, imagem, preco]

        db.query(sql, valores, (erro, resultado) => {
            if (erro) {
                return res.status(500).send("Erro ao inserir jogo")
            }

            res.send("Jogo cadastrado com sucesso")
        })
    } else {
        res.status(400).send("Erro: Preencha todos os campos")
    }
}

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const porta = 3000

app.get("/listar", mostrarJogos)
app.post("/cadastrar", novoJogo)

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`)
})
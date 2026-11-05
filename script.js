const API_URL = "http://localhost:3000"

const btnCadastrar = document.getElementById("btnCadastrar")
const btnCancelar = document.getElementById("btnCancelar")
const modal = document.getElementById("modalCadastro")
const form = document.getElementById("formJogo")
const lista = document.getElementById("listarJogos")
const mensagemVazia = document.getElementById("mensagemVazia")

btnCadastrar.addEventListener("click", ()=> {
    modal.showModal()
})

btnCancelar.addEventListener("click", ()=> {
    modal.close()
})

async function carregarJogos() {
    try {
        const resposta = await fetch(API_URL + "/listar")
        const jogos = await resposta.json()

        lista.innerHTML = ""

        if (jogos.length == 0) {
            mensagemVazia.hidden = false
            lista.appendChild(mensagemVazia)
            return
        }

        mensagemVazia.hidden = true

        jogos.forEach(jogo => {
            criarCard(
                jogo.titulo,
                jogo.desenvolvedora,
                jogo.genero,
                jogo.plataforma,
                jogo.imagem,
                jogo.preco
            )
        })
    } catch (erro) {
        console.error("Erro ao carregar jogos:", erro)
        alert("Não foi possível conectar ao servidor")
    }
}

form.addEventListener("submit", async (evento) => {
    evento.preventDefault()

    const novoJogo = {
        titulo: document.getElementById("jogo").value.trim(),
        desenvolvedora: document.getElementById("desenvolvedora").value.trim(),
        genero: document.getElementById("genero").value.trim(),
        plataforma: document.getElementById("plataforma").value.trim(),
        imagem: document.getElementById("imagem").value.trim(),
        preco: Number(document.getElementById("preco").value)
    }

    try {
        const resposta = await fetch(API_URL + "/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoJogo)
        })

        if (resposta.ok) {
            form.reset()
            modal.close()
            carregarJogos()
        } else {
            alert("Erro ao salvar jogo. Verifique o banco de dados")
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro)
        alert("Erro de conexão com o servidor")
    }
})

function criarCard(titulo, desenvolvedora, genero, plataforma, imagem, preco) {
    const card = document.createElement("article")
    card.classList.add("card-jogo")

    const capa = document.createElement("div")
    capa.classList.add("capa")

    const imagemCapa = document.createElement("img")
    imagemCapa.src = imagem
    imagemCapa.alt = titulo
    capa.appendChild(imagemCapa)

    const info = document.createElement("div")
    info.classList.add("info-jogo")

    const nomeJogo = document.createElement("h3")
    nomeJogo.textContent = titulo

    const nomeDesenvolvedora = document.createElement("p")
    nomeDesenvolvedora.textContent = "Desenvolvedora: " + desenvolvedora

    const nomeGenero = document.createElement("p")
    nomeGenero.textContent = "Gênero: " + genero

    const nomePlataforma = document.createElement("p")
    nomePlataforma.textContent = "Plataforma: " + plataforma

    const valor = document.createElement("strong")
    valor.classList.add("preco")
    valor.textContent = preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    info.append(nomeJogo, nomeDesenvolvedora, nomeGenero, nomePlataforma, valor)
    card.append(capa, info)
    lista.appendChild(card)
}


carregarJogos()
let categoriaSelecionada = null;

async function chamaBack() {
    const chamada = await fetch("http://localhost:5000/listarTodasCategorias")
    const dados = await chamada.json()
    console.log(dados)

    montaOpcoesSelect(dados)
}
chamaBack()


function montaOpcoesSelect(dados) {
    const campoSelect = document.querySelector("#dropCategorias")
    dados.forEach(categoria => {
        const option = `
            <option value="${categoria.id_categoria}"> ${categoria.nome_categoria}</option>
        `
        campoSelect.innerHTML += option;
    });

}


async function selecionaCategoria(event) {
    const valorSelecionado = event.target.value;
    const chamada = await fetch(
        `http://localhost:5000/listarProdutosPorCategoria?id=${valorSelecionado}`)
    const dados = await chamada.json()
    const campoResposta = document.querySelector(".produtos")
    
}

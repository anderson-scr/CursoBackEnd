// Instanciando nosso servidor
// #region Imports
const conexaoDb = require("./banco/conexaoDB").conexaoBanco
const express = require('express');
const cors = require("cors");

const app = express();
app.use(cors())
app.use(express.json())

const port = 5000;
// #endregion

// #region Rotas GET
app.get('/listarTodosProdutos', (req, res) => {
  const id = req.query.id
  if(req.query.id == undefined) {
    res.status(400).json({
      mensagem: "Verifique sua estrutura"
    })
    return
  }
  const query = "SELECT * FROM PRODUTOS WHERE ID_PRO = ?"
  conexaoDb.all(query, [id], (err, row) => {
    if (err)
      console.log(err)

    res.status(200).json({
      mensagem: "",
      dados: row
    });
  })
});

app.get("/Exercicio1-Funcionarios", (req, res) => {
  const sql = "SELECT * FROM FUNCIONARIOS";


  conexaoDb.all(sql, [id], (err, rows) => {
    if(err)
      console.log(err)

    res.status(200).json(rows);
  })
})

app.get("/listarTodasCategorias", (req, res) => {
  const sql = "SELECT * FROM CATEGORIA_PRODUTOS";
  debugger
  console.log("printando da rota get")
  console.log(req.body)

  conexaoDb.all(sql, (err, respostas) => {
    if(err)
      console.log(err)

    res.status(200).json(respostas)
  })
})

app.get("/listarProdutosPorCategoria", (req, res) => {
  const idCategoria = req.query.id;
  
  if(!idCategoria) {
    return res.status(400).json({
      mensagem: "Por favor faça a chamada com um queryParam id."
    })
  }

  const sql = "SELECT * FROM PRODUTOS WHERE CATEGORIA_PRO = ?"
  conexaoDb.all(sql, [idCategoria], (err, respostas) => {
    if(err) 
      res.status(500).json({ mensagem: "Ocorreu um erro ao pesquisar no banco"})

    res.status(200).json({
      sucesso: true,
      dados: respostas
    })
  })
})
// #endregion

app.post("/criarNovaCategoria", (req, res) => {
  const body = req.body;
  const sql = `INSERT INTO CATEGORIA_PRO VALUES ( NULL, ?)`

  conexaoDb.run(sql, [body.nome], (err) => {
    if(err) {
      console.log("passei aqui")
      return res.status(400).json({mensagem: "Ocorreu um erro", erro: err})
    }

    console.log("passo por aqui tbm")
    res.status(200).json({
      mensagem: "Insert bem executado"
    })
  })
})

app.post('/produtos/cadastro', (req, res) => {
  conexaoDb.run(`INSERT INTO
    PRODUTOS(NOME_PRO, VALOR_PRO, ESTOQUE_PRO, FORNECEDOR_PRO, CATEGORIA_PRO)
    VALUES (?, ?, ?, ?, ?)`,
    [req.body.nome, req.body.valor, req.body.estoque,
      req.body.fornecedor, req.body.categoria], function (err) {
        if(err) {
          console.log(err);
          return res.status(500).json({msg: 'erro ao inserir'})
        }
        console.log(this);
        return res.status(201).json({msg: 'criado com sucesso', obj: this})
      });
});

app.listen(port, () => {
  console.log(`Servidor Express rodando em http://localhost:${port}`);
});
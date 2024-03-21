import bodyParser from "body-parser";
import express from "express";
import BuildPdf from "./services/build-pdf.js";

// server config
const app = express();
const PORT = process.env.PORT || 5000;

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware para restrição de horário
// app.use(checkHour)


const laboratorios = [
  {
    nome: "Laboratório 1",
    capacidade: 20,
    descricao: "Laboratório de Programação 01",
  },
  {
    nome: "Laboratório 2",
    capacidade: 25,
    descricao: "Laboratório de Programação 02",
  },
  {
    nome: "Laboratório 3",
    capacidade: 30,
    descricao: "Laboratório de Programação 03",
  },
  {
    nome: "Laboratório 4",
    capacidade: 25,
    descricao: "Laboratório de Pesquisa 01",
  },
  {
    nome: "Laboratório 5",
    capacidade: 25,
    descricao: "Laboratório de Pesquisa 02",
  },
  {
    nome: "Laboratório 6",
    capacidade: 30,
    descricao: "Laboratório de Pesquisa 03",
  },
];

app.get("/", (req, res) => {
  res.json({message: 'Servidor funcionando!'})
})

app.get("/laboratorio/todos", (req, res) => {
  res.json(laboratorios);
});

app.post("/laboratorio/novo", (req, res) => {
  const lab = req.body;

  try {
    if (lab) {
      laboratorios.push(lab);
      res.json({
        message: `laboratório de nome ${req.body.nome} adicionado!`,
      });
    } else {
      throw new Error("objeto indefinido ");
    }
  } catch (e) {
    res.json({
      message: "Ocorreu um erro ao adicionar laboratório",
      error: e.message,
    });
  }
});

app.get("/laboratorio/relatorio", (req, res) => {
  const data = JSON.stringify(laboratorios, null, 2);

  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attatchment;filename=relatorio.pdf",
  });

  BuildPdf(
    (chunk) => stream.write(chunk),
    () => stream.end(),
    data //passando JSON para o pdf
  );
});

app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});

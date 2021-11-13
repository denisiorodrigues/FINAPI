const express = require("express");
const {v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const costumers = [];

app.post("/account", (request, response) => {
  const {cpf, name } = request.body;

  const custumerAlreadyExists = costumers.some(
    (customer) => customer.cpf === cpf
  );

  if(custumerAlreadyExists){
    return response.status(400).json({ error: "Custumer already exists!" }); 
  }

  costumers.push({
    id : uuidv4(),
    name,
    cpf,
    statement: []
  });

  return response.status(201).send();
});

app.get("/statiment/:cpf", (request, response) => {
  const { cpf } = request.params;

  const costumer = costumers.find(
    (costumer) => costumer.cpf === cpf
  );

  return response.json(costumer.statement);
});

app.listen(3333);
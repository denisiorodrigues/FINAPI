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

app.listen(3333);
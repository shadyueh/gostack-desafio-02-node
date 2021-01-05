const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// LIST
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

// CREATE
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = { id:uuid(), title, url, techs, likes:0};
  
  repositories.push(repository);
  
  return response.json(repository);
});

// UPDATE
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  
  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({"error":"Repository not found."})
  }

  const repository = {...repositories[repoIndex],...{ title, url, techs }};
  
  repositories[repoIndex] = repository;

  return response.json(repositories[repoIndex]); 
});

// DELETE
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({"error":"Repository not found."})
  }

  repositories.splice(repoIndex,1);
  
  return response.status(204).send();
});

// LIKE
app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;

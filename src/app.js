const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
  
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;

  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    like: 0,
  }

  if(!isUuid(repositorie.id)){
    return res.status(400).json({ error: 'Invalid project id.'});
  }

  repositories.push(repositorie);
  return response.json(repositorie);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs} = request.body;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id);

  if(repositorieIndex < 0){
    return response.json({error: 'Project Not Found.'})
  }

  const repositorie = {
    title, 
    url, 
    techs
  }

  repositories[repositorieIndex] = repositorie;
  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
 
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id);

  if(repositorieIndex < 0){
    return response.json({error: 'Project Not Found.'});
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
 
  const repositorie = repositories.find(repositorie => repositorie.id == id);

  repositorie.like++;
  return response.json(repositorie)

});

module.exports = app;

const express = require('express')
const app = express()

app.use(express.json())
let listaTelefonicas = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Seja bem vindo!</h1>')
})

app.get('/api/lista-telefonica/', (request, response) => {
    response.json(listaTelefonicas)
})

const generateId = () => {
    const maxId = listaTelefonicas.length > 0
      ? Math.max(...listaTelefonicas.map((t) => t.id)) : 0;
    return maxId + 1
  }
  app.post("/api/lista-telefonica", (request, response) => {
    const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'content missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  const name = listaTelefonicas.find((telefonica) => telefonica.name === body.name);
    if (!name) {
      const telefonica = {
        id: generateId(),
        name: body.name,
        number: body.number,
      }
      listaTelefonicas = listaTelefonicas.concat(telefonica)
      response.json(telefonica)
    } else {
      return response.status(400).json({ 
        error: 'must be unique' 
    })
  }
  
})
  app.get("/api/lista-telefonica/:id", (request, response) => {
    const id = Number(request.params.id);
    const telefonica = listaTelefonica.find((telefonica) => telefonica.id === id);
    if (telefonica) {
      response.json(telefonica);
    } else {
      response.status(404).end()
    }
  });
  
  app.delete("/api/lista-telefonica/:id", (request, response) => {
    const id = Number(request.params.id);
    listaTelefonicas = listaTelefonicas.find((telefonicas) => telefonicas.id !== id);
    response.status(204).end();
  });
  app.get('/info', (request, response) => {
    const date = new Date().toLocaleString();
    response.send(`Phonebook has info of ${listaTelefonicas.length} members. <br/> Verified on: ${date}`)
  })

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
const express = require('express');
const app = express();
const Joi = require('joi')

app.use(express.json());

let genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Horror'}
]

app.get('/api/genres', (req, res) => {
    res.send(genres)
});

app.post('/api/genres', (req, res) => {
    
    const newGenre = {
        id: genres.length + 1,
        name : req.body.name 
    }
    genres.push(newGenre);
    res.send(newGenre);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) {
        res.status(404).send('Genre with the given ID was not found');
        return;
    }
    res.send(genre);
})

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find( c => c.id === parseInt(req.params.id));
    if(!genre) {
        res.status(404).send('The genre with the given ID was not found!!!');
        return;
    }
    const input = inputValidation(req.body);
    if(input.error) {
        res.status(400).send(input.error.details[0].message);
        return;
    }
    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) {
        res.status(404).send('Genre with the given ID was not find')
        return;
    }
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});

//############# Input Validation function
function inputValidation(genre) {
    schema = {
        name: Joi.string().min(3).required
    };

    const result = Joi.validate(genre, schema);
    return result;
}

//############# Register Listener
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
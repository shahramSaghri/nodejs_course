const express = require('express');
const router = express.Router();
const Joi = require('joi');


let genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Horror'}
];

router.get('/', (req, res) => {
    res.send(genres)
});

router.post('/', (req, res) => {
    const validationResult = inputValidation(req.body);
    if(validationResult.error) {
        res.status(400).send(validationResult.error.details[0].message);
        return;
    }
    const newGenre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(newGenre);
    res.send(newGenre);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) {
        res.status(404).send('Genre with the given ID was not found');
        return;
    }
    res.send(genre);
})

router.put('/:id', (req, res) => {
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


router.delete('/:id', (req, res) => {
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
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(genre, schema);
    return result;
}

module.exports = router;
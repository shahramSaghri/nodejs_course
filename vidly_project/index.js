const express = require('express');

const app = express();

app.use(express.json());

const genres = [
    {
        id: 1,
        name: 'comedy'
    },
    {
        id: 2,
        name: 'drama'
    }
]

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.post('/api/genres/add', (req, res) => {
    
    const newName = req.body.name;

    if (!newName) {
        res.status(400).send('You need to provide a new genre');
        return;
    }

    const newId = genres.length + 1;
    
    const genre = {
        id: newId,
        name: newName
    }

    genres.push(genre);
    
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    const recievedId = +req.params.id;
    const genre = genres.find(genre => genre.id === recievedId);
    if(!genre) {
        res.status(404).send(`A genre with ID: ${recievedId} is not found`);
    }else{
        const updatedName = req.body.name;
        console.log(updatedName);
        if(!updatedName) {
            return res.status(400).send('Please provide new information for update');
        }
        console.log(genre.name);
        genre.name = updatedName;

        res.send(genre);
    }
});

app.delete('/api/genres/:id', (req, res) => {
    
    const recievedId = +req.params.id;
    console.log(recievedId);
    //Note that the follwoing genre variable is an unnamed js object
    //that has two feilds id and name.
    const genre = genres.find(g => g.id === recievedId);
    console.log(genre);

    if(!genre) {
        res.status(404).send(`There isn't any item with ID: ${recievedId}`);
    }else{
        const index = genres.indexOf(genre);
        const removedGenre = genres.splice(index, 1);

        res.send(removedGenre);
    }


});


const port = process.env.PORT || 8080;
app.listen(port, () => {console.log(`Application is listening on port ${port} ...`)});
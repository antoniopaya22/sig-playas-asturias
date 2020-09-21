const express = require('express');
const cors = require('cors');
const server = express();
const port = 3001;

server.use(express.json());
server.use(cors());
server.listen(port, () => console.log(`Escuchando en el puerto ${port}`));

const api = {
    playas: {
        url: '/api/playas',
        file: './json/playas.json'
    },
    destinos: {
        url: '/api/search',
        file: './json/destinos.json'
    }
};

server.get(api.playas.url, (req, res) => {
    console.log(api.playas.file);
    res.send(JSON.stringify(require(api.playas.file)));
});

server.get(api.destinos.url, (req, res) => {
    res.send(JSON.stringify(require(api.destinos.file)));
});

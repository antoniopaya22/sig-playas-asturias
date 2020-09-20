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
    distancia: {
        url: '/api/search',
        file: './json/distancia.json'
    }
};

server.get(api.playas.url, (req, res) => {
    res.send(JSON.stringify(require(api.testGet.file)));
});

server.get(api.distancia.url, (req, res) => {
    res.send(JSON.stringify(require(api.testPost.file)));
});

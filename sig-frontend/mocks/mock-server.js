const express = require('express');
const cors = require('cors');
const server = express();
const port = 3001;

server.use(express.json());
server.use(cors());
server.listen(port, () => console.log(`Escuchando en el puerto ${port}`));

const api = {
    playas: {
        url: '/api/beaches',
        file: './json/playas.json'
    },
    rutas: {
        url: '/api/search',
        file: './json/rutas.json'
    }
};

server.get(api.playas.url, (req, res) => {
    res.send(JSON.stringify(require(api.playas.file)));
});

server.get(api.rutas.url, (req, res) => {
    res.send(JSON.stringify(require(api.rutas.file)));
});

const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('.'));

function lerLinks() {
    return JSON.parse(fs.readFileSync('links.json', 'utf8'));
}

function salvarLinks(data) {
    fs.writeFileSync('links.json', JSON.stringify(data, null, 2));
}

app.get('/links', (req, res) => {
    res.json(lerLinks());
});

app.post('/links', (req, res) => {
    const links = lerLinks();
    links.push({ ...req.body, cliques: 0 });
    salvarLinks(links);
    res.json({ ok: true });
});

app.delete('/links/:index', (req, res) => {
    const links = lerLinks();
    links.splice(req.params.index, 1);
    salvarLinks(links);
    res.json({ ok: true });
});

app.post('/clique/:index', (req, res) => {
    const links = lerLinks();
    links[req.params.index].cliques++;
    salvarLinks(links);
    res.json({ ok: true });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
var http = require('http');
const express = require('express');
const app = express();

const baseDir = `${__dirname}/build/`

app.use(express.static(`${baseDir}`))

app.get('*', (req, res) => res.sendFile('index.html' , { root : baseDir }));


const port = 21086;
app.listen(port)

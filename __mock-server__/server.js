const jsonServer = require('json-server');
const express = require('express');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3003;

server.use(middlewares);
server.use(express.json());
server.use(express.static('../src/assets'));
server.use(router);

server.listen(port);

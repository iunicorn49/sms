'use strict';
let express = require('express');

let handler = require('./handler.js');

let router = express.Router();

router.get('/', handler.index);

router.get('/index', handler.index);

router.get('/students', handler.students);

router.get('/add', handler.showAdd);

router.post('/add', handler.submitAdd);

router.get('/info', handler.info);

router.get('/edit', handler.showEdit);

router.post('/edit', handler.submitEdit);

router.get('/delete', handler.delete);

module.exports = router;

'use strict';
const express = require('express');

const handler = require('./handler.js');

let router = express.Router();

router.get('/', handler.index);

router.get('/index', handler.index);

router.get('/students', handler.students);

module.exports = router;

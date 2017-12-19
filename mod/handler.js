'use strict';
const path = require('path');
const express = require('express');

const db = require('./db.js');

const STUDENTS = 'students';
const DBNAME = 'sms';

let handler = {
  index: function(req, res) {
    res.render('index');
  }, // index end
  students: function(req, res) {
    db.findAll({
      db: DBNAME,
      collection: STUDENTS,
      callback: function(docs) {
        res.render('students', {list:docs});
      }, // callback end
    }); // db.findAll end
  }, // students end
} // handler end

module.exports = handler;

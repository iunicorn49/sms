'use strict';
const path = require('path');
const express = require('express');
const async = require('async');

const db = require('./db.js');

let handler = {
  index: function(req, res) {
    res.render('index');
  }, // index end

  students: function(req, res) {
    db.findAll({
      db: 'sms',
      collection: 'students',
      callback: function(docs) {
        res.render('students', {list:docs});
      }, // callback end
    }); // db.findAll end
  }, // students end

  showAdd: function(req, res) {
    db.findAll({
      db: 'sms',
      collection: 'cities',
      callback: function(data_cities) {
        db.findAll({
          db: 'sms',
          collection: 'majors',
          callback: function(data_majors) {
            res.render('add', {
              cities: data_cities,
              majors: data_majors
            });
          }, // callback end
        }) // db.findAll end
      }, // callback end
    }) // db.findAll end
  }, // showAdd end

  submitAdd: function(req, res) {
    let obj = {
      sno: req.body.sno,
      sname: req.body.sname,
      sgender: req.body.sgender === 'M' ? '男' : '女' ,
      sbirthday: req.body.sbirthday,
      sphone: req.body.sphone,
      saddr: req.body.saddr,
      smajor: req.body.smajor,
    };
    db.insertOne({
      db: 'sms',
      collection: 'students',
      obj: obj,
      callback: function() {
        res.redirect('/students');
      }, // callback end
    });
  }, // submitAdd end

  info: function(req, res) {

    db.findOne({
      db: 'sms',
      collection: 'students',
      _id: db.objectId(req.query._id);
      callback: function(doc) {
        res.render('info', {item: doc});
      }
    }) //
  }, // info end

  showEdit: function(req, res) {

    db.findAll({
      db: 'sms',
      collection: 'majors',
      callback: function(data_majors) {

      }, // callback end
    }) // db.findAll end

    db.findAll({
      db: 'sms',
      collection: 'cities',
      callback: function(data_cities) {

      }, // callback end
    }) // db.findAll end

    db.findOne({
      db: 'sms',
      collection: 'students',
      _id: db.objectId(req.query._id),
      callback: function(data_students) {

      }, // callback end
    }) // db.findAll end

    res.render('edit', {
      item: ,
      majors: ,
      cities: ,
    }) // render end

  }, // showEdit end

  submitEdit: function(req, res) {
    let _id = db.objectId(req.body._id);
    let obj = {
      sno: req.body.sno,
      sname: req.body.sname,
      sgender: req.body.sgender === 'M' ? '男' : '女' ,
      sbirthday: req.body.sbirthday,
      sphone: req.body.sphone,
      saddr: req.body.saddr,
      smajor: req.body.smajor,
    };
    db.updateOne({
      db: 'sms',
      collection: 'students',
      filter: {_id:_id},
      obj: obj,
      callback: function() {
        console.log('success');
        res.send('ok');
      }, // callback end
    }) // updateOne end
  } // submitEdit end

} // handler end

module.exports = handler;

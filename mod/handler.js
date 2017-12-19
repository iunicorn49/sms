'use strict';
let path = require('path');
let express = require('express');
let asy = require('async');

/** 数据库相关 */
let db = require('./db.js');
const DBNAME = 'sms';
const STUDENTS = 'students';
const CITIES = 'cities';
const MAJORS =  'majors';

let handler = {
  index: function(req, res) {
    res.render('index');
  }, // index end

  students: function(req, res) {
    db.findAll({
      db: DBNAME,
      collection: STUDENTS,
      callback: function(err, docs) {
        res.render('students', {list:docs});
      }, // callback end
    }); // db.findAll end
  }, // students end

  showAdd: function(req, res) {
    asy.parallel({
      cities: function(toOutSide) {
        db.findAll({
          db: DBNAME,
          collection: CITIES,
          callback: function(err, data_cities) {
            toOutSide(err,data_cities);
          }, // callback end
        }) // db.findAll end
      },
      majors: function(toOutSide) {
        db.findAll({
          db: DBNAME,
          collection: MAJORS,
          callback: function(err, data_majors) {
            toOutSide(err,data_majors);
          }, // callback end
        }) // db.findAll end
      }
    },function(err, result) {
      res.render('add', {
        cities: result.cities,
        majors: result.majors
      });
    }) // parallel end
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
      db: DBNAME,
      collection: STUDENTS,
      obj,
      callback: function() {
        res.redirect('/students');
      }, // callback end
    });
  }, // submitAdd end

  info: function(req, res) {
    let _id = db.objectId(req.query._id);
    db.findOne({
      db: DBNAME,
      collection: STUDENTS,
      _id,
      callback: function(err, doc) {
        res.render('info', {item: doc});
      }
    }) //
  }, // info end

  showEdit: function(req, res) {
    let _id = db.objectId(req.query._id);
    asy.parallel({
      students: function(toOutSide) {
        db.findOne({
          db: DBNAME,
          collection: STUDENTS,
          _id,
          callback: function(err, data_students) {
            toOutSide(err, data_students);
          }, // callback end
        }) // db.findAll end
      }, // students end
      cities: function(toOutSide) {
        db.findAll({
          db: DBNAME,
          collection: CITIES,
          callback: function(err, data_cities) {
            toOutSide(err, data_cities);
          }, // callback end
        }) // db.findAll end
      }, // cities
      majors: function(toOutSide) {
        db.findAll({
          db: DBNAME,
          collection: MAJORS,
          callback: function(err, data_majors) {
            toOutSide(err, data_majors);
          }, // callback end
        }) // db.findAll end
      }, // majors end
    },function(err, result) {
      res.render('edit', {
        item: result.students,
        majors: result.majors,
        cities: result.cities,
      }) // render end
    }) // asy.parallel end
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
      db: DBNAME,
      collection: STUDENTS,
      filter: {_id},
      obj,
      callback: function() {
        res.redirect('/students');
      }, // callback end
    }) // updateOne end
  }, // submitEdit end

  delete: function(req, res) {
    let _id = db.objectId(req.query._id);
    db.delete({
      db: DBNAME,
      collection: STUDENTS,
      filter: {_id},
      callback: function() {
        res.redirect('/students');
      }, // callback end
    }) // db.delete end
  }, // delete end
} // handler end

module.exports = handler;

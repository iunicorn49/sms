'use strict';
const path = require('path');

const fun = {
  path: function(addr) {
    let index = addr.indexOf('/');
    let url = index === -1 ? `../htmls/${addr}.html` : `../${addr}` ;
    return path.join(__dirname, url);
  }, // path end
} // fun end

module.exports = fun;

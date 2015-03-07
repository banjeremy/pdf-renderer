var renderer   = require('./renderer.js'),
    jade = require('jade'),
    handlebars = require('handlebars'),
    fs         = require('fs');

var template = process.argv[2],
    data     = process.argv[3],
    output   = process.argv[4];

fs.readFile(data, 'utf8', function(err, data){
  var values = JSON.parse(data);

  readTemplate(template, values, function(content){
    renderer.render({
      content: content,
      output: output
    });
  });
});

function readTemplate(url, values, cb){
  fs.readFile(url, 'utf8', function(err, source){
    var template = handlebars.compile(source, { pretty: true });
    var html = template(values);
    cb(template(values));
  });
}

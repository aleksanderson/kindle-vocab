var sqlite3 = require("sqlite3").verbose();
var json2csv = require('json2csv');
var _ = require('underscore');

module.exports = function(config, callback) {

  if(typeof arguments[0] === 'function') callback = arguments[0];
  config = config || {};
  config.path = config.path || getPathToKindleVocabulary();
  config.csv = config.csv || false;
  config.duplicates = config.duplicates || false;

  var db = new sqlite3.Database(config.path);

  db.all("SELECT W.word, W.stem, L.usage from WORDS as W JOIN LOOKUPS AS L ON W.id = L.word_key", function(err, rows) {
    if(err) return callback(err);

    if(config.duplicates) {
      //TODO: spot duplicates based on 'stem' & 'usage' columns
  }

    if(config.csv) {
      json2csv({ data: rows, fields: ['word', 'stem', 'usage'] }, function(err, csv) {
        if (err) return callback(err);
          callback(null, csv);
      });
    } else {
      callback(null, rows);
    }
  });

  db.close();
};

function getPathToKindleVocabulary() {
  switch(process.platform) {
    case 'darwin': return '/Volumes/Kindle/system/vocabulary/vocab.db';
    case 'linux': return ''; //TODO:
    case 'win32': return ''; //TODO:
  }
}

var expect = require('chai').expect;
var sinon = require('sinon');
var sqlite3 = require("sqlite3").verbose();
var kindleVocab = require('../index');

describe('kindle-vocab', function() {

  var mock = [
    { word: 'Glance', stem: 'glance', lang: 'en', usage: '' },
    { word: 'stages', stem: 'stage', lang: 'en', usage: '' },
    { word: 'tangible', stem: 'tangible', lang: 'en', usage: '' },
    { word: 'Tangible', stem: 'tangible', lang: 'en', usage: '' }
  ];
  
  before(function() {
    sinon
      .stub(sqlite3.Database.prototype, 'all')
      .callsArgWith(1, null, mock);
  });

  after(function() {
    sqlite3.Database.prototype.all.restore();
  });

  it('runs with default options', function(done) {
    var defaultResult = mock.slice(0); 
    defaultResult.pop();

    kindleVocab(function(err, result) {
      expect(result).to.deep.equal(defaultResult);
      done();
    });
  })

  it('ignores duplicates', function(done) {
    kindleVocab({duplicates: true}, function(err, result) {
      expect(result.length).to.equal(4);
      done();
    });
  });

  it('returns csv formatted value', function(done) {
    var csvResult = "\"word\",\"stem\",\"lang\",\"usage\"\n" +
                     "\"Glance\",\"glance\",\"en\",\"\"\n" +
                     "\"stages\",\"stage\",\"en\",\"\"\n" +
                     "\"tangible\",\"tangible\",\"en\",\"\"";

    kindleVocab({csv: true}, function(err, result) {
      expect(result).to.equal(csvResult);
      done();
    });
  });

});
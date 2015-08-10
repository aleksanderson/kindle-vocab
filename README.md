kindle-vocab
====================================

``NOTICE: Module was tested on Kindle Paper White 3 (300dpi)``

The module reads and returns the Vocabulary Builder words from the Kindle device.

##Installation

``npm install kindle-vocab --save``

##Usage

``javascript
var kindleVocab = require('kindle-vocab');

kindleVocab(function(result) {
  console.log(result);
})
``

``javascript
var kindleVocab = require('kindle-vocab');

kindleVocab({csv: true}, function(result) {
  console.log(result);
})
``

##Default configuration

``
{
  "path": "/Volumes/Kindle/system/vocabulary/vocab.db",
  "csv": "false",
  "duplicates": "false"
}
``

NOTE: default path configuration works only for MacOSX.






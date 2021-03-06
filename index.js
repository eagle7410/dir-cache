/**
 * Created by Stcherbina Igor on 03.10.16.
 * @module cacheDir
 * @description This module is needed for caching data.
 * It can search for files with certain extension in folders.
 * Collect file contents or contents could be through a flaw require function.
 * Also caches template files swigJs.
 */
var prod = process.env.NODE_ENV === 'dev' ? '' : 'prod/';
module.exports = require('./lib/' + prod + 'dir-cache');

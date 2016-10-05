## Modules

<dl>
<dt><a href="#module_cacheDir">cacheDir</a></dt>
<dd><p>This module is needed for caching data.
It can search for files with certain extension in folders.
Collect file contents or contents could be through a flaw require function.
Also caches template files swigJs.</p>
</dd>
<dt><a href="#module_cacheDir">cacheDir</a></dt>
<dd><p>This module is needed for caching data.
It can search for files with certain extension in folders.
Collect file contents or contents could be through a flaw require function.
Also caches template files swigJs.</p>
</dd>
</dl>

<a name="module_cacheDir"></a>

## cacheDir
This module is needed for caching data.
It can search for files with certain extension in folders.
Collect file contents or contents could be through a flaw require function.
Also caches template files swigJs.


* [cacheDir](#module_cacheDir)
    * [module.exports](#exp_module_cacheDir--module.exports) : <code>Object</code> ⏏
    * [module.exports](#exp_module_cacheDir--module.exports) : <code>Object</code> ⏏

<a name="exp_module_cacheDir--module.exports"></a>
## examle
```js
var dirCache = require('./index');
var async = require('async');
var ut = require('util');

async.series([

        (done) => {
            console.log('Test scan all file in folder');
            dirCache.scan({dirs : 'for-example/views1'}, (e, scan) => {

                if (e) {
                    console.log('Error initail', e);
                    return done();
                }

                scan.run((e, res) => {
                    console.log('err ', e);
                    console.log('res ', ut.inspect(res, false,  null));
                    done();
                });
            }) ;
        },

        (done)  => {
            console.log('Test read two folders. Get only html files');
            dirCache.read({
                dirs : ['for-example/views1', 'for-example/views'],
                exts : ['.html']
            }, (e, scan) => {

                if (e) {
                    console.log('Error initail', e);
                    return done();
                }

                scan.run((e, res) => {
                    console.log('err ', e);
                    console.log('res ', ut.inspect(res, false,  null));
                    done();
                });
            }) ;

        },

        (done)  => {
            console.log('Test get files for swig');
            dirCache.swig({
                dirs : 'for-example/views1',
                exts : '.html'
            }, (e, scan) => {

                if (e) {
                    console.log('Error initail', e);
                    return done();
                }

                scan.run((e, res) => {
                    console.log('err ', e);
                    console.log('res ', ut.inspect(res, false,  null));
                    done();
                });
            }) ;

        },

        (done) => {
            console.log('Test get files for required js, json and call exporst if is function');
            dirCache.required({
                dirs : 'for-example/controllers'
            }, (e, scan) => {

                if (e) {
                    console.log('Error initail', e);
                    return done();
                }

                scan.run((e, res) => {
                    console.log('err ', e);
                    console.log('res ', ut.inspect(res, false,  null));
                    done();
                });
            }) ;

        },

    (done) => {
        console.log('Test get files for required js');
        dirCache.required({
            dirs : 'for-example/controllers',
            isCall : false,
            exts : '.js'
        }, (e, scan) => {

            if (e) {
                console.log('Error initail', e);
                return done();
            }

            scan.run((e, res) => {
                console.log('err ', e);
                console.log('res ', ut.inspect(res, false,  null));
                done();
            });
        }) ;

    },

    (done) => {
        console.log('Test get files for required js with call with a specified method');
        dirCache.required({
            dirs : 'for-example/controllers',
            isCall : false,
            call : 'init',
            exts : '.js'
        }, (e, scan) => {

            if (e) {
                console.log('Error initail', e);
                return done();
            }

            scan.run((e, res) => {
                console.log('err ', e);
                console.log('res ', ut.inspect(res, false,  null));
                done();
            });
        }) ;

    }

], function (e) {
    console.log('The end :)');
});

```

### module.exports : <code>Object</code> ⏏
Exports classes

**Kind**: Exported member  
<a name="exp_module_cacheDir--module.exports"></a>

### module.exports : <code>Object</code> ⏏
Exports classes

**Kind**: Exported member  
<a name="module_cacheDir"></a>

## cacheDir
This module is needed for caching data.
It can search for files with certain extension in folders.
Collect file contents or contents could be through a flaw require function.
Also caches template files swigJs.


* [cacheDir](#module_cacheDir)
    * [module.exports](#exp_module_cacheDir--module.exports) : <code>Object</code> ⏏
    * [module.exports](#exp_module_cacheDir--module.exports) : <code>Object</code> ⏏

<a name="exp_module_cacheDir--module.exports"></a>

### module.exports : <code>Object</code> ⏏
Exports classes

**Kind**: Exported member  
<a name="exp_module_cacheDir--module.exports"></a>

### module.exports : <code>Object</code> ⏏
Exports classes

**Kind**: Exported member  

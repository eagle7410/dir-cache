/**
 * Created by igor on 03.10.16.
 */
var cacheDir = require('./lib/dir-cache');
var scan = cacheDir.required({ dirs: 'cabmin/controllers' }, (e, scan) => {

	if (e) {
		return console.log('ERR : ', e);
	}

	scan.run((e, scan) => {
		if (e) {
			return console.log('ERR : ', e);
		}

		var ut = require('util');
		console.log('scan ', ut.inspect(scan, false, null));
	});
});
//var scan = cacheDir.read({dirs: 'cabmin/views', exts : ['.html']}, (e, scan)  => {
//
//	if (e) {
//		return console.log('ERR : ', e );
//	}
//
//	scan.run((e, scan) => {
//		if (e) {
//			return console.log('ERR : ', e );
//		}
//
//		// TODO: clear
//		console.log('scan', scan);
//
//
//
//	});
//
//});

//# sourceMappingURL=index-compiled.js.map
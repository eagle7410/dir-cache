/**
 * Created by igor on 03.10.16.
 */

"use strict";

// Modules && utils

let async = require('async');
let utils = require('utils-igor')(['obj', 'type', 'arr']);
let path = require('path');
let fs = require('fs');

// Vars

var isDebug = process.env.NODE_DEBUG === 'dev';
var isDebugColor = process.env.NODE_DEBUG_COLOR ? true : false;
let log = {
	err : (m) => utils.type.noop,
	info : (m) => utils.type.noop,
	error : (m) => utils.type.noop,
	warn :  (m) => utils.type.noop
};


if (isDebug) {

	log = {
		err : (m) => console.log('ERR : ' + m),
		info : (m) => console.log('INFO : ' + m),
		error : (m) => console.log('ERR : ' + m),
		warn :  (m) => console.log('WARN : ' + m)
	};

	if (isDebugColor) {
		var winston = require('winston');

		log = new winston.Logger({
			transports: [
				new winston.transports.Console({
					level: 'debug',
					handleExceptions: true,
					json: false,
					colorize: true
				})
			],
			exitOnError: false
		});

		log.err = log.error;
	}

}

class Frame {
	constructor () {
		this.active = 'constructor';
	}

	_mess (mess) {
		let c = this.constructor.name;
		let a = this.active;
		return {
			mess : `Class ${this.active}/${a}: ${mess}`,
			active : a,
			class : c
		};
	}

	err (mess) {
		var param = this._mess(mess);

		this.stop = param.mess;

		return {
			message : param.mess,
			method : param.active,
			class : param.class,
			type : 'ERROR'
		};

	}

	warn (mess) {
		log.warn(this._mess(mess).mess);
	}
}

class Scan extends  Frame {
	constructor (options, cb) {

		super();

		let that = this;
		that.stop = null;
		that.res = [];

		that.valid(options);

		// callback

		cb = utils.type.beFn(cb);

		if (!that.dirs.length) {
			return cb(that.err('Dirs is empty'));
		}

		log.info(`Be async call for check exists folders [${that.dirs}]`);

		async.map(that.dirs, (dir, endDir) => {

			log.info(`Process ${dir}`);

			dir = path.resolve(dir);

			log.info(`Check exist ${dir}`);

			fs.exists(dir, (exist) => endDir(exist ? null : that.err(`${dir} no exists`)));

		}, (e) => {
			cb(e, that);
		});
	}
	// Valid & Exports to class
	valid (options) {

		let that = this;
		// check options

		options = options || {};
		options.dirs = options.dirs || [];
		options.exts = options.exts || [];

		utils.obj.for(options, (k, v) => {

			if ( ~['exts', 'dirs'].indexOf(k)) {
				v = utils.arr.unique(Array.isArray(v) ? v : [v]);
			}

			that[k] = v;

		}) ;
	}
	_filePath (main, attach)   {
		return attach ? attach + '/' + main : main;
	}
	// check extension file
	isCorrectExt (file) {
		for (let i = 0; i < this.exts.length; i++)
			if ( ~file.indexOf( this.exts[i] ))
				return true;

		return false;
	}
	isAll () {
		return this.exts.length === 0
	}
	_dirFiles  (dir, endDir, add, res) {

		var that = this;

		that.active = '_dirFiles';

		if (!add) {
			res = {
				files : [],
				dir : dir
			};
			that.res.push(res);
		}

		log.info(`Scan dir ${dir}`);

		fs.readdir(dir, (e, arFile) => {

			if (e) {
				return endDir(e);
			}

			let folder = [];

			arFile.filter((file)  => {

				if (that.isCorrectExt(file))
					return true;


				// check no folder folder

				try {
					let check = dir + '/' + file;
					let stats = fs.lstatSync(check);

					if (stats.isDirectory()) {
						folder.push(file);
						return false;
					}


				} catch (e) {
					that.warn(`Bad stats for ${check} ${e}` );
					return false;
				}

				return that.isAll();

			} ).map((file) => {
					res.files.push(that._filePath(path.basename(dir + '/' + file), add));

			});

			if (!folder.length) {
				return endDir();
			}

			async.map(folder, (folder, endFolder) => that._dirFiles(dir + '/' + folder, endFolder, that._filePath(folder, add), res), endDir);

		});

	}

	run (cb) {
		var that =this;
		that.active = 'run';
		cb = utils.type.beFn(cb);

		if (that.stop) {
			return cb(that.err(that.stop));
		}

		log.info('Run scan dirs');

		async.map(that.dirs, (dir, end) => that._dirFiles(dir, end), (e) => {
			cb(e, this);
		});
	}

}
class Swig extends Scan {

	run (cb) {
		var that=this;

		super.run((e, scan) => {

			if (e) {
				return cb(e);
			}

			async.map(scan.res, (data, endData) => {

				if (data.files.length) {
					return async.map(data.files, (file, endFile) => {
						that.fileGet(data.dir, file, endFile);
					}, endData);
				}
				endData();
			}, (e) => cb(e, that));
		})
	}
	fileGet (dir, file, endFile) {
		let that = this;
		let p = path.resolve(dir + '/' + file);
		fs.readFile(p, (e, data) => {

			if (e) {
				that.warn('No read file ' + p);
				console.log(e);
				return endFile();
			}

			log.info('Read file' + p);

			that.fileToRes(path, dir, file, data, endFile);
		});
	}
	fileToRes (path, dir, file, data, endFile) {
		let that = this;
		file = file.replace(path.extname(file), '');
		data = data.toString();

		utils.obj.beInObj(that.res, 'cache');

		that.res.cache[file] = data;

		endFile();
	}
}
class Reader extends  Swig {
	fileToRes (path, dir, file, data, endFile) {
		let that = this;
		let ext = path.extname(file);
		file = file.replace(ext, '');
		ext = ext.replace('.', '');

		that.res = utils.obj.pathCreate(that.res, ['cache', ext, dir]);
		that.res.cache[ext][dir][file] =data;

		endFile();
	}
}
class Reuired {}
exports.scan = (options, cb) => new Scan (options, cb);
exports.swig = (options, cb) => new Swig (options, cb);
exports.read = (options, cb) => new Reader (options, cb);
exports.required = (options, cb) => new Reuired (options, cb);
//
//async.parallel({  views : function (taskEnd) {
//	var scan =  (dir, endDir, add) => {
//		fs.readdir(dir, (e, arFile) => {
//
//			if (e) {
//				return end(e);
//			}
//
//			var ext = '.html';
//			var folder = [];
//			async.map(
//				arFile.filter((file)  =>{
//					if (~file.indexOf(ext)) {
//						return true;
//					}
//
//					try {
//						var stats = fs.lstatSync(dir + '/' + file);
//
//						if (stats.isDirectory()) {
//							folder.push(file);
//						}
//
//					} catch (e) {
//						console.log('ERR: Get stats', e);
//					}
//
//					return false;
//
//				} ).map((file) => dir + '/' + file),
//				(filePath, end) => {
//					fs.readFile(filePath, (e, data) => {
//
//						if (e) {
//							return end(e);
//						}
//
//						cacheTemplate[cacheKey(path.basename(filePath, ext), add)] = data.toString();
//						end();
//					});
//
//
//				},
//				(e) => {
//
//					if (e || !folder.length) {
//						return endDir(e);
//					}
//
//
//					async.map(folder, (folder, endFolder) => {
//						scan(dir + '/' + folder, endFolder, cacheKey(folder, add));
//					}, endDir)
//				}
//			);
//		});
//
//	};
//
//	async.map(cacheOptions.fullViews, scan, taskEnd);
//
//}}, cb);

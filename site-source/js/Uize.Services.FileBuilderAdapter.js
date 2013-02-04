/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Services.FileBuilderAdapter Namespace
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2012-2013 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/* Module Meta Data
	type: Class
	importance: 5
	codeCompleteness: 0
	docCompleteness: 2
*/

/*?
	Introduction
		The =Uize.Services.FileBuilderAdapter= module defines an abstract base class for adapters for the file builder service (=Uize.Services.FileBuilder=).

		*DEVELOPERS:* `Chris van Rensburg`
*/

/*
	- how handlers are used...
		- handler is picked by going through all the handlers in sequence, until a handler matches the URL path
		- handlers are recursive, so for every handler that maps a requested path to a source path, the remaining handlers are evaluated to see if any apply to the source path
			- so, for example, a handler for scrunched JavaScript modules can rely on a handler for compiled JST modules, so that if a .jst source file is modified, requesting the scrunched compiled JST module will result in the .jst source file first being compiled to a JST source module, and then being scrunched to a scrunched JST module
		- handlers can also register build needs
		- handlers can have multiple inputs
			- a handler for a SimpleDoc explainer HTML URL will have at least two direct inputs...
				- the .simple source file
				- the .jst JavaScript template used to build the HTML file
		- some handlers may need to check multiple files to determine if the current built result is current
			- for example, a handler for a JavaScript module doc HTML page will need to check that none of the modules along the modules inheritance chain (if it is a class module) have a more recent modified date, since the documentation reflects inherited features for classes

	- needed items can be objects, in memory
		- as objects in memory, needed objects can have a last modified date

	- a JST template can have template modules as dependencies
		- template module dependencies are dependencies for the process of using of such a JST template
		- if one of the template module dependencies is modified since the last build using the JST template, then the last built product of the JST template would need to be rebuilt

	- with a request driven model for build process, for the purpose of performance, any file can have an internal / parsed representation as an object
		- so, for example, a .json file that is built as part of a build process can also be stored in memory as a JavaScript object, so that processes that repeatedly use the .json file as an input can not have to repeatedly parse the
		- all files can be modified through their string or object interfaces
			- if modified through object interface...
				- buffered serialization, buffered writing to file
				- immediate serialization when requested in text form or requested through file interface
				- writing to file can be decoupled from serialization to text, as a consequence of file system service
			- if modified through file interface...
				- immediate parsing when requested in object form
		- to aid in performance, files can be cached in a memory cache system (such as memcache)
*/

Uize.module ({
	name:'Uize.Services.FileBuilderAdapter',
	superclass:'Uize.Service.Adapter',
	required:[
		'Uize.Url',
		'Uize.String',
		'Uize.Services.FileSystem'
	],
	builder:function (_superclass) {
		'use strict';

		/*** General Variables ***/
			var
				_undefined,
				_startsWith = Uize.String.startsWith,
				_sacredEmptyObject = {},
				_trueFlag = {}
			;

		/*** Utility Functions ***/
			function _isUnderPath (_url,_whichPath) {return _startsWith (_url,_whichPath + '/')}

			function _transformUrl (_url,_pathToRemove,_pathToPrepend) {
				return (_pathToPrepend || '') + _url.slice (_pathToRemove.length);
			}

			function _generateUrl (_pathPrefix,_path) {
				return _pathPrefix + (_path && _path.charCodeAt (0) != 47 ? '/' : '') + _path;
			};

		return _superclass.subclass ({
			alphastructor:function () {
				var _this = this;

				/*** Private Instance Properties ***/
					_this._filesConsideredCurrentLookup = {};
					_this._objectCache = {};

				/*** Public Instance Properties ***/
					_this.fileSystem = Uize.Services.FileSystem.singleton ();
					_this.urlHandlers = [];
			},

			instanceMethods:{
				registerUrlHandler:function (_urlHandler) {this.urlHandlers.push (_urlHandler)},

				/*** URL tester methods ***/
					isMemoryUrl:function (_url) {return _isUnderPath (_url,this.params.memoryPath)},
					isBuiltUrl:function (_url) {return _isUnderPath (_url,this.params.builtPath)},
					isTempUrl:function (_url) {return _isUnderPath (_url,this.params.tempPath)},
					isSourceUrl:function (_url) {return _isUnderPath (_url,this.params.sourcePath)},

				/*** URL transformer methods ***/
					sourceUrlFromBuiltUrl:function (_url) {
						var _params = this.params;
						return _transformUrl (_url,_params.builtPath,_params.sourcePath);
					},

					tempUrlFromBuiltUrl:function (_url) {
						var _params = this.params;
						return _transformUrl (_url,_params.builtPath,_params.tempPath);
					},

					tempUrlFromMemoryUrl:function (_url) {
						var _params = this.params;
						return _transformUrl (_url,_params.memoryPath,_params.tempPath);
					},

					memoryUrlFromBuiltUrl:function (_url) {
						var _params = this.params;
						return _transformUrl (_url,_params.builtPath,_params.memoryPath);
					},

					builtUrlFromMemoryUrl:function (_url) {
						var _params = this.params;
						return _transformUrl (_url,_params.memoryPath,_params.builtPath);
					},

					sourceUrlFromMemoryUrl:function (_url) {
						var _params = this.params;
						return _transformUrl (_url,_params.memoryPath,_params.sourcePath);
					},

					sourceUrlFromTempUrl:function (_url) {
						var _params = this.params;
						return _transformUrl (_url,_params.tempPath,_params.sourcePath);
					},

				/*** URL generator methods ***/
					builtUrl:function (_path) {return _generateUrl (this.params.builtPath,_path)},
					tempUrl:function (_path) {return _generateUrl (this.params.tempPath,_path)},
					memoryUrl:function (_path) {return _generateUrl (this.params.memoryPath,_path)},
					sourceUrl:function (_path) {return _generateUrl (this.params.sourcePath,_path)},

				/*** abstractions of various methods of the file system service to support object storage ***/
					writeFile:function (_params) {
						var
							_this = this,
							_path = _params.path
						;
						_this.isMemoryUrl (_path)
							? (
								_this._objectCache [_path] = {
									contents:_params.contents,
									modifiedDate:new Date
								}
							)
							: _this.fileSystem.writeFile (_params)
						;
					},

					readFile:function (_params) {
						var
							_this = this,
							_path = _params.path
						;
						return (
							_this.isMemoryUrl (_path)
								? (_this._objectCache [_path] || _sacredEmptyObject).contents
								: _this.fileSystem.readFile (_params)
						);
					},

					getModifiedDate:function (_params) {
						var
							_this = this,
							_path = _params.path
						;
						return (
							_this.isMemoryUrl (_path)
								? (_this._objectCache [_path] || _sacredEmptyObject).modifiedDate
								: _this.fileSystem.getModifiedDate (_params)
						);
					},

					fileExists:function (_params) {
						var
							_this = this,
							_path = _params.path
						;
						return _this.isMemoryUrl (_path) ? !!_this._objectCache [_path] : _this.fileSystem.fileExists (_params);
					},

				perform:function (_params,_callback) {
					var
						_this = this,
						_freshBuild = _params.freshBuild = _params.freshBuild + '' == 'true',
						_filesConsideredCurrentLookup = _this._filesConsideredCurrentLookup = {},
						_minAllowedModifiedDate = _params.minAllowedModifiedDate = Math.max (
							Uize.toNumber (_params.minAllowedModifiedDate,-Infinity),
							_params.freshBuild ? Uize.now () : -Infinity
						),
						_chainDepth = -1
					;
					_params.isDev = _params.isDev == 'true';
					_this.params = _params;

					function _ensureFileCurrent (_url) {
						var
							_startTime = Uize.now (),
							_logIndent = Uize.String.repeat ('\t',++_chainDepth),
							_log = ''
						;
						if (_filesConsideredCurrentLookup [_url] == _trueFlag) {
							_log =
								_logIndent + 'file is considered current: ' + _url + '\n' +
								_logIndent + '\tduration: ' + (Uize.now () - _startTime) + '\n'
							;
						} else {
							var
								_urlParts = Uize.Url.from (_url),
								_matchingHandler
							;
							for (
								var
									_urlHandlerNo = -1,
									_urlHandlers = _this.urlHandlers,
									_urlHandlersLength = _urlHandlers.length,
									_urlHandler
								;
								++_urlHandlerNo < _urlHandlersLength;
							) {
								if ((_urlHandler = _urlHandlers [_urlHandlerNo]).urlMatcher.call (_this,_urlParts)) {
									_matchingHandler = _urlHandler;
									break;
								}
							}
							if (_matchingHandler) {
								var
									_builderInputs = (_matchingHandler.builderInputs || Uize.nop).call (_this,_urlParts),
									_builder = _matchingHandler.builder
								;
								if (_builderInputs || _builder) {
									var
										_path = _urlParts.pathname,
										_mustBuild = !_this.fileExists ({path:_path}),
										_lastBuiltDate = _mustBuild ? 0 : _this.getModifiedDate ({path:_path}),
										_builderInput,
										_subLogChunks = [],
										_subLogChunk
									;
									_mustBuild || (_mustBuild = _lastBuiltDate < _minAllowedModifiedDate);
									for (var _builderInputName in _builderInputs) {
										_subLogChunk = _ensureFileCurrent (_builderInput = _builderInputs [_builderInputName]);
										_subLogChunk && _subLogChunks.push (_subLogChunk);
										_mustBuild || (
											_mustBuild = Math.max (
												_this.getModifiedDate ({path:_builderInput}),
												_minAllowedModifiedDate
											) > _lastBuiltDate
										);
									}
									if (_mustBuild) {
										var _buildError;
										try {
											_builder
												? _this.writeFile ({
													path:_url,contents:_builder.call (_this,_builderInputs,_urlParts)
												})
												: _this.fileSystem.copyFile ({
													path:Uize.values (_builderInputs) [0],targetPath:_url
												})
											;
											_filesConsideredCurrentLookup [_url] = _trueFlag;
										} catch (_error) {
											_buildError = _error;
										}
										_log =
											_logIndent + (_buildError ? '### BUILD FAILED ###' : '***** BUILT') + ': ' + _url + '\n' +
											_logIndent + '\thandler: ' + _matchingHandler.description + '\n' +
											_logIndent + '\tduration: ' + (Uize.now () - _startTime) + '\n' +
											_logIndent + '\tbuilder inputs:\n' +
											Uize.map (
												Uize.keys (_builderInputs),
												function (_key) {
													return _logIndent + '\t\t' + _key + ': ' + _builderInputs [_key] + '\n';
												}
											).join ('') +
											(_subLogChunks.length ? '\n' + _subLogChunks.join ('\n') : '') +
											(_buildError ? _logIndent + '\nERROR: ' + _buildError : '')
										;
										if (_buildError) {
											typeof console != 'undefined' && typeof console.trace == 'function' &&
												console.trace ()
											;
											throw _buildError;
										}
									} else {
										_log =
											_logIndent + 'file is current: ' + _url + '\n' +
											_logIndent + '\thandler: ' + _matchingHandler.description + '\n' +
											_logIndent + '\tduration: ' + (Uize.now () - _startTime) + '\n'
										;
										_filesConsideredCurrentLookup [_url] = _trueFlag;
									}
								}
							}
						}
						_chainDepth--;
						return _log;
					}

					var _pathPrefix = _this.params.pathPrefix;
					if (_pathPrefix == _undefined)
						_pathPrefix = _this.params.builtPath + '/'
					;
					var
						_url = _params.url,
						_logChunks = []
					;
					Uize.isArray (_url)
						? Uize.forEach (_url,function (_url) {_logChunks.push (_ensureFileCurrent (_pathPrefix + _url))})
						: _logChunks.push (_ensureFileCurrent (_pathPrefix + _url))
					;
					var _log = _logChunks.join ('\n');
					typeof console != 'undefined' && typeof console.log == 'function' &&
						console.log (_log)
					;

					_callback && _callback (_log);
				}
			}
		});
	}
});

/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "ed07c7750943deab6b4a";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "index";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/js/index.js")(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/_raw-loader@0.5.1@raw-loader/index.js!./node_modules/_zepto@1.2.0@zepto/dist/zepto.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/_raw-loader@0.5.1@raw-loader!./node_modules/_zepto@1.2.0@zepto/dist/zepto.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"/* Zepto v1.2.0 - zepto event ajax form ie - zeptojs.com/license */\\n(function(global, factory) {\\n  if (typeof define === 'function' && define.amd)\\n    define(function() { return factory(global) })\\n  else\\n    factory(global)\\n}(this, function(window) {\\n  var Zepto = (function() {\\n  var undefined, key, $, classList, emptyArray = [], concat = emptyArray.concat, filter = emptyArray.filter, slice = emptyArray.slice,\\n    document = window.document,\\n    elementDisplay = {}, classCache = {},\\n    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },\\n    fragmentRE = /^\\\\s*<(\\\\w+|!)[^>]*>/,\\n    singleTagRE = /^<(\\\\w+)\\\\s*\\\\/?>(?:<\\\\/\\\\1>|)$/,\\n    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\\\\w:]+)[^>]*)\\\\/>/ig,\\n    rootNodeRE = /^(?:body|html)$/i,\\n    capitalRE = /([A-Z])/g,\\n\\n    // special attributes that should be get/set via method calls\\n    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],\\n\\n    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],\\n    table = document.createElement('table'),\\n    tableRow = document.createElement('tr'),\\n    containers = {\\n      'tr': document.createElement('tbody'),\\n      'tbody': table, 'thead': table, 'tfoot': table,\\n      'td': tableRow, 'th': tableRow,\\n      '*': document.createElement('div')\\n    },\\n    readyRE = /complete|loaded|interactive/,\\n    simpleSelectorRE = /^[\\\\w-]*$/,\\n    class2type = {},\\n    toString = class2type.toString,\\n    zepto = {},\\n    camelize, uniq,\\n    tempParent = document.createElement('div'),\\n    propMap = {\\n      'tabindex': 'tabIndex',\\n      'readonly': 'readOnly',\\n      'for': 'htmlFor',\\n      'class': 'className',\\n      'maxlength': 'maxLength',\\n      'cellspacing': 'cellSpacing',\\n      'cellpadding': 'cellPadding',\\n      'rowspan': 'rowSpan',\\n      'colspan': 'colSpan',\\n      'usemap': 'useMap',\\n      'frameborder': 'frameBorder',\\n      'contenteditable': 'contentEditable'\\n    },\\n    isArray = Array.isArray ||\\n      function(object){ return object instanceof Array }\\n\\n  zepto.matches = function(element, selector) {\\n    if (!selector || !element || element.nodeType !== 1) return false\\n    var matchesSelector = element.matches || element.webkitMatchesSelector ||\\n                          element.mozMatchesSelector || element.oMatchesSelector ||\\n                          element.matchesSelector\\n    if (matchesSelector) return matchesSelector.call(element, selector)\\n    // fall back to performing a selector:\\n    var match, parent = element.parentNode, temp = !parent\\n    if (temp) (parent = tempParent).appendChild(element)\\n    match = ~zepto.qsa(parent, selector).indexOf(element)\\n    temp && tempParent.removeChild(element)\\n    return match\\n  }\\n\\n  function type(obj) {\\n    return obj == null ? String(obj) :\\n      class2type[toString.call(obj)] || \\\"object\\\"\\n  }\\n\\n  function isFunction(value) { return type(value) == \\\"function\\\" }\\n  function isWindow(obj)     { return obj != null && obj == obj.window }\\n  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }\\n  function isObject(obj)     { return type(obj) == \\\"object\\\" }\\n  function isPlainObject(obj) {\\n    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype\\n  }\\n\\n  function likeArray(obj) {\\n    var length = !!obj && 'length' in obj && obj.length,\\n      type = $.type(obj)\\n\\n    return 'function' != type && !isWindow(obj) && (\\n      'array' == type || length === 0 ||\\n        (typeof length == 'number' && length > 0 && (length - 1) in obj)\\n    )\\n  }\\n\\n  function compact(array) { return filter.call(array, function(item){ return item != null }) }\\n  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }\\n  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }\\n  function dasherize(str) {\\n    return str.replace(/::/g, '/')\\n           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')\\n           .replace(/([a-z\\\\d])([A-Z])/g, '$1_$2')\\n           .replace(/_/g, '-')\\n           .toLowerCase()\\n  }\\n  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }\\n\\n  function classRE(name) {\\n    return name in classCache ?\\n      classCache[name] : (classCache[name] = new RegExp('(^|\\\\\\\\s)' + name + '(\\\\\\\\s|$)'))\\n  }\\n\\n  function maybeAddPx(name, value) {\\n    return (typeof value == \\\"number\\\" && !cssNumber[dasherize(name)]) ? value + \\\"px\\\" : value\\n  }\\n\\n  function defaultDisplay(nodeName) {\\n    var element, display\\n    if (!elementDisplay[nodeName]) {\\n      element = document.createElement(nodeName)\\n      document.body.appendChild(element)\\n      display = getComputedStyle(element, '').getPropertyValue(\\\"display\\\")\\n      element.parentNode.removeChild(element)\\n      display == \\\"none\\\" && (display = \\\"block\\\")\\n      elementDisplay[nodeName] = display\\n    }\\n    return elementDisplay[nodeName]\\n  }\\n\\n  function children(element) {\\n    return 'children' in element ?\\n      slice.call(element.children) :\\n      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })\\n  }\\n\\n  function Z(dom, selector) {\\n    var i, len = dom ? dom.length : 0\\n    for (i = 0; i < len; i++) this[i] = dom[i]\\n    this.length = len\\n    this.selector = selector || ''\\n  }\\n\\n  // `$.zepto.fragment` takes a html string and an optional tag name\\n  // to generate DOM nodes from the given html string.\\n  // The generated DOM nodes are returned as an array.\\n  // This function can be overridden in plugins for example to make\\n  // it compatible with browsers that don't support the DOM fully.\\n  zepto.fragment = function(html, name, properties) {\\n    var dom, nodes, container\\n\\n    // A special case optimization for a single tag\\n    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))\\n\\n    if (!dom) {\\n      if (html.replace) html = html.replace(tagExpanderRE, \\\"<$1></$2>\\\")\\n      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1\\n      if (!(name in containers)) name = '*'\\n\\n      container = containers[name]\\n      container.innerHTML = '' + html\\n      dom = $.each(slice.call(container.childNodes), function(){\\n        container.removeChild(this)\\n      })\\n    }\\n\\n    if (isPlainObject(properties)) {\\n      nodes = $(dom)\\n      $.each(properties, function(key, value) {\\n        if (methodAttributes.indexOf(key) > -1) nodes[key](value)\\n        else nodes.attr(key, value)\\n      })\\n    }\\n\\n    return dom\\n  }\\n\\n  // `$.zepto.Z` swaps out the prototype of the given `dom` array\\n  // of nodes with `$.fn` and thus supplying all the Zepto functions\\n  // to the array. This method can be overridden in plugins.\\n  zepto.Z = function(dom, selector) {\\n    return new Z(dom, selector)\\n  }\\n\\n  // `$.zepto.isZ` should return `true` if the given object is a Zepto\\n  // collection. This method can be overridden in plugins.\\n  zepto.isZ = function(object) {\\n    return object instanceof zepto.Z\\n  }\\n\\n  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and\\n  // takes a CSS selector and an optional context (and handles various\\n  // special cases).\\n  // This method can be overridden in plugins.\\n  zepto.init = function(selector, context) {\\n    var dom\\n    // If nothing given, return an empty Zepto collection\\n    if (!selector) return zepto.Z()\\n    // Optimize for string selectors\\n    else if (typeof selector == 'string') {\\n      selector = selector.trim()\\n      // If it's a html fragment, create nodes from it\\n      // Note: In both Chrome 21 and Firefox 15, DOM error 12\\n      // is thrown if the fragment doesn't begin with <\\n      if (selector[0] == '<' && fragmentRE.test(selector))\\n        dom = zepto.fragment(selector, RegExp.$1, context), selector = null\\n      // If there's a context, create a collection on that context first, and select\\n      // nodes from there\\n      else if (context !== undefined) return $(context).find(selector)\\n      // If it's a CSS selector, use it to select nodes.\\n      else dom = zepto.qsa(document, selector)\\n    }\\n    // If a function is given, call it when the DOM is ready\\n    else if (isFunction(selector)) return $(document).ready(selector)\\n    // If a Zepto collection is given, just return it\\n    else if (zepto.isZ(selector)) return selector\\n    else {\\n      // normalize array if an array of nodes is given\\n      if (isArray(selector)) dom = compact(selector)\\n      // Wrap DOM nodes.\\n      else if (isObject(selector))\\n        dom = [selector], selector = null\\n      // If it's a html fragment, create nodes from it\\n      else if (fragmentRE.test(selector))\\n        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null\\n      // If there's a context, create a collection on that context first, and select\\n      // nodes from there\\n      else if (context !== undefined) return $(context).find(selector)\\n      // And last but no least, if it's a CSS selector, use it to select nodes.\\n      else dom = zepto.qsa(document, selector)\\n    }\\n    // create a new Zepto collection from the nodes found\\n    return zepto.Z(dom, selector)\\n  }\\n\\n  // `$` will be the base `Zepto` object. When calling this\\n  // function just call `$.zepto.init, which makes the implementation\\n  // details of selecting nodes and creating Zepto collections\\n  // patchable in plugins.\\n  $ = function(selector, context){\\n    return zepto.init(selector, context)\\n  }\\n\\n  function extend(target, source, deep) {\\n    for (key in source)\\n      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {\\n        if (isPlainObject(source[key]) && !isPlainObject(target[key]))\\n          target[key] = {}\\n        if (isArray(source[key]) && !isArray(target[key]))\\n          target[key] = []\\n        extend(target[key], source[key], deep)\\n      }\\n      else if (source[key] !== undefined) target[key] = source[key]\\n  }\\n\\n  // Copy all but undefined properties from one or more\\n  // objects to the `target` object.\\n  $.extend = function(target){\\n    var deep, args = slice.call(arguments, 1)\\n    if (typeof target == 'boolean') {\\n      deep = target\\n      target = args.shift()\\n    }\\n    args.forEach(function(arg){ extend(target, arg, deep) })\\n    return target\\n  }\\n\\n  // `$.zepto.qsa` is Zepto's CSS selector implementation which\\n  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.\\n  // This method can be overridden in plugins.\\n  zepto.qsa = function(element, selector){\\n    var found,\\n        maybeID = selector[0] == '#',\\n        maybeClass = !maybeID && selector[0] == '.',\\n        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked\\n        isSimple = simpleSelectorRE.test(nameOnly)\\n    return (element.getElementById && isSimple && maybeID) ? // Safari DocumentFragment doesn't have getElementById\\n      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :\\n      (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :\\n      slice.call(\\n        isSimple && !maybeID && element.getElementsByClassName ? // DocumentFragment doesn't have getElementsByClassName/TagName\\n          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class\\n          element.getElementsByTagName(selector) : // Or a tag\\n          element.querySelectorAll(selector) // Or it's not simple, and we need to query all\\n      )\\n  }\\n\\n  function filtered(nodes, selector) {\\n    return selector == null ? $(nodes) : $(nodes).filter(selector)\\n  }\\n\\n  $.contains = document.documentElement.contains ?\\n    function(parent, node) {\\n      return parent !== node && parent.contains(node)\\n    } :\\n    function(parent, node) {\\n      while (node && (node = node.parentNode))\\n        if (node === parent) return true\\n      return false\\n    }\\n\\n  function funcArg(context, arg, idx, payload) {\\n    return isFunction(arg) ? arg.call(context, idx, payload) : arg\\n  }\\n\\n  function setAttribute(node, name, value) {\\n    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)\\n  }\\n\\n  // access className property while respecting SVGAnimatedString\\n  function className(node, value){\\n    var klass = node.className || '',\\n        svg   = klass && klass.baseVal !== undefined\\n\\n    if (value === undefined) return svg ? klass.baseVal : klass\\n    svg ? (klass.baseVal = value) : (node.className = value)\\n  }\\n\\n  // \\\"true\\\"  => true\\n  // \\\"false\\\" => false\\n  // \\\"null\\\"  => null\\n  // \\\"42\\\"    => 42\\n  // \\\"42.5\\\"  => 42.5\\n  // \\\"08\\\"    => \\\"08\\\"\\n  // JSON    => parse if valid\\n  // String  => self\\n  function deserializeValue(value) {\\n    try {\\n      return value ?\\n        value == \\\"true\\\" ||\\n        ( value == \\\"false\\\" ? false :\\n          value == \\\"null\\\" ? null :\\n          +value + \\\"\\\" == value ? +value :\\n          /^[\\\\[\\\\{]/.test(value) ? $.parseJSON(value) :\\n          value )\\n        : value\\n    } catch(e) {\\n      return value\\n    }\\n  }\\n\\n  $.type = type\\n  $.isFunction = isFunction\\n  $.isWindow = isWindow\\n  $.isArray = isArray\\n  $.isPlainObject = isPlainObject\\n\\n  $.isEmptyObject = function(obj) {\\n    var name\\n    for (name in obj) return false\\n    return true\\n  }\\n\\n  $.isNumeric = function(val) {\\n    var num = Number(val), type = typeof val\\n    return val != null && type != 'boolean' &&\\n      (type != 'string' || val.length) &&\\n      !isNaN(num) && isFinite(num) || false\\n  }\\n\\n  $.inArray = function(elem, array, i){\\n    return emptyArray.indexOf.call(array, elem, i)\\n  }\\n\\n  $.camelCase = camelize\\n  $.trim = function(str) {\\n    return str == null ? \\\"\\\" : String.prototype.trim.call(str)\\n  }\\n\\n  // plugin compatibility\\n  $.uuid = 0\\n  $.support = { }\\n  $.expr = { }\\n  $.noop = function() {}\\n\\n  $.map = function(elements, callback){\\n    var value, values = [], i, key\\n    if (likeArray(elements))\\n      for (i = 0; i < elements.length; i++) {\\n        value = callback(elements[i], i)\\n        if (value != null) values.push(value)\\n      }\\n    else\\n      for (key in elements) {\\n        value = callback(elements[key], key)\\n        if (value != null) values.push(value)\\n      }\\n    return flatten(values)\\n  }\\n\\n  $.each = function(elements, callback){\\n    var i, key\\n    if (likeArray(elements)) {\\n      for (i = 0; i < elements.length; i++)\\n        if (callback.call(elements[i], i, elements[i]) === false) return elements\\n    } else {\\n      for (key in elements)\\n        if (callback.call(elements[key], key, elements[key]) === false) return elements\\n    }\\n\\n    return elements\\n  }\\n\\n  $.grep = function(elements, callback){\\n    return filter.call(elements, callback)\\n  }\\n\\n  if (window.JSON) $.parseJSON = JSON.parse\\n\\n  // Populate the class2type map\\n  $.each(\\\"Boolean Number String Function Array Date RegExp Object Error\\\".split(\\\" \\\"), function(i, name) {\\n    class2type[ \\\"[object \\\" + name + \\\"]\\\" ] = name.toLowerCase()\\n  })\\n\\n  // Define methods that will be available on all\\n  // Zepto collections\\n  $.fn = {\\n    constructor: zepto.Z,\\n    length: 0,\\n\\n    // Because a collection acts like an array\\n    // copy over these useful array functions.\\n    forEach: emptyArray.forEach,\\n    reduce: emptyArray.reduce,\\n    push: emptyArray.push,\\n    sort: emptyArray.sort,\\n    splice: emptyArray.splice,\\n    indexOf: emptyArray.indexOf,\\n    concat: function(){\\n      var i, value, args = []\\n      for (i = 0; i < arguments.length; i++) {\\n        value = arguments[i]\\n        args[i] = zepto.isZ(value) ? value.toArray() : value\\n      }\\n      return concat.apply(zepto.isZ(this) ? this.toArray() : this, args)\\n    },\\n\\n    // `map` and `slice` in the jQuery API work differently\\n    // from their array counterparts\\n    map: function(fn){\\n      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))\\n    },\\n    slice: function(){\\n      return $(slice.apply(this, arguments))\\n    },\\n\\n    ready: function(callback){\\n      // need to check if document.body exists for IE as that browser reports\\n      // document ready when it hasn't yet created the body element\\n      if (readyRE.test(document.readyState) && document.body) callback($)\\n      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)\\n      return this\\n    },\\n    get: function(idx){\\n      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]\\n    },\\n    toArray: function(){ return this.get() },\\n    size: function(){\\n      return this.length\\n    },\\n    remove: function(){\\n      return this.each(function(){\\n        if (this.parentNode != null)\\n          this.parentNode.removeChild(this)\\n      })\\n    },\\n    each: function(callback){\\n      emptyArray.every.call(this, function(el, idx){\\n        return callback.call(el, idx, el) !== false\\n      })\\n      return this\\n    },\\n    filter: function(selector){\\n      if (isFunction(selector)) return this.not(this.not(selector))\\n      return $(filter.call(this, function(element){\\n        return zepto.matches(element, selector)\\n      }))\\n    },\\n    add: function(selector,context){\\n      return $(uniq(this.concat($(selector,context))))\\n    },\\n    is: function(selector){\\n      return this.length > 0 && zepto.matches(this[0], selector)\\n    },\\n    not: function(selector){\\n      var nodes=[]\\n      if (isFunction(selector) && selector.call !== undefined)\\n        this.each(function(idx){\\n          if (!selector.call(this,idx)) nodes.push(this)\\n        })\\n      else {\\n        var excludes = typeof selector == 'string' ? this.filter(selector) :\\n          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)\\n        this.forEach(function(el){\\n          if (excludes.indexOf(el) < 0) nodes.push(el)\\n        })\\n      }\\n      return $(nodes)\\n    },\\n    has: function(selector){\\n      return this.filter(function(){\\n        return isObject(selector) ?\\n          $.contains(this, selector) :\\n          $(this).find(selector).size()\\n      })\\n    },\\n    eq: function(idx){\\n      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)\\n    },\\n    first: function(){\\n      var el = this[0]\\n      return el && !isObject(el) ? el : $(el)\\n    },\\n    last: function(){\\n      var el = this[this.length - 1]\\n      return el && !isObject(el) ? el : $(el)\\n    },\\n    find: function(selector){\\n      var result, $this = this\\n      if (!selector) result = $()\\n      else if (typeof selector == 'object')\\n        result = $(selector).filter(function(){\\n          var node = this\\n          return emptyArray.some.call($this, function(parent){\\n            return $.contains(parent, node)\\n          })\\n        })\\n      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))\\n      else result = this.map(function(){ return zepto.qsa(this, selector) })\\n      return result\\n    },\\n    closest: function(selector, context){\\n      var nodes = [], collection = typeof selector == 'object' && $(selector)\\n      this.each(function(_, node){\\n        while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))\\n          node = node !== context && !isDocument(node) && node.parentNode\\n        if (node && nodes.indexOf(node) < 0) nodes.push(node)\\n      })\\n      return $(nodes)\\n    },\\n    parents: function(selector){\\n      var ancestors = [], nodes = this\\n      while (nodes.length > 0)\\n        nodes = $.map(nodes, function(node){\\n          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {\\n            ancestors.push(node)\\n            return node\\n          }\\n        })\\n      return filtered(ancestors, selector)\\n    },\\n    parent: function(selector){\\n      return filtered(uniq(this.pluck('parentNode')), selector)\\n    },\\n    children: function(selector){\\n      return filtered(this.map(function(){ return children(this) }), selector)\\n    },\\n    contents: function() {\\n      return this.map(function() { return this.contentDocument || slice.call(this.childNodes) })\\n    },\\n    siblings: function(selector){\\n      return filtered(this.map(function(i, el){\\n        return filter.call(children(el.parentNode), function(child){ return child!==el })\\n      }), selector)\\n    },\\n    empty: function(){\\n      return this.each(function(){ this.innerHTML = '' })\\n    },\\n    // `pluck` is borrowed from Prototype.js\\n    pluck: function(property){\\n      return $.map(this, function(el){ return el[property] })\\n    },\\n    show: function(){\\n      return this.each(function(){\\n        this.style.display == \\\"none\\\" && (this.style.display = '')\\n        if (getComputedStyle(this, '').getPropertyValue(\\\"display\\\") == \\\"none\\\")\\n          this.style.display = defaultDisplay(this.nodeName)\\n      })\\n    },\\n    replaceWith: function(newContent){\\n      return this.before(newContent).remove()\\n    },\\n    wrap: function(structure){\\n      var func = isFunction(structure)\\n      if (this[0] && !func)\\n        var dom   = $(structure).get(0),\\n            clone = dom.parentNode || this.length > 1\\n\\n      return this.each(function(index){\\n        $(this).wrapAll(\\n          func ? structure.call(this, index) :\\n            clone ? dom.cloneNode(true) : dom\\n        )\\n      })\\n    },\\n    wrapAll: function(structure){\\n      if (this[0]) {\\n        $(this[0]).before(structure = $(structure))\\n        var children\\n        // drill down to the inmost element\\n        while ((children = structure.children()).length) structure = children.first()\\n        $(structure).append(this)\\n      }\\n      return this\\n    },\\n    wrapInner: function(structure){\\n      var func = isFunction(structure)\\n      return this.each(function(index){\\n        var self = $(this), contents = self.contents(),\\n            dom  = func ? structure.call(this, index) : structure\\n        contents.length ? contents.wrapAll(dom) : self.append(dom)\\n      })\\n    },\\n    unwrap: function(){\\n      this.parent().each(function(){\\n        $(this).replaceWith($(this).children())\\n      })\\n      return this\\n    },\\n    clone: function(){\\n      return this.map(function(){ return this.cloneNode(true) })\\n    },\\n    hide: function(){\\n      return this.css(\\\"display\\\", \\\"none\\\")\\n    },\\n    toggle: function(setting){\\n      return this.each(function(){\\n        var el = $(this)\\n        ;(setting === undefined ? el.css(\\\"display\\\") == \\\"none\\\" : setting) ? el.show() : el.hide()\\n      })\\n    },\\n    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },\\n    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },\\n    html: function(html){\\n      return 0 in arguments ?\\n        this.each(function(idx){\\n          var originHtml = this.innerHTML\\n          $(this).empty().append( funcArg(this, html, idx, originHtml) )\\n        }) :\\n        (0 in this ? this[0].innerHTML : null)\\n    },\\n    text: function(text){\\n      return 0 in arguments ?\\n        this.each(function(idx){\\n          var newText = funcArg(this, text, idx, this.textContent)\\n          this.textContent = newText == null ? '' : ''+newText\\n        }) :\\n        (0 in this ? this.pluck('textContent').join(\\\"\\\") : null)\\n    },\\n    attr: function(name, value){\\n      var result\\n      return (typeof name == 'string' && !(1 in arguments)) ?\\n        (0 in this && this[0].nodeType == 1 && (result = this[0].getAttribute(name)) != null ? result : undefined) :\\n        this.each(function(idx){\\n          if (this.nodeType !== 1) return\\n          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])\\n          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))\\n        })\\n    },\\n    removeAttr: function(name){\\n      return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){\\n        setAttribute(this, attribute)\\n      }, this)})\\n    },\\n    prop: function(name, value){\\n      name = propMap[name] || name\\n      return (1 in arguments) ?\\n        this.each(function(idx){\\n          this[name] = funcArg(this, value, idx, this[name])\\n        }) :\\n        (this[0] && this[0][name])\\n    },\\n    removeProp: function(name){\\n      name = propMap[name] || name\\n      return this.each(function(){ delete this[name] })\\n    },\\n    data: function(name, value){\\n      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()\\n\\n      var data = (1 in arguments) ?\\n        this.attr(attrName, value) :\\n        this.attr(attrName)\\n\\n      return data !== null ? deserializeValue(data) : undefined\\n    },\\n    val: function(value){\\n      if (0 in arguments) {\\n        if (value == null) value = \\\"\\\"\\n        return this.each(function(idx){\\n          this.value = funcArg(this, value, idx, this.value)\\n        })\\n      } else {\\n        return this[0] && (this[0].multiple ?\\n           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :\\n           this[0].value)\\n      }\\n    },\\n    offset: function(coordinates){\\n      if (coordinates) return this.each(function(index){\\n        var $this = $(this),\\n            coords = funcArg(this, coordinates, index, $this.offset()),\\n            parentOffset = $this.offsetParent().offset(),\\n            props = {\\n              top:  coords.top  - parentOffset.top,\\n              left: coords.left - parentOffset.left\\n            }\\n\\n        if ($this.css('position') == 'static') props['position'] = 'relative'\\n        $this.css(props)\\n      })\\n      if (!this.length) return null\\n      if (document.documentElement !== this[0] && !$.contains(document.documentElement, this[0]))\\n        return {top: 0, left: 0}\\n      var obj = this[0].getBoundingClientRect()\\n      return {\\n        left: obj.left + window.pageXOffset,\\n        top: obj.top + window.pageYOffset,\\n        width: Math.round(obj.width),\\n        height: Math.round(obj.height)\\n      }\\n    },\\n    css: function(property, value){\\n      if (arguments.length < 2) {\\n        var element = this[0]\\n        if (typeof property == 'string') {\\n          if (!element) return\\n          return element.style[camelize(property)] || getComputedStyle(element, '').getPropertyValue(property)\\n        } else if (isArray(property)) {\\n          if (!element) return\\n          var props = {}\\n          var computedStyle = getComputedStyle(element, '')\\n          $.each(property, function(_, prop){\\n            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))\\n          })\\n          return props\\n        }\\n      }\\n\\n      var css = ''\\n      if (type(property) == 'string') {\\n        if (!value && value !== 0)\\n          this.each(function(){ this.style.removeProperty(dasherize(property)) })\\n        else\\n          css = dasherize(property) + \\\":\\\" + maybeAddPx(property, value)\\n      } else {\\n        for (key in property)\\n          if (!property[key] && property[key] !== 0)\\n            this.each(function(){ this.style.removeProperty(dasherize(key)) })\\n          else\\n            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'\\n      }\\n\\n      return this.each(function(){ this.style.cssText += ';' + css })\\n    },\\n    index: function(element){\\n      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])\\n    },\\n    hasClass: function(name){\\n      if (!name) return false\\n      return emptyArray.some.call(this, function(el){\\n        return this.test(className(el))\\n      }, classRE(name))\\n    },\\n    addClass: function(name){\\n      if (!name) return this\\n      return this.each(function(idx){\\n        if (!('className' in this)) return\\n        classList = []\\n        var cls = className(this), newName = funcArg(this, name, idx, cls)\\n        newName.split(/\\\\s+/g).forEach(function(klass){\\n          if (!$(this).hasClass(klass)) classList.push(klass)\\n        }, this)\\n        classList.length && className(this, cls + (cls ? \\\" \\\" : \\\"\\\") + classList.join(\\\" \\\"))\\n      })\\n    },\\n    removeClass: function(name){\\n      return this.each(function(idx){\\n        if (!('className' in this)) return\\n        if (name === undefined) return className(this, '')\\n        classList = className(this)\\n        funcArg(this, name, idx, classList).split(/\\\\s+/g).forEach(function(klass){\\n          classList = classList.replace(classRE(klass), \\\" \\\")\\n        })\\n        className(this, classList.trim())\\n      })\\n    },\\n    toggleClass: function(name, when){\\n      if (!name) return this\\n      return this.each(function(idx){\\n        var $this = $(this), names = funcArg(this, name, idx, className(this))\\n        names.split(/\\\\s+/g).forEach(function(klass){\\n          (when === undefined ? !$this.hasClass(klass) : when) ?\\n            $this.addClass(klass) : $this.removeClass(klass)\\n        })\\n      })\\n    },\\n    scrollTop: function(value){\\n      if (!this.length) return\\n      var hasScrollTop = 'scrollTop' in this[0]\\n      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset\\n      return this.each(hasScrollTop ?\\n        function(){ this.scrollTop = value } :\\n        function(){ this.scrollTo(this.scrollX, value) })\\n    },\\n    scrollLeft: function(value){\\n      if (!this.length) return\\n      var hasScrollLeft = 'scrollLeft' in this[0]\\n      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset\\n      return this.each(hasScrollLeft ?\\n        function(){ this.scrollLeft = value } :\\n        function(){ this.scrollTo(value, this.scrollY) })\\n    },\\n    position: function() {\\n      if (!this.length) return\\n\\n      var elem = this[0],\\n        // Get *real* offsetParent\\n        offsetParent = this.offsetParent(),\\n        // Get correct offsets\\n        offset       = this.offset(),\\n        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()\\n\\n      // Subtract element margins\\n      // note: when an element has margin: auto the offsetLeft and marginLeft\\n      // are the same in Safari causing offset.left to incorrectly be 0\\n      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0\\n      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0\\n\\n      // Add offsetParent borders\\n      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0\\n      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0\\n\\n      // Subtract the two offsets\\n      return {\\n        top:  offset.top  - parentOffset.top,\\n        left: offset.left - parentOffset.left\\n      }\\n    },\\n    offsetParent: function() {\\n      return this.map(function(){\\n        var parent = this.offsetParent || document.body\\n        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css(\\\"position\\\") == \\\"static\\\")\\n          parent = parent.offsetParent\\n        return parent\\n      })\\n    }\\n  }\\n\\n  // for now\\n  $.fn.detach = $.fn.remove\\n\\n  // Generate the `width` and `height` functions\\n  ;['width', 'height'].forEach(function(dimension){\\n    var dimensionProperty =\\n      dimension.replace(/./, function(m){ return m[0].toUpperCase() })\\n\\n    $.fn[dimension] = function(value){\\n      var offset, el = this[0]\\n      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :\\n        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :\\n        (offset = this.offset()) && offset[dimension]\\n      else return this.each(function(idx){\\n        el = $(this)\\n        el.css(dimension, funcArg(this, value, idx, el[dimension]()))\\n      })\\n    }\\n  })\\n\\n  function traverseNode(node, fun) {\\n    fun(node)\\n    for (var i = 0, len = node.childNodes.length; i < len; i++)\\n      traverseNode(node.childNodes[i], fun)\\n  }\\n\\n  // Generate the `after`, `prepend`, `before`, `append`,\\n  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.\\n  adjacencyOperators.forEach(function(operator, operatorIndex) {\\n    var inside = operatorIndex % 2 //=> prepend, append\\n\\n    $.fn[operator] = function(){\\n      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings\\n      var argType, nodes = $.map(arguments, function(arg) {\\n            var arr = []\\n            argType = type(arg)\\n            if (argType == \\\"array\\\") {\\n              arg.forEach(function(el) {\\n                if (el.nodeType !== undefined) return arr.push(el)\\n                else if ($.zepto.isZ(el)) return arr = arr.concat(el.get())\\n                arr = arr.concat(zepto.fragment(el))\\n              })\\n              return arr\\n            }\\n            return argType == \\\"object\\\" || arg == null ?\\n              arg : zepto.fragment(arg)\\n          }),\\n          parent, copyByClone = this.length > 1\\n      if (nodes.length < 1) return this\\n\\n      return this.each(function(_, target){\\n        parent = inside ? target : target.parentNode\\n\\n        // convert all methods to a \\\"before\\\" operation\\n        target = operatorIndex == 0 ? target.nextSibling :\\n                 operatorIndex == 1 ? target.firstChild :\\n                 operatorIndex == 2 ? target :\\n                 null\\n\\n        var parentInDocument = $.contains(document.documentElement, parent)\\n\\n        nodes.forEach(function(node){\\n          if (copyByClone) node = node.cloneNode(true)\\n          else if (!parent) return $(node).remove()\\n\\n          parent.insertBefore(node, target)\\n          if (parentInDocument) traverseNode(node, function(el){\\n            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&\\n               (!el.type || el.type === 'text/javascript') && !el.src){\\n              var target = el.ownerDocument ? el.ownerDocument.defaultView : window\\n              target['eval'].call(target, el.innerHTML)\\n            }\\n          })\\n        })\\n      })\\n    }\\n\\n    // after    => insertAfter\\n    // prepend  => prependTo\\n    // before   => insertBefore\\n    // append   => appendTo\\n    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){\\n      $(html)[operator](this)\\n      return this\\n    }\\n  })\\n\\n  zepto.Z.prototype = Z.prototype = $.fn\\n\\n  // Export internal API functions in the `$.zepto` namespace\\n  zepto.uniq = uniq\\n  zepto.deserializeValue = deserializeValue\\n  $.zepto = zepto\\n\\n  return $\\n})()\\n\\nwindow.Zepto = Zepto\\nwindow.$ === undefined && (window.$ = Zepto)\\n\\n;(function($){\\n  var _zid = 1, undefined,\\n      slice = Array.prototype.slice,\\n      isFunction = $.isFunction,\\n      isString = function(obj){ return typeof obj == 'string' },\\n      handlers = {},\\n      specialEvents={},\\n      focusinSupported = 'onfocusin' in window,\\n      focus = { focus: 'focusin', blur: 'focusout' },\\n      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }\\n\\n  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'\\n\\n  function zid(element) {\\n    return element._zid || (element._zid = _zid++)\\n  }\\n  function findHandlers(element, event, fn, selector) {\\n    event = parse(event)\\n    if (event.ns) var matcher = matcherFor(event.ns)\\n    return (handlers[zid(element)] || []).filter(function(handler) {\\n      return handler\\n        && (!event.e  || handler.e == event.e)\\n        && (!event.ns || matcher.test(handler.ns))\\n        && (!fn       || zid(handler.fn) === zid(fn))\\n        && (!selector || handler.sel == selector)\\n    })\\n  }\\n  function parse(event) {\\n    var parts = ('' + event).split('.')\\n    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}\\n  }\\n  function matcherFor(ns) {\\n    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')\\n  }\\n\\n  function eventCapture(handler, captureSetting) {\\n    return handler.del &&\\n      (!focusinSupported && (handler.e in focus)) ||\\n      !!captureSetting\\n  }\\n\\n  function realEvent(type) {\\n    return hover[type] || (focusinSupported && focus[type]) || type\\n  }\\n\\n  function add(element, events, fn, data, selector, delegator, capture){\\n    var id = zid(element), set = (handlers[id] || (handlers[id] = []))\\n    events.split(/\\\\s/).forEach(function(event){\\n      if (event == 'ready') return $(document).ready(fn)\\n      var handler   = parse(event)\\n      handler.fn    = fn\\n      handler.sel   = selector\\n      // emulate mouseenter, mouseleave\\n      if (handler.e in hover) fn = function(e){\\n        var related = e.relatedTarget\\n        if (!related || (related !== this && !$.contains(this, related)))\\n          return handler.fn.apply(this, arguments)\\n      }\\n      handler.del   = delegator\\n      var callback  = delegator || fn\\n      handler.proxy = function(e){\\n        e = compatible(e)\\n        if (e.isImmediatePropagationStopped()) return\\n        e.data = data\\n        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))\\n        if (result === false) e.preventDefault(), e.stopPropagation()\\n        return result\\n      }\\n      handler.i = set.length\\n      set.push(handler)\\n      if ('addEventListener' in element)\\n        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))\\n    })\\n  }\\n  function remove(element, events, fn, selector, capture){\\n    var id = zid(element)\\n    ;(events || '').split(/\\\\s/).forEach(function(event){\\n      findHandlers(element, event, fn, selector).forEach(function(handler){\\n        delete handlers[id][handler.i]\\n      if ('removeEventListener' in element)\\n        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))\\n      })\\n    })\\n  }\\n\\n  $.event = { add: add, remove: remove }\\n\\n  $.proxy = function(fn, context) {\\n    var args = (2 in arguments) && slice.call(arguments, 2)\\n    if (isFunction(fn)) {\\n      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }\\n      proxyFn._zid = zid(fn)\\n      return proxyFn\\n    } else if (isString(context)) {\\n      if (args) {\\n        args.unshift(fn[context], fn)\\n        return $.proxy.apply(null, args)\\n      } else {\\n        return $.proxy(fn[context], fn)\\n      }\\n    } else {\\n      throw new TypeError(\\\"expected function\\\")\\n    }\\n  }\\n\\n  $.fn.bind = function(event, data, callback){\\n    return this.on(event, data, callback)\\n  }\\n  $.fn.unbind = function(event, callback){\\n    return this.off(event, callback)\\n  }\\n  $.fn.one = function(event, selector, data, callback){\\n    return this.on(event, selector, data, callback, 1)\\n  }\\n\\n  var returnTrue = function(){return true},\\n      returnFalse = function(){return false},\\n      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,\\n      eventMethods = {\\n        preventDefault: 'isDefaultPrevented',\\n        stopImmediatePropagation: 'isImmediatePropagationStopped',\\n        stopPropagation: 'isPropagationStopped'\\n      }\\n\\n  function compatible(event, source) {\\n    if (source || !event.isDefaultPrevented) {\\n      source || (source = event)\\n\\n      $.each(eventMethods, function(name, predicate) {\\n        var sourceMethod = source[name]\\n        event[name] = function(){\\n          this[predicate] = returnTrue\\n          return sourceMethod && sourceMethod.apply(source, arguments)\\n        }\\n        event[predicate] = returnFalse\\n      })\\n\\n      event.timeStamp || (event.timeStamp = Date.now())\\n\\n      if (source.defaultPrevented !== undefined ? source.defaultPrevented :\\n          'returnValue' in source ? source.returnValue === false :\\n          source.getPreventDefault && source.getPreventDefault())\\n        event.isDefaultPrevented = returnTrue\\n    }\\n    return event\\n  }\\n\\n  function createProxy(event) {\\n    var key, proxy = { originalEvent: event }\\n    for (key in event)\\n      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]\\n\\n    return compatible(proxy, event)\\n  }\\n\\n  $.fn.delegate = function(selector, event, callback){\\n    return this.on(event, selector, callback)\\n  }\\n  $.fn.undelegate = function(selector, event, callback){\\n    return this.off(event, selector, callback)\\n  }\\n\\n  $.fn.live = function(event, callback){\\n    $(document.body).delegate(this.selector, event, callback)\\n    return this\\n  }\\n  $.fn.die = function(event, callback){\\n    $(document.body).undelegate(this.selector, event, callback)\\n    return this\\n  }\\n\\n  $.fn.on = function(event, selector, data, callback, one){\\n    var autoRemove, delegator, $this = this\\n    if (event && !isString(event)) {\\n      $.each(event, function(type, fn){\\n        $this.on(type, selector, data, fn, one)\\n      })\\n      return $this\\n    }\\n\\n    if (!isString(selector) && !isFunction(callback) && callback !== false)\\n      callback = data, data = selector, selector = undefined\\n    if (callback === undefined || data === false)\\n      callback = data, data = undefined\\n\\n    if (callback === false) callback = returnFalse\\n\\n    return $this.each(function(_, element){\\n      if (one) autoRemove = function(e){\\n        remove(element, e.type, callback)\\n        return callback.apply(this, arguments)\\n      }\\n\\n      if (selector) delegator = function(e){\\n        var evt, match = $(e.target).closest(selector, element).get(0)\\n        if (match && match !== element) {\\n          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})\\n          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))\\n        }\\n      }\\n\\n      add(element, event, callback, data, selector, delegator || autoRemove)\\n    })\\n  }\\n  $.fn.off = function(event, selector, callback){\\n    var $this = this\\n    if (event && !isString(event)) {\\n      $.each(event, function(type, fn){\\n        $this.off(type, selector, fn)\\n      })\\n      return $this\\n    }\\n\\n    if (!isString(selector) && !isFunction(callback) && callback !== false)\\n      callback = selector, selector = undefined\\n\\n    if (callback === false) callback = returnFalse\\n\\n    return $this.each(function(){\\n      remove(this, event, callback, selector)\\n    })\\n  }\\n\\n  $.fn.trigger = function(event, args){\\n    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)\\n    event._args = args\\n    return this.each(function(){\\n      // handle focus(), blur() by calling them directly\\n      if (event.type in focus && typeof this[event.type] == \\\"function\\\") this[event.type]()\\n      // items in the collection might not be DOM elements\\n      else if ('dispatchEvent' in this) this.dispatchEvent(event)\\n      else $(this).triggerHandler(event, args)\\n    })\\n  }\\n\\n  // triggers event handlers on current element just as if an event occurred,\\n  // doesn't trigger an actual event, doesn't bubble\\n  $.fn.triggerHandler = function(event, args){\\n    var e, result\\n    this.each(function(i, element){\\n      e = createProxy(isString(event) ? $.Event(event) : event)\\n      e._args = args\\n      e.target = element\\n      $.each(findHandlers(element, event.type || event), function(i, handler){\\n        result = handler.proxy(e)\\n        if (e.isImmediatePropagationStopped()) return false\\n      })\\n    })\\n    return result\\n  }\\n\\n  // shortcut methods for `.bind(event, fn)` for each event type\\n  ;('focusin focusout focus blur load resize scroll unload click dblclick '+\\n  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+\\n  'change select keydown keypress keyup error').split(' ').forEach(function(event) {\\n    $.fn[event] = function(callback) {\\n      return (0 in arguments) ?\\n        this.bind(event, callback) :\\n        this.trigger(event)\\n    }\\n  })\\n\\n  $.Event = function(type, props) {\\n    if (!isString(type)) props = type, type = props.type\\n    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true\\n    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])\\n    event.initEvent(type, bubbles, true)\\n    return compatible(event)\\n  }\\n\\n})(Zepto)\\n\\n;(function($){\\n  var jsonpID = +new Date(),\\n      document = window.document,\\n      key,\\n      name,\\n      rscript = /<script\\\\b[^<]*(?:(?!<\\\\/script>)<[^<]*)*<\\\\/script>/gi,\\n      scriptTypeRE = /^(?:text|application)\\\\/javascript/i,\\n      xmlTypeRE = /^(?:text|application)\\\\/xml/i,\\n      jsonType = 'application/json',\\n      htmlType = 'text/html',\\n      blankRE = /^\\\\s*$/,\\n      originAnchor = document.createElement('a')\\n\\n  originAnchor.href = window.location.href\\n\\n  // trigger a custom event and return false if it was cancelled\\n  function triggerAndReturn(context, eventName, data) {\\n    var event = $.Event(eventName)\\n    $(context).trigger(event, data)\\n    return !event.isDefaultPrevented()\\n  }\\n\\n  // trigger an Ajax \\\"global\\\" event\\n  function triggerGlobal(settings, context, eventName, data) {\\n    if (settings.global) return triggerAndReturn(context || document, eventName, data)\\n  }\\n\\n  // Number of active Ajax requests\\n  $.active = 0\\n\\n  function ajaxStart(settings) {\\n    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')\\n  }\\n  function ajaxStop(settings) {\\n    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')\\n  }\\n\\n  // triggers an extra global event \\\"ajaxBeforeSend\\\" that's like \\\"ajaxSend\\\" but cancelable\\n  function ajaxBeforeSend(xhr, settings) {\\n    var context = settings.context\\n    if (settings.beforeSend.call(context, xhr, settings) === false ||\\n        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)\\n      return false\\n\\n    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])\\n  }\\n  function ajaxSuccess(data, xhr, settings, deferred) {\\n    var context = settings.context, status = 'success'\\n    settings.success.call(context, data, status, xhr)\\n    if (deferred) deferred.resolveWith(context, [data, status, xhr])\\n    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])\\n    ajaxComplete(status, xhr, settings)\\n  }\\n  // type: \\\"timeout\\\", \\\"error\\\", \\\"abort\\\", \\\"parsererror\\\"\\n  function ajaxError(error, type, xhr, settings, deferred) {\\n    var context = settings.context\\n    settings.error.call(context, xhr, type, error)\\n    if (deferred) deferred.rejectWith(context, [xhr, type, error])\\n    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])\\n    ajaxComplete(type, xhr, settings)\\n  }\\n  // status: \\\"success\\\", \\\"notmodified\\\", \\\"error\\\", \\\"timeout\\\", \\\"abort\\\", \\\"parsererror\\\"\\n  function ajaxComplete(status, xhr, settings) {\\n    var context = settings.context\\n    settings.complete.call(context, xhr, status)\\n    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])\\n    ajaxStop(settings)\\n  }\\n\\n  function ajaxDataFilter(data, type, settings) {\\n    if (settings.dataFilter == empty) return data\\n    var context = settings.context\\n    return settings.dataFilter.call(context, data, type)\\n  }\\n\\n  // Empty function, used as default callback\\n  function empty() {}\\n\\n  $.ajaxJSONP = function(options, deferred){\\n    if (!('type' in options)) return $.ajax(options)\\n\\n    var _callbackName = options.jsonpCallback,\\n      callbackName = ($.isFunction(_callbackName) ?\\n        _callbackName() : _callbackName) || ('Zepto' + (jsonpID++)),\\n      script = document.createElement('script'),\\n      originalCallback = window[callbackName],\\n      responseData,\\n      abort = function(errorType) {\\n        $(script).triggerHandler('error', errorType || 'abort')\\n      },\\n      xhr = { abort: abort }, abortTimeout\\n\\n    if (deferred) deferred.promise(xhr)\\n\\n    $(script).on('load error', function(e, errorType){\\n      clearTimeout(abortTimeout)\\n      $(script).off().remove()\\n\\n      if (e.type == 'error' || !responseData) {\\n        ajaxError(null, errorType || 'error', xhr, options, deferred)\\n      } else {\\n        ajaxSuccess(responseData[0], xhr, options, deferred)\\n      }\\n\\n      window[callbackName] = originalCallback\\n      if (responseData && $.isFunction(originalCallback))\\n        originalCallback(responseData[0])\\n\\n      originalCallback = responseData = undefined\\n    })\\n\\n    if (ajaxBeforeSend(xhr, options) === false) {\\n      abort('abort')\\n      return xhr\\n    }\\n\\n    window[callbackName] = function(){\\n      responseData = arguments\\n    }\\n\\n    script.src = options.url.replace(/\\\\?(.+)=\\\\?/, '?$1=' + callbackName)\\n    document.head.appendChild(script)\\n\\n    if (options.timeout > 0) abortTimeout = setTimeout(function(){\\n      abort('timeout')\\n    }, options.timeout)\\n\\n    return xhr\\n  }\\n\\n  $.ajaxSettings = {\\n    // Default type of request\\n    type: 'GET',\\n    // Callback that is executed before request\\n    beforeSend: empty,\\n    // Callback that is executed if the request succeeds\\n    success: empty,\\n    // Callback that is executed the the server drops error\\n    error: empty,\\n    // Callback that is executed on request complete (both: error and success)\\n    complete: empty,\\n    // The context for the callbacks\\n    context: null,\\n    // Whether to trigger \\\"global\\\" Ajax events\\n    global: true,\\n    // Transport\\n    xhr: function () {\\n      return new window.XMLHttpRequest()\\n    },\\n    // MIME types mapping\\n    // IIS returns Javascript as \\\"application/x-javascript\\\"\\n    accepts: {\\n      script: 'text/javascript, application/javascript, application/x-javascript',\\n      json:   jsonType,\\n      xml:    'application/xml, text/xml',\\n      html:   htmlType,\\n      text:   'text/plain'\\n    },\\n    // Whether the request is to another domain\\n    crossDomain: false,\\n    // Default timeout\\n    timeout: 0,\\n    // Whether data should be serialized to string\\n    processData: true,\\n    // Whether the browser should be allowed to cache GET responses\\n    cache: true,\\n    //Used to handle the raw response data of XMLHttpRequest.\\n    //This is a pre-filtering function to sanitize the response.\\n    //The sanitized response should be returned\\n    dataFilter: empty\\n  }\\n\\n  function mimeToDataType(mime) {\\n    if (mime) mime = mime.split(';', 2)[0]\\n    return mime && ( mime == htmlType ? 'html' :\\n      mime == jsonType ? 'json' :\\n      scriptTypeRE.test(mime) ? 'script' :\\n      xmlTypeRE.test(mime) && 'xml' ) || 'text'\\n  }\\n\\n  function appendQuery(url, query) {\\n    if (query == '') return url\\n    return (url + '&' + query).replace(/[&?]{1,2}/, '?')\\n  }\\n\\n  // serialize payload and append it to the URL for GET requests\\n  function serializeData(options) {\\n    if (options.processData && options.data && $.type(options.data) != \\\"string\\\")\\n      options.data = $.param(options.data, options.traditional)\\n    if (options.data && (!options.type || options.type.toUpperCase() == 'GET' || 'jsonp' == options.dataType))\\n      options.url = appendQuery(options.url, options.data), options.data = undefined\\n  }\\n\\n  $.ajax = function(options){\\n    var settings = $.extend({}, options || {}),\\n        deferred = $.Deferred && $.Deferred(),\\n        urlAnchor, hashIndex\\n    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]\\n\\n    ajaxStart(settings)\\n\\n    if (!settings.crossDomain) {\\n      urlAnchor = document.createElement('a')\\n      urlAnchor.href = settings.url\\n      // cleans up URL for .href (IE only), see https://github.com/madrobby/zepto/pull/1049\\n      urlAnchor.href = urlAnchor.href\\n      settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)\\n    }\\n\\n    if (!settings.url) settings.url = window.location.toString()\\n    if ((hashIndex = settings.url.indexOf('#')) > -1) settings.url = settings.url.slice(0, hashIndex)\\n    serializeData(settings)\\n\\n    var dataType = settings.dataType, hasPlaceholder = /\\\\?.+=\\\\?/.test(settings.url)\\n    if (hasPlaceholder) dataType = 'jsonp'\\n\\n    if (settings.cache === false || (\\n         (!options || options.cache !== true) &&\\n         ('script' == dataType || 'jsonp' == dataType)\\n        ))\\n      settings.url = appendQuery(settings.url, '_=' + Date.now())\\n\\n    if ('jsonp' == dataType) {\\n      if (!hasPlaceholder)\\n        settings.url = appendQuery(settings.url,\\n          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')\\n      return $.ajaxJSONP(settings, deferred)\\n    }\\n\\n    var mime = settings.accepts[dataType],\\n        headers = { },\\n        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },\\n        protocol = /^([\\\\w-]+:)\\\\/\\\\//.test(settings.url) ? RegExp.$1 : window.location.protocol,\\n        xhr = settings.xhr(),\\n        nativeSetHeader = xhr.setRequestHeader,\\n        abortTimeout\\n\\n    if (deferred) deferred.promise(xhr)\\n\\n    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')\\n    setHeader('Accept', mime || '*/*')\\n    if (mime = settings.mimeType || mime) {\\n      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]\\n      xhr.overrideMimeType && xhr.overrideMimeType(mime)\\n    }\\n    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))\\n      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')\\n\\n    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])\\n    xhr.setRequestHeader = setHeader\\n\\n    xhr.onreadystatechange = function(){\\n      if (xhr.readyState == 4) {\\n        xhr.onreadystatechange = empty\\n        clearTimeout(abortTimeout)\\n        var result, error = false\\n        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {\\n          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))\\n\\n          if (xhr.responseType == 'arraybuffer' || xhr.responseType == 'blob')\\n            result = xhr.response\\n          else {\\n            result = xhr.responseText\\n\\n            try {\\n              // http://perfectionkills.com/global-eval-what-are-the-options/\\n              // sanitize response accordingly if data filter callback provided\\n              result = ajaxDataFilter(result, dataType, settings)\\n              if (dataType == 'script')    (1,eval)(result)\\n              else if (dataType == 'xml')  result = xhr.responseXML\\n              else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)\\n            } catch (e) { error = e }\\n\\n            if (error) return ajaxError(error, 'parsererror', xhr, settings, deferred)\\n          }\\n\\n          ajaxSuccess(result, xhr, settings, deferred)\\n        } else {\\n          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)\\n        }\\n      }\\n    }\\n\\n    if (ajaxBeforeSend(xhr, settings) === false) {\\n      xhr.abort()\\n      ajaxError(null, 'abort', xhr, settings, deferred)\\n      return xhr\\n    }\\n\\n    var async = 'async' in settings ? settings.async : true\\n    xhr.open(settings.type, settings.url, async, settings.username, settings.password)\\n\\n    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]\\n\\n    for (name in headers) nativeSetHeader.apply(xhr, headers[name])\\n\\n    if (settings.timeout > 0) abortTimeout = setTimeout(function(){\\n        xhr.onreadystatechange = empty\\n        xhr.abort()\\n        ajaxError(null, 'timeout', xhr, settings, deferred)\\n      }, settings.timeout)\\n\\n    // avoid sending empty string (#319)\\n    xhr.send(settings.data ? settings.data : null)\\n    return xhr\\n  }\\n\\n  // handle optional data/success arguments\\n  function parseArguments(url, data, success, dataType) {\\n    if ($.isFunction(data)) dataType = success, success = data, data = undefined\\n    if (!$.isFunction(success)) dataType = success, success = undefined\\n    return {\\n      url: url\\n    , data: data\\n    , success: success\\n    , dataType: dataType\\n    }\\n  }\\n\\n  $.get = function(/* url, data, success, dataType */){\\n    return $.ajax(parseArguments.apply(null, arguments))\\n  }\\n\\n  $.post = function(/* url, data, success, dataType */){\\n    var options = parseArguments.apply(null, arguments)\\n    options.type = 'POST'\\n    return $.ajax(options)\\n  }\\n\\n  $.getJSON = function(/* url, data, success */){\\n    var options = parseArguments.apply(null, arguments)\\n    options.dataType = 'json'\\n    return $.ajax(options)\\n  }\\n\\n  $.fn.load = function(url, data, success){\\n    if (!this.length) return this\\n    var self = this, parts = url.split(/\\\\s/), selector,\\n        options = parseArguments(url, data, success),\\n        callback = options.success\\n    if (parts.length > 1) options.url = parts[0], selector = parts[1]\\n    options.success = function(response){\\n      self.html(selector ?\\n        $('<div>').html(response.replace(rscript, \\\"\\\")).find(selector)\\n        : response)\\n      callback && callback.apply(self, arguments)\\n    }\\n    $.ajax(options)\\n    return this\\n  }\\n\\n  var escape = encodeURIComponent\\n\\n  function serialize(params, obj, traditional, scope){\\n    var type, array = $.isArray(obj), hash = $.isPlainObject(obj)\\n    $.each(obj, function(key, value) {\\n      type = $.type(value)\\n      if (scope) key = traditional ? scope :\\n        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'\\n      // handle data in serializeArray() format\\n      if (!scope && array) params.add(value.name, value.value)\\n      // recurse into nested objects\\n      else if (type == \\\"array\\\" || (!traditional && type == \\\"object\\\"))\\n        serialize(params, value, traditional, key)\\n      else params.add(key, value)\\n    })\\n  }\\n\\n  $.param = function(obj, traditional){\\n    var params = []\\n    params.add = function(key, value) {\\n      if ($.isFunction(value)) value = value()\\n      if (value == null) value = \\\"\\\"\\n      this.push(escape(key) + '=' + escape(value))\\n    }\\n    serialize(params, obj, traditional)\\n    return params.join('&').replace(/%20/g, '+')\\n  }\\n})(Zepto)\\n\\n;(function($){\\n  $.fn.serializeArray = function() {\\n    var name, type, result = [],\\n      add = function(value) {\\n        if (value.forEach) return value.forEach(add)\\n        result.push({ name: name, value: value })\\n      }\\n    if (this[0]) $.each(this[0].elements, function(_, field){\\n      type = field.type, name = field.name\\n      if (name && field.nodeName.toLowerCase() != 'fieldset' &&\\n        !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&\\n        ((type != 'radio' && type != 'checkbox') || field.checked))\\n          add($(field).val())\\n    })\\n    return result\\n  }\\n\\n  $.fn.serialize = function(){\\n    var result = []\\n    this.serializeArray().forEach(function(elm){\\n      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))\\n    })\\n    return result.join('&')\\n  }\\n\\n  $.fn.submit = function(callback) {\\n    if (0 in arguments) this.bind('submit', callback)\\n    else if (this.length) {\\n      var event = $.Event('submit')\\n      this.eq(0).trigger(event)\\n      if (!event.isDefaultPrevented()) this.get(0).submit()\\n    }\\n    return this\\n  }\\n\\n})(Zepto)\\n\\n;(function(){\\n  // getComputedStyle shouldn't freak out when called\\n  // without a valid element as argument\\n  try {\\n    getComputedStyle(undefined)\\n  } catch(e) {\\n    var nativeGetComputedStyle = getComputedStyle\\n    window.getComputedStyle = function(element, pseudoElement){\\n      try {\\n        return nativeGetComputedStyle(element, pseudoElement)\\n      } catch(e) {\\n        return null\\n      }\\n    }\\n  }\\n})()\\n  return Zepto\\n}))\\n\"\n\n//# sourceURL=webpack:///./node_modules/_zepto@1.2.0@zepto/dist/zepto.js?./node_modules/_raw-loader@0.5.1@raw-loader");

/***/ }),

/***/ "./node_modules/_script-loader@0.7.2@script-loader/addScript.js":
/*!**********************************************************************!*\
  !*** ./node_modules/_script-loader@0.7.2@script-loader/addScript.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\nmodule.exports = function(src) {\n\tfunction log(error) {\n\t\t(typeof console !== \"undefined\")\n\t\t&& (console.error || console.log)(\"[Script Loader]\", error);\n\t}\n\n\t// Check for IE =< 8\n\tfunction isIE() {\n\t\treturn typeof attachEvent !== \"undefined\" && typeof addEventListener === \"undefined\";\n\t}\n\n\ttry {\n\t\tif (typeof execScript !== \"undefined\" && isIE()) {\n\t\t\texecScript(src);\n\t\t} else if (typeof eval !== \"undefined\") {\n\t\t\teval.call(null, src);\n\t\t} else {\n\t\t\tlog(\"EvalError: No eval function available\");\n\t\t}\n\t} catch (error) {\n\t\tlog(error);\n\t}\n}\n\n\n//# sourceURL=webpack:///./node_modules/_script-loader@0.7.2@script-loader/addScript.js?");

/***/ }),

/***/ "./node_modules/_zepto@1.2.0@zepto/dist/zepto.js":
/*!*******************************************************!*\
  !*** ./node_modules/_zepto@1.2.0@zepto/dist/zepto.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! !./node_modules/_script-loader@0.7.2@script-loader/addScript.js */ \"./node_modules/_script-loader@0.7.2@script-loader/addScript.js\")(__webpack_require__(/*! !./node_modules/_raw-loader@0.5.1@raw-loader!./node_modules/_zepto@1.2.0@zepto/dist/zepto.js */ \"./node_modules/_raw-loader@0.5.1@raw-loader/index.js!./node_modules/_zepto@1.2.0@zepto/dist/zepto.js\"))\n\n/*** EXPORTS FROM exports-loader ***/\nmodule.exports = window.Zepto;\n\n//# sourceURL=webpack:///./node_modules/_zepto@1.2.0@zepto/dist/zepto.js?");

/***/ }),

/***/ "./src/css/base.css":
/*!**************************!*\
  !*** ./src/css/base.css ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/css/base.css?");

/***/ }),

/***/ "./src/css/index.less":
/*!****************************!*\
  !*** ./src/css/index.less ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/css/index.less?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! @/css/base.css */ \"./src/css/base.css\");\n\n__webpack_require__(/*! @/css/index.less */ \"./src/css/index.less\");\n\nvar _zepto = __webpack_require__(/*! zepto */ \"./node_modules/_zepto@1.2.0@zepto/dist/zepto.js\");\n\nvar _zepto2 = _interopRequireDefault(_zepto);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// 热更新\n\n// import '@/css/index.css';\nif (true) {\n    module.hot.accept();\n}\n\nvar search = function search() {\n\n    var doc = document;\n\n    var _ref = [doc.querySelector('.jd_header_box'), doc.querySelector('.jd_banner')],\n        search = _ref[0],\n        banner = _ref[1];\n\n    /*距离范围*/\n\n    var height = banner.offsetHeight;\n\n    window.onscroll = function () {\n        /*当前页面距离*/\n        var top = doc.documentElement.scrollTop;\n\n        var opacity = 0;\n\n        if (top > height) {\n            // 滚动距离超过轮播图距离，保持不变\n            opacity = 0.85;\n        }\n        //当滚动距离随着离顶部距离变大，透明度变大\n        opacity = 0.85 * (top / height);\n\n        search.style.background = \"rgba(216,80,92,\" + opacity + \")\";\n    };\n};\n\nvar banner = function banner() {\n    // Es6\n    var doc = document;\n    var banner = doc.querySelector('.jd_banner');\n\n    var width = banner.offsetWidth;\n\n    var imageBox = banner.querySelector('ul:first-child');\n\n    var pointBox = banner.querySelector('ul:last-child');\n\n    var points = pointBox.querySelectorAll('li');\n\n    /*添加过渡*/\n    var addTransition = function addTransition() {\n        imageBox.style.webkitTransition = \"all .2s\";\n        imageBox.style.transition = \"all .2s\";\n    };\n    /*删除过渡*/\n    var removeTransition = function removeTransition() {\n        imageBox.style.webkitTransition = \"none\";\n        imageBox.style.transition = \"none\";\n    };\n    /*改变位置*/\n    var setTranslateX = function setTranslateX(translateX) {\n        imageBox.style.webkitTransform = \"translateX(\" + translateX + \"px)\";\n        imageBox.style.transform = \"translateX(\" + translateX + \"px)\";\n    };\n\n    // 无缝滚动和无缝滑动 (定时器，过渡，位移)\n    var index = 1;\n    var timer = setInterval(function () {\n        index++;\n\n        addTransition();\n\n        setTranslateX(-index * width);\n    }, 3000);\n\n    //绑定过渡结束事件\n    banner.addEventListener('transitionend', function () {\n        //无缝滚动\n        if (index >= 9) {\n            index = 1;\n\n            removeTransition();\n\n            setTranslateX(-index * width);\n        }\n        //无缝滑动\n        else if (index <= 0) {\n                //定位到第八张\n                index = 8;\n                // 清除过渡\n                removeTransition();\n                setTranslateX(-index * width);\n            }\n        /*index 1-8  索引范围*/\n        /*point 0-7 */\n        setPoint();\n    });\n\n    /*.点随之滚动起来     （改变当前点元素的样式）*/\n    var setPoint = function setPoint() {\n        /*把所有点的样式清除*/\n        for (var i = 0; i < points.length; i++) {\n            points[i].className = \" \";\n            /* points[i].classList.remove('now');*/\n        }\n        points[index - 1].className = \"now\";\n    };\n\n    /*图片滑动 touch事件）*/\n\n    //记录开始的x坐标\n    var startX = 0;\n    var moveX = 0;\n    var distanceX = 0;\n    //  记录是否点击\n    var isMove = false;\n\n    banner.addEventListener('touchstart', function (e) {\n\n        clearInterval(timer);\n        // 当前的触摸点 touches\n        //记录当前位置\n        startX = e.touches[0].clientX;\n    });\n    banner.addEventListener('touchmove', function (e) {\n        isMove = true;\n        moveX = e.touches[0].clientX;\n        //当distanceX 大于0的时候 向右滑动 否则反之\n        distanceX = moveX - startX; /*distanceX  值  正负*/\n\n        /*算出当前图片盒子需要定位的位置*/\n        /*将要去做定位*/\n        var currX = -index * width + distanceX;\n\n        removeTransition();\n\n        setTranslateX(currX);\n    });\n    banner.addEventListener('touchend', function (e) {\n\n        /*当超过了一定的距离的时候 */\n        if (isMove && Math.abs(distanceX) > width / 3) {\n            /*5.当超过了一定的距离的时候    滚动  到上一张 或 下一张  （一定的距离  1/3  屏幕宽度  过渡）*/\n            if (distanceX > 0) {\n                index--; /*向右滑  上一张*/\n            } else {\n                index++; /*向左滑 下一张*/\n            }\n            addTransition();\n            setTranslateX(-index * width);\n        }\n        /*当不超过一定的滑动距离的时候*/\n        else {\n                /*当不超过一定的滑动距离的时候  吸附回去  定位回去     （一定的距离  1/3  屏幕宽度  过渡）*/\n                addTransition();\n                setTranslateX(-index * width);\n            }\n\n        /*重置*/\n        startX = 0;\n        moveX = 0;\n        distanceX = 0;\n        isMove = false;\n\n        /*添加定时器*/\n        clearInterval(timer);\n        timer = setInterval(function () {\n\n            index++;\n            /*定位  过渡来做定位的  这样才有动画*/\n            addTransition();\n\n            setTranslateX(-index * width);\n        }, 4000);\n    });\n};\n\n// 横向滑动\nvar infeed = function infeed() {\n\n    var doc = document;\n    var parent = doc.querySelector('.product_box_con');\n    var banner = doc.querySelector('#infeed');\n\n    var parentWidth = parent.offsetWidth;\n    var bannerWidth = banner.offsetWidth;\n\n    var addTransition = function addTransition() {\n        banner.style.webkitTransition = \"all .2s\";\n        banner.style.transition = \"all .2s\";\n    };\n\n    var removeTransition = function removeTransition() {\n        banner.style.webkitTransition = \"none\";\n        banner.style.transition = \"none\";\n    };\n\n    var setTranslateX = function setTranslateX(translateX) {\n        banner.style.webkitTransform = \"translateX(\" + translateX + \"px)\";\n        banner.style.transform = \"translateX(\" + translateX + \"px)\";\n    };\n\n    //最大的定位区间\n    var maxPosition = 0;\n    //最小的定位区间\n    var minPosition = parentWidth - bannerWidth;\n    /*滑动区间*/\n    // 最大滑动区间\n    var maxSwipe = maxPosition + 100;\n    // 最小滑动区间\n    var minSwipe = minPosition - 100;\n\n    var startX = 0;\n    var moveX = 0;\n    var distanceX = 0;\n\n    /*记录当前定位*/\n    var currX = 0;\n\n    banner.addEventListener('touchstart', function (e) {\n\n        startX = e.touches[0].clientX;\n    });\n\n    banner.addEventListener('touchmove', function (e) {\n\n        moveX = e.touches[0].clientX;\n\n        distanceX = moveX - startX;\n\n        /*.在一定的区间范围内  滑动  通过控制  滑动定位的区间的实现*/\n        /*我们将要去做定位的位置 要在  滑动区间范围内*/\n        if (currX + distanceX < maxSwipe && currX + distanceX > minSwipe) {\n            /*删除过渡*/\n            console.log(currX);\n            removeTransition();\n            /*做定位*/\n            setTranslateX(currX + distanceX);\n        }\n    });\n\n    /*避免模拟器上的bug问题   事件冒泡机制*/\n    window.addEventListener('touchend', function () {\n        /*3.在一定的区间内 做定位     定位区间*/\n        /*将要定位的位置 大于  最大定位的时候*/\n        if (currX + distanceX > maxPosition) {\n            // 左边吸附回去\n\n            currX = maxPosition;\n\n            addTransition();\n\n            setTranslateX(currX);\n        }\n        /*将要定位的位置 小于  最小定位的时候*/\n        else if (currX + distanceX < minPosition) {\n                //  右边吸附回去\n                currX = minPosition;\n\n                addTransition();\n\n                setTranslateX(currX);\n            }\n            /*正常*/\n            else {\n                    /*设置当前的定位*/\n                    currX = currX + distanceX;\n                }\n\n        /*重置参数*/\n        startX = 0;\n        moveX = 0;\n        distanceX = 0;\n    });\n};\n\n// 倒计时\nvar downTime = function downTime() {\n    var doc = document;\n    /*需要倒计时的时间*/\n    var time = 5 * 60 * 60;\n    var skTime = doc.querySelector('.sk_time');\n    var spans = skTime.querySelectorAll('span');\n    //初始化\n    setInterval(timer, 1000);\n\n    function timer() {\n        if (time <= 0) {\n            clearInterval(timer);\n            return false;\n        }\n        time--;\n\n        var h = Math.floor(time / 3600);\n        var m = Math.floor(time % 3600 / 60);\n        var s = time % 60;\n\n        spans[0].innerHTML = Math.floor(h / 10);\n        spans[1].innerHTML = h % 10;\n\n        spans[3].innerHTML = Math.floor(m / 10);\n        spans[4].innerHTML = m % 10;\n\n        spans[6].innerHTML = Math.floor(s / 10);\n        spans[7].innerHTML = s % 10;\n    };\n    timer();\n};\n\nfunction move() {\n    var doc = document;\n    var data = [{ msg: '小藏獒给奶奶养了一个月，再见却不认识了' }, { msg: '为什么现在很多的车，都取消了雾灯？' }, { msg: '花十万装修的新房，客厅太好看了！' }, { msg: '为什么酒店的床尾要放一块布？涨知识了！' }, { msg: '买了20年鞋子，才知道鞋盒里白布这样' }, { msg: '小藏獒给奶奶养了一个月，再见却不认识了' }];\n    var box1 = doc.querySelector('.box1');\n    var box = doc.querySelector('.box');\n    var index = 0;\n    var timer = void 0;\n    var fragment = doc.createDocumentFragment();\n\n    var _iteratorNormalCompletion = true;\n    var _didIteratorError = false;\n    var _iteratorError = undefined;\n\n    try {\n        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n            var iterator = _step.value;\n\n            box.innerHTML += '<li class=\"inner\">' + iterator.msg + '</li>';\n            fragment.appendChild(box);\n        }\n    } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n    } finally {\n        try {\n            if (!_iteratorNormalCompletion && _iterator.return) {\n                _iterator.return();\n            }\n        } finally {\n            if (_didIteratorError) {\n                throw _iteratorError;\n            }\n        }\n    }\n\n    box1.appendChild(fragment);\n\n    timer = setInterval(function () {\n        index++;\n\n        box.style.transition = 'all 0.6s';\n        // 位移\n        box.style.transform = 'translateY(' + -index * box1.offsetHeight + 'px)';\n    }, 3000);\n\n    box.addEventListener('transitionend', function () {\n\n        if (index >= 5) {\n\n            index = 0;\n\n            box.style.transition = 'none';\n            // 位移\n            box.style.transform = 'translateY(' + -index * box1.offsetHeight + 'px)';\n        }\n    });\n};\n\n// 图片加载\nfunction load() {\n\n    var doc = document.documentElement;\n    var Doc = document;\n    window.addEventListener('scroll', function () {\n        var _ref2 = [null, doc.clientHeight, doc.scrollTop, doc.scrollHeight],\n            html = _ref2[0],\n            clientH = _ref2[1],\n            scrollTop = _ref2[2],\n            scrollHeight = _ref2[3];\n\n\n        var fragment = Doc.createDocumentFragment();\n        if (clientH + scrollTop + 250 > scrollHeight && scrollTop + 300 < 2000) {\n            _zepto2.default.ajax({\n                url: '../data.json',\n                type: \"get\",\n                dataType: \"json\",\n                data: null,\n                cache: false, // 是否走缓存item\n                success: function success(data) {\n                    for (var i = 0; i < data.length; i++) {\n                        var div = Doc.createElement('div');\n                        div.innerHTML += '<img src=\"./images/dafult1-1.png\" data-src=\"' + data[i].img + '\" class=\"Img\">\\n                <p class=\"product_info\">' + data[i].title + '</p>\\n                    <span class=\"price\">' + data[i].price + '</span>';\n                        fragment.appendChild(div);\n                    };\n                    Doc.querySelector('.recommend').appendChild(fragment);\n                },\n                error: function error(err) {\n                    console.log(err);\n                }\n            });\n        }\n        var parent = Doc.querySelector('.recommend');\n        var Img = parent.querySelectorAll('img');\n        //console.log(Img)\n        delayLoad(Img);\n    });\n}\n\nfunction delayLoad(imgList) {\n\n    var doc = document;\n\n    var _ref3 = [doc.documentElement.scrollTop, doc.documentElement.clientHeight, null],\n        scrollTop = _ref3[0],\n        clientHeight = _ref3[1],\n        timer = _ref3[2];\n\n\n    window.addEventListener('scroll', function () {\n\n        for (var i = 0; i < imgList.length; i++) {\n\n            if (scrollTop + clientHeight >= imgList[i].offsetTop + imgList[i].offsetHeight) {\n                // 监听img\n                var img = new Image();\n\n                img.src = imgList[i].getAttribute(\"data-src\");\n                img.index = i;\n                // 加载img onload事件\n                img.onload = function () {\n\n                    imgList[this.index].src = this.src;\n                    //img = null;\n                };\n\n                imgList[i].style.opacity = 1;\n            }\n        }\n    });\n}\n\n// 改变窗口重新刷新\nwindow.addEventListener(\"resize\", function () {\n\n    window.location.reload();\n}, false);\n\nsearch();\n\nbanner();\n\ndownTime();\n\nmove();\n\nload();\n\ninfeed();\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });
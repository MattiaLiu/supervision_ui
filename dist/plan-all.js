/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _stringify = __webpack_require__(1);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _commonFunction = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var supervisionRequest = window.interfaceSettings.supervisionRequest.api; /**
	                                                                           * Created by Mattia on 2016/6/12.
	                                                                           */
	// var requestInterfaces=require("../webconfig.js")

	var filterVm = new Vue({
	    el: "#filterSection",
	    data: {
	        filterOptions: {
	            areaCode: [],
	            deptsCode: []
	        },
	        dateFilter: [{ title: "全部", status: true }, { title: "上周", status: true }, { title: "本周", status: true }, { title: "下周", status: true }, { title: "时段", status: true }],
	        dateOptions: {
	            show: false,
	            type: "date", //date datetime
	            value: "2016-6-21",
	            begin: "2016-6-20",
	            end: "2016-12-25",
	            x: 0,
	            y: 0,
	            range: true //是否多选
	        },
	        area: {
	            show: [{ status: "1", name: "全部" }], more: []

	        },
	        org: { show: [], more: [] },
	        depts: { show: [], more: [] },
	        stateList: [{ label: "编制中", value: true, feature: "label-success", margin: '50%' }, { label: "执行中", value: true, feature: "label-warning", margin: '' }, { label: "已完成", value: false, feature: "label-default", margin: '' }]
	    },
	    methods: {
	        changeTime: function changeTime(ev) {
	            // 日期条件选择
	            var that = this;
	            ev.stopPropagation();
	            var curtar = ev.currentTarget;
	            var btn = $(curtar);
	            var mark = curtar.getAttribute("data-mark");
	            if (!btn.hasClass("btn-success") || mark == "custom") {
	                $("#datePicker").find(".btn").removeClass("btn-success");
	                btn.addClass("btn-success");

	                switch (mark) {
	                    case "all":
	                        delete this.filterOptions.searchBeginDate;
	                        delete this.filterOptions.searchEndDate;
	                        break;
	                    case "lastweek":
	                        this.filterOptions.searchBeginDate = moment().day(-6).format("YYYY-MM-DD");
	                        this.filterOptions.searchEndDate = moment().day(0).format("YYYY-MM-DD");
	                        break;
	                    case "thisweek":
	                        this.filterOptions.searchBeginDate = moment().weekday(1).format("YYYY-MM-DD");
	                        this.filterOptions.searchEndDate = moment().day(7).format("YYYY-MM-DD");
	                        break;
	                    case "nextweek":
	                        this.filterOptions.searchBeginDate = moment().day(8).format("YYYY-MM-DD");
	                        this.filterOptions.searchEndDate = moment().day(14).format("YYYY-MM-DD");
	                        break;
	                    case "custom":
	                        var start = $("#startDate").val().split("/");
	                        var end = $("#endDate").val().split("/");
	                        this.filterOptions.searchBeginDate = start[2] + "-" + start[0] + "-" + start[1];
	                        this.filterOptions.searchEndDate = end[2] + "-" + end[0] + "-" + end[1];
	                        break;
	                }
	                // console.log(JSON.stringify(this.filterOptions))
	                resultVm.fetchTransactions(supervisionRequest.searchUrl);
	            }
	        },
	        changeArea: function changeArea(index, type, filter) {
	            // console.log(JSON.stringify(this.area.show));return;
	            var all = this[filter].show[0];
	            var area = this[filter].show;
	            if (type == "more") {
	                area = this[filter].more;
	            }
	            if (index == 0 && type == "show") {
	                if (all.status == "1") return; //all
	                all.status = "1";
	                for (var _i = 1, len = area.length; _i < len; _i++) {
	                    area[_i].status = "0";
	                }
	                this.filterOptions[filter + "Code"] = [];
	                var more = this[filter].more;
	                for (var _i2 = 0, _len = more.length; _i2 < _len; _i2++) {
	                    more[_i2].status = "0";
	                }
	                this[filter].more = more;
	            } else {
	                //other
	                all.status = "0";
	                var areaCode = this.filterOptions[filter + "Code"];
	                // if(type=="show"){
	                //      area[0].status = "0";
	                // }
	                var diccode = "diccode";
	                if (filter == "depts") diccode = "ou";
	                if (area[index].status == "1") {
	                    area[index].status = "0";
	                    for (var _i3 in areaCode) {
	                        if (areaCode[_i3] == area[index][diccode]) {
	                            areaCode.splice(_i3, 1);
	                        }
	                    }
	                } else {
	                    area[index].status = "1";
	                    areaCode.push(area[index][diccode]);
	                }
	                this.filterOptions[filter + "Code"] = areaCode;
	            }
	            if (type == "more") {
	                var show = this[filter].show;
	                this[filter] = { show: show, more: area };
	            } else {
	                var _more = this[filter].more;
	                this[filter] = { show: area, more: _more };
	            }
	            //
	            resultVm.fetchTransactions(supervisionRequest.searchUrl);
	        },
	        changeOrg: function changeOrg(index, type) {
	            // body...
	            var area = this.org.show,
	                other = this.org.more;
	            if (type == "more") {
	                area = this.org.more;
	                other = this.org.show;
	            }
	            if (area[index].status == "1") return;

	            for (var _i4 = 0, len = area.length; _i4 < len; _i4++) {
	                area[_i4].status = "0";
	            }
	            for (var _i5 = 0, _len2 = other.length; _i5 < _len2; _i5++) {
	                other[_i5].status = "0";
	            }
	            area[index].status = "1";
	            if (type == "more") {
	                this.org = { show: other, more: area };
	            } else {
	                this.org = { show: area, more: other };
	            }
	            (0, _commonFunction.loadingCover)();
	            // console.log(JSON.stringify(area))
	            this.fetchDepts(area[index].ou);
	        },
	        fetchDepts: function fetchDepts(pid) {
	            var _this = this;
	            $.ajax({
	                type: "get",
	                dataType: "json",
	                url: (0, _commonFunction.setSupervisionHeader)(supervisionRequest.deptListUrl, { ou: pid }),
	                success: function success(result, state, jqxhr) {
	                    // console.log(JSON.stringify(result))
	                    var depts = [];
	                    for (var _i6 in result) {
	                        if (result[_i6].level == 2) {
	                            result[_i6].status = "0";
	                            depts.push(result[_i6]);
	                        }
	                    }
	                    var show = [{ status: "1", name: "全部" }];
	                    _this.depts = {
	                        show: show.concat(depts.slice(0, 6)),
	                        more: depts.slice(6)
	                    };
	                    $.unblockUI();
	                },
	                error: function error(data, state, jqxhr) {
	                    $.unblockUI();
	                    console.log(jqxhr.key);
	                    console.log(data);
	                }
	            });
	        }

	    },
	    created: function created() {
	        var _this = this;
	        var urls = {
	            'supAreaUrl': supervisionRequest["supAreaUrl"],
	            "supSourceUrl": supervisionRequest["supSourceUrl"],
	            'orgUrl': supervisionRequest['orgUrl']
	            // 'deptUrl':supervisionRequest['deptUrl']
	        };
	        for (var key in urls) {
	            $.ajax({
	                type: "get",
	                dataType: "json",
	                // contentType:"application/json;charset=UTF-8",
	                url: (0, _commonFunction.setSupervisionHeader)(urls[key]),
	                success: function success(result, state, jqxhr) {
	                    for (var _i7 in result) {
	                        result[_i7].status = "0";
	                    }
	                    var name = jqxhr.key;
	                    var show = [{ status: "1", dicname: "全部" }];
	                    if (name == 'orgUrl') show = [{ status: "1", name: "全部" }];
	                    if (name == "supAreaUrl") {

	                        //领域
	                        _this.area = {
	                            show: show.concat(result.slice(0, 6)),
	                            more: result.slice(6)
	                        };
	                        // console.log(_this.area)
	                    } else if (name == "orgUrl") {
	                        _this.org = {
	                            show: result.slice(0, 6),
	                            more: result.slice(6)
	                        };
	                        filterVm.changeOrg(0, "show");
	                    } else {
	                        _this.depts = {
	                            show: show.concat(result.slice(0, 6)),
	                            more: result.slice(6)
	                        };
	                    }
	                },
	                error: function error(data, state, jqxhr) {
	                    console.log(jqxhr.key);
	                    console.log(data);
	                }
	            }).key = key;
	        }
	    },
	    ready: function ready() {
	        // body...
	        $("#startDate").daterangepicker({
	            singleDatePicker: true,
	            showDropdowns: true
	        }, function (start, end, label) {});
	        $("#endDate").daterangepicker({
	            singleDatePicker: true,
	            showDropdowns: true
	        });
	        $('#filterSection').on('click', 'a.drop-menu-btn', function (ev) {
	            ev.stopPropagation();
	        });
	    }
	});
	var sortings = new Array(8);
	(function () {
	    for (leti = 0; i > 8; i++) {
	        sortings[i] = "sorting";
	    }
	});
	for (var _i8 = 0; _i8 < 8; _i8++) {
	    sortings[_i8] = "sorting";
	}var resultVm = new Vue({
	    el: "#result-section",
	    data: {
	        ths: [
	        // {key: "code", val: '督办编号'},
	        { key: "name", val: '计划名称' },
	        // {key: "accountablename", val: '发起人(A)'},
	        // {key: "responsiblename", val: '责任人(R)'},
	        { key: "starttime", val: '开始时间' }, { key: "finishtime", val: '完成时间' }, { key: "lastupdatetime", val: '最后更新时间' }
	        // {key: "rate", val: '最新进展'}
	        ],
	        keyItems: {
	            sorting: sortings,
	            total: [],
	            show: [],
	            current: 1
	        },
	        pageSize: 3,
	        levelBackground: ["gray", "#A1C636", "#5CB85C", "#F0AD4E", "#D9534F"]

	    },
	    created: function created() {
	        var _this = this;
	        //search for the initialization
	        this.fetchTransactions(supervisionRequest.searchUrl);

	        //fetch list end
	    }, ready: function ready() {
	        var that = this;
	        $("#keyPagesizeSelect").change(function (ev) {
	            var target = ev.currentTarget;
	            var totalCount = Number(that["keyItems"].total.length);
	            $('#key-pagination').extendPagination({
	                totalCount: totalCount,
	                limit: target.value,
	                name: "key",
	                callback: function callback(curr, limit, totalCount, key) {
	                    that.changePage(curr, limit, totalCount, key);
	                }
	            });
	            that.changePage(1, target.value, totalCount, "key");
	        });
	    },

	    methods: {
	        changePage: function changePage(curr, limit, totalCount, name) {
	            var items = this[name + "Items"];
	            items.current = curr;
	            this.changeHandler(curr, name, items);
	        },
	        sortColumn: function sortColumn(n, name) {
	            var _this2 = this;

	            var items = this[name + "Items"];
	            var status = items.sorting[n];
	            if (status == "sorting_asc") {
	                (function () {
	                    //des sorting
	                    var sorting = sortings.concat();
	                    sorting[n] = "sorting_desc";
	                    items.sorting = sorting;
	                    var key = _this2.ths[n].key;
	                    items.total.sort(function (a, b) {
	                        return sorter(b[key], a[key]);
	                    });
	                    _this2.changeHandler(items.current, name, items);
	                })();
	            } else {
	                (function () {
	                    //asc sorting
	                    var sorting = sortings.concat();
	                    sorting[n] = "sorting_asc";
	                    items.sorting = sorting;
	                    var key = _this2.ths[n].key;
	                    items.total.sort(function (a, b) {
	                        return sorter(a[key], b[key]);
	                    });
	                    _this2.changeHandler(items.current, name, items);
	                })();
	            }

	            function sorter(a, b) {
	                if (/^\d/.test(a) ^ /^\D/.test(b)) return a > b ? 1 : a == b ? 0 : -1;
	                return a > b ? -1 : a == b ? 0 : 1;
	            }
	        },
	        changeHandler: function changeHandler(curr, name, items) {
	            var pageSize = $("#keyPagesizeSelect").val();
	            items.show = items.total.slice((curr - 1) * pageSize, pageSize * curr);
	        },
	        fetchTransactions: function fetchTransactions(url) {
	            // //search for the tablelist
	            //  jQuery.support.cors = true;
	            var options = {};
	            for (var key in filterVm.filterOptions) {
	                options[key] = filterVm.filterOptions[key];
	            }
	            // console.log(JSON.stringify(options))
	            if (options.areaCode.length == 0) {
	                delete options.areaCode;
	            } else {
	                options.areaCode = options.areaCode.join(",");
	            }

	            options.scope = options.deptsCode;
	            delete options.deptsCode;
	            if (options.scope.length == 0) {
	                delete options.scope;
	            } else {
	                options.scope = options.scope.join(",");
	            }
	            options.source = options.sourceCode;

	            var that = this;
	            options = (0, _stringify2.default)(options);
	            $.ajax({
	                type: "POST",
	                dataType: "json",
	                data: options,
	                contentType: "application/json",
	                url: (0, _commonFunction.setSupervisionHeader)(url, { page: 0, size: 1000 }),
	                success: function success(result, state, jqxhr) {
	                    // console.log(JSON.stringify(result))
	                    var keyList = [];
	                    for (var _i9 = 0, len = result.length; _i9 < len; _i9++) {
	                        var item = result[_i9];
	                        if (item.latestTrace) {
	                            item.rate = item.latestTrace.rate;
	                            item.latestDesc = item.latestTrace.description;
	                        } else {
	                            item.rate = 0;
	                            item.latestDesc = "";
	                        }
	                        if (item.rate < 25) {
	                            item.rateState = "progress-bar-danger";
	                        } else if (item.rate < 75) {
	                            item.rateState = "progress-bar-warning";
	                        } else {
	                            item.rateState = "progress-bar-success";
	                        }
	                        keyList.push(item);
	                    }

	                    var sorting = sortings.concat(),
	                        pageSize = $('#keyPagesizeSelect').val();
	                    that.keyItems = {
	                        total: keyList,
	                        show: keyList.slice(0, pageSize),
	                        sorting: sorting,
	                        current: 1
	                    };

	                    var limit = Number(pageSize) || 10;
	                    var totalCount = Number(that.keyItems.total.length);
	                    $('#key-pagination').extendPagination({
	                        totalCount: totalCount,
	                        // showCount: showCount,
	                        limit: limit,
	                        name: "key",
	                        callback: function callback(curr, limit, totalCount, name) {
	                            that.changePage(curr, limit, totalCount, name);
	                        }
	                    });
	                },
	                error: function error(data, state, jqxhr) {
	                    console.log(data);
	                }
	            });

	            //fetch list end
	        },
	        newfunc: function newfunc() {}
	    }

	    /* body... */
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(3)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.fetchAjaxService = exports.loadingCover = exports.getQueryString = exports.deleteCookie = exports.getCookie = exports.setCookie = exports.add_supervision = exports.fetch_sourceFromServer = exports.fetch_areaFromServer = exports.fetch_deptsFromServer = exports.fetch_serviceByHttpProtocol = exports.setSupervisionHeader = undefined;

	var _stringify = __webpack_require__(1);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var supervisionRequest = window.interfaceSettings.supervisionRequest;

	var setSupervisionHeader = function setSupervisionHeader(url, paramObj, iid) {
		if (paramObj) ;else paramObj = { stamp: new Date().getTime() };
		return (iid ? url.replace("%id%", iid) : url) + "?" + (paramObj ? $.param($.extend({}, supervisionRequest.header, paramObj)) : $.param(supervisionRequest.header));
	};

	//ajax
	var fetch_serviceByHttpProtocol = function fetch_serviceByHttpProtocol(url, type, requestData, successHandler, errorHandler) {
		if (type == "post") requestData = (0, _stringify2.default)(requestData);
		$.ajax({
			url: url,
			type: type,
			data: requestData,
			// dataType:"json",
			contentType: "application/json",
			success: function success(result, state, jqxhr) {
				// console.log("success");
				successHandler(result, state, jqxhr);
			},
			error: function error(result, state, jqxhr) {
				// console.log("error");
				errorHandler(result, state, jqxhr);
			}
		});
	};
	//fetch organization

	//fetch depts   部门
	var fetch_deptsFromServer = function fetch_deptsFromServer(pid, success) {
		var url = setSupervisionHeader(supervisionRequest.api["deptUrl"], null, pid);
		fetch_serviceByHttpProtocol(url, "get", {}, success, function (result, state, jqxhr) {});
	};
	//supervision source
	var fetch_sourceFromServer = function fetch_sourceFromServer(success) {
		var url = setSupervisionHeader(supervisionRequest.api["supSourceUrl"]);
		fetch_serviceByHttpProtocol(url, "get", {}, success, function (result, state, jqxhr) {});
	};
	//supervision area
	var fetch_areaFromServer = function fetch_areaFromServer(success) {
		var url = setSupervisionHeader(supervisionRequest.api["supAreaUrl"]);
		fetch_serviceByHttpProtocol(url, "get", {}, success, function (result, state, jqxhr) {});
	};

	//accountable sn

	//add new supervision
	var add_supervision = function add_supervision(options, success) {
		var url = setSupervisionHeader(supervisionRequest.api["supAddUrl"]);
		fetch_serviceByHttpProtocol(url, "post", options, success, function (result, state, jqxhr) {});
	};
	//*cookies*/


	function setCookie(name, value, days, path, domain, secure) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			var expires = date.toGMTString();
		} else var expires = "";
		var cookieString = name + "=" + escape(value);
		if (expires) cookieString += ";expires=" + expires;
		if (path) cookieString += ";path=" + escape(path);
		if (domain) cookieString += ";domain=" + escape(domain);
		if (secure) cookieString += ";secure=" + secure;
		document.cookie = cookieString;
	}
	function getCookie(name) {
		var arr,
		    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg)) return unescape(arr[2]);else return null;
	} //读取cookie

	function deleteCookie(name) {
		var expdate = new Date();
		expdate.setTime(expdate.getTime() - 86400 * 1000 * 1);
		setCookie(name, "", expdate, "/");
	}
	//*cookies*/
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		} else {
			return null;
		}
	}

	/*covering loading function*/
	function loadingCover() {
		$.blockUI({ message: '数据获取中，请稍候... ...',
			css: {
				border: 'none',
				padding: '15px',
				backgroundColor: '#000',
				'-webkit-border-radius': '10px',
				'-moz-border-radius': '10px',
				opacity: .5,
				color: '#fff'
			}
		});
	}

	function fetchAjaxService(dataSource, _this) {
		var successHandler = function successHandler(result, status, xhr) {
			for (var i = 0, len = result.length; i < len; i++) {
				if (result[i].publishDate) result[i].publishDate = result[i].publishDate.substring(5);
			}
			_this.list = result;
			if (_this.successNext) _this.successNext();
		};
		var error = function error(result, status, xhr) {
			// console.log("error",result);
		};
		var ajaxOptions = {
			type: 'get',
			url: dataSource.URL + dataSource.QueryString,
			success: successHandler,
			error: error
		};
		if (dataSource.METHOD == "post") {
			ajaxOptions = {
				type: 'post',
				url: dataSource.URL + dataSource.QueryString,
				data: dataSource.PLAYLOAD,
				contentType: dataSource.CONTENT_TYPE,
				success: successHandler,
				error: error
			};
		}
		$.ajax(ajaxOptions);
	}

	exports.setSupervisionHeader = setSupervisionHeader;
	exports.fetch_serviceByHttpProtocol = fetch_serviceByHttpProtocol;
	exports.fetch_deptsFromServer = fetch_deptsFromServer;
	exports.fetch_areaFromServer = fetch_areaFromServer;
	exports.fetch_sourceFromServer = fetch_sourceFromServer;
	exports.add_supervision = add_supervision;
	exports.setCookie = setCookie;
	exports.getCookie = getCookie;
	exports.deleteCookie = deleteCookie;
	exports.getQueryString = getQueryString;
	exports.loadingCover = loadingCover;
	exports.fetchAjaxService = fetchAjaxService;

/***/ }
/******/ ]);
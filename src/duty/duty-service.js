/**
 * Created by canice_yuan on 2016/6/28.
 */
var eventApp = angular.module("dutyApp", []);

eventApp.service( 'EventService', [ '$rootScope', '$http', '$timeout', function( $rootScope, $http, $timeout) {
    var events = new Array();
    var peoples = new Array();
    var names = new Array();
    var scheduletypes = new Array();
    var scope = new Array();
    var eventClasss = [];
//    var hostName = "http://172.16.51.137:8000";
//    var hostName = "http://10.15.251.110:8010";
    var hostName = "http://w3.cnnp.com.cn:8010";
//    var configHostName = "http://172.16.51.137:8000";
    var configHostName = hostName;

    $http.get(configHostName + "/api/cache/find/type/OPEN_TYPE?apikey=a16cb0c916404be78cb0805fefc7d26a", "")
    .success(function(response){
        scope = response;
    });
    $http.get(configHostName + "/api/cache/find/type/CAL_TYPE?apikey=a16cb0c916404be78cb0805fefc7d26a", "")
    .success(function(response){
        scheduletypes = response;
        var tmpClass = ["event-meeting", "event-travel", "event-duty", "event-agent", "event-holiday"];
        for(var i = 0, j = response.length; i < j; i++){
            var eventClass = {
                "id": response[i].id,
                "class": tmpClass[i],
            };
            eventClasss.push(eventClass);
        }
    });

    Date.prototype.format = function(format) {
        var o = {
            "M+" : this.getMonth() + 1,
            "d+" : this.getDate(),
            "h+" : this.getHours(),
            "m+" : this.getMinutes(),
            "s+" : this.getSeconds(),
            "q+" : Math.floor((this.getMonth() + 3) / 3),
            "S" : this.getMilliseconds()
        }

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
    Date.prototype.addDay = function(dayCount) {
        return new Date((this / 1000 + 86400) * 1000);
    }

    var convertEvent = function(curEvent, isMultiType){
        var event = {
            id: curEvent.id,
            title: curEvent.caretakerName,
            start: new Date(curEvent.startDate),
            end: new Date(curEvent.endDate),
            index: '',
            people:curEvent.people,
            // username: curEvent.username && curEvent.username.length > 0 ? curEvent.username : curEvent.people.username,
            isMultiType: isMultiType
        };
                
        if(isMultiType){
            event.isMultiType = true;
        }
        return event;
    }

    var clone = function(obj){
        var o;
        switch(typeof obj){
            case 'undefined': break;
            case 'string'   : o = obj + '';break;
            case 'number'   : o = obj - 0;break;
            case 'boolean'  : o = obj;break;
            case 'object'   :
                if(obj === null){
                    o = null;
                }else{
                    if(obj instanceof Array){
                        o = [];
                        for(var i = 0, len = obj.length; i < len; i++){
                            o.push(clone(obj[i]));
                        }
                    }else{
                        o = {};
                        for(var k in obj){
                            o[k] = clone(obj[k]);
                        }
                    }
                }
                break;
            default:
                o = obj;break;
        }
        return o;
    };

    var service = {

fetchInterfaces:function (handler) {
            var _this=this;
            // body...
              $http.get("/dist/webconfig.json")
                .success(function(response){
                    _this.interfaces={};
                    var catalogs=response.catalogs;
                    for(var type in catalogs){
                        var requestObj=catalogs[type];
                        var api=requestObj.api;
                        for(var prop in api)api[prop]=requestObj.server+api[prop];
                        _this.interfaces[type+'Request']=requestObj;
                    }
                    handler();
            });
        },
 getOrglist:function (handler) { $.unblockUI();
            // body...
            $http.get( setSupervisionHeader(supervisionRequest.api.orgUrl))
              .success(function(response){
                  $.unblockUI();
                  handler(response); 
              });
        },
        getEventClasss: function(){
            return eventClasss;
        },

        getEventsByPeople: function(urlParam, callback){
            $http.post(setDutyHeader(dutyRequest.api.getDutyList) , urlParam)
                .success(function(response){
                        events=[];
                        var resultEvents = new Array();
                       
                        for(var i = 0, len=response.length; i < len; i++){
                            var event=response[i];
                            for(var k=0;k<peoples.length;k++){
                                if(peoples[k].id==event.departmentCode){event.people=peoples[k];break;}
                            }
                            events.push(event);
                            resultEvents.push(convertEvent(event, true));
                        }
                        callback(resultEvents);
                    $.unblockUI();
                });
        },

        updateEvents: function(urlParam, isMultiType){
            if(isMultiType){
                urlParam = hostName + "/api/schedule/scheduleCompanyPeoples?apikey=a16cb0c916404be78cb0805fefc7d26a&" + urlParam + '&' + ( +new Date );
            } else{
                urlParam = hostName + '/api/schedule/scheduleuserdate?apikey=a16cb0c916404be78cb0805fefc7d26a&' + urlParam + '&' + ( +new Date );
            }
            $http.get(urlParam, "")
                .success(function(response){
                    if(true){
                        events = response;
                        var resultEvents = new Array();

                        for(var i = 0, j = events.length; i < j; i++){
                            resultEvents.push(convertEvent(events[i], isMultiType));
                        }
                        $("#calendar").fullCalendar('addEventSource', [resultEvents]);
                    } else{
                        //console.log("request event data fail!")
                    }
                });
        },

        getEventsByType: function(type, isMultiType){
            var resultEvents = new Array();

            for(var i = 0, j = events.length; i < j; i++){
                var curEvent = events[i];
                if(curEvent.scheduletype == type){
                    var event = convertEvent(events[i], isMultiType);
                    if(isMultiType){
                        event.index = $.inArray(event.username, names);
                    }
                    resultEvents.push(event);
                }
            }
            return resultEvents;
        },

        addEvent: function (event, isMultiType) {
            var url = setDutyHeader(dutyRequest.api.editDuty);
          
            $http.post(url, event)
             .success(function(response){
                    response.people=event.people;
                    event=response;
                    events.push(event);
                    //console.log("add success");
                    $("#add").removeClass("active").removeClass("in");
                    $("#schedule").addClass("active").addClass("in");
                    var curEvent = convertEvent(event, isMultiType);
                   
                    event.startdate = event.startDate;
                    event.enddate = event.endDate;
                    
                    if(event.id) $("#calendar").fullCalendar('removeEvents', event.id);
                    $("#calendar").fullCalendar('addEventSource', [curEvent]);
                
                $.unblockUI();
            }).error(function(){
                $.unblockUI();
                alert("值班操作失败，请检查后重试...")
            });
        },

        editEvent: function (event, isMultiType) {
            var url = setDutyHeader(dutyRequest.api.editDuty);
            $http.post(url, event)
            .success(function(response){
                    $("#edit").removeClass("active").removeClass("in");
                    $("#schedule").addClass("active").addClass("in");
                    var curEvent = convertEvent(event, isMultiType);                    
                    $("#calendar").fullCalendar('removeEvents', curEvent.id);
                    $("#calendar").fullCalendar('addEventSource', [curEvent]);
               
            });
        },

        getEventDetail: function(id){
            var resultEvent;
            for(var i = 0, j = events.length; i < j; i++){
                if(events[i].id == id){
                    return events[i];
                }
            }
            return '';
        },

        deleteEventById: function(id){
            $http.post(setDutyHeader(dutyRequest.api.delete,null,id),{})
            .success(function(response){
                $("#detail").removeClass("active").removeClass("in");
                $("#schedule").addClass("active").addClass("in");
                $("#calendar").fullCalendar('removeEvents', id);
                alert("删除成功");
            }).error(function(response){
                alert("删除失败\n"+response);
            });
        },

        getPeoples: function(/*urlParam, callback*/){
            
            return peoples;
        },

        setPeoples: function(userList){
            peoples = userList;
        },

        getNames: function(){
            var resultNames = new Array();
            for(var i = 0, j = peoples.length; i < j; i++){
                resultNames.push(peoples[i].username);
            }
            names = resultNames;
            return resultNames;
        },

        parseParam: function(param, key){
            var parseParams = function(param, key){
                var paramStr = "";
                if(param instanceof String ||param instanceof Number || param instanceof Boolean){
                    paramStr += "&" + key + "=" + encodeURIComponent(param);
                }else{
                    $.each(param,function(i){
                        var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
                        paramStr += '&' + parseParams(this, k);
                    });
                }
                return paramStr.substr(1);
            };
            return parseParams(param, key);
        },

        getScope: function(){
            return scope;
        },

        getScheduletypes: function(){
            return scheduletypes;
        },

        getOrg: function(){
            $http.get(setSupervisionHeader(supervisionRequest.api.orgUrl))
                .success(function(response){
                    if(true){
                        //console.log(response);
                    }
                });
        },

        showAlert: function(content){
            $.blockUI({
                message: content,
                timeout: 800,
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
        },

        showLoading: function(content){
            $.blockUI({ message: content,
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
        },
        getCookie: function(name) {
            var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr = document.cookie.match(reg)){
                return unescape(arr[2]);
            } else{
                return null;
            }
        },
        getHostName: function(){
          return   hostName;
        },
    };

    return service;
}]);
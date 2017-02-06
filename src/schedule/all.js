eventApp.controller("AllCtrl", function($scope, $http, $timeout, EventService) {
      var urlParams = {
            'userid': EventService.getCookie('userid') ? EventService.getCookie('userid') : "",
            'startdate': "",
            'enddate': "",
      };

      EventService.showLoading('数据请求中，请稍后... ...');
      $http.get(EventService.getHostName() +  '/api/contact/getOrglist?apikey=a16cb0c916404be78cb0805fefc7d26a', '')
          .success(function(response){
          if(true){
                $scope.orgs = response;
                $scope.searchMyInfo();
          }
      });

      var callback = function() {
            $('#calendar').fullCalendar({
                  header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'agendaWeek',
                  },
                  firstDay:1,
                  eventClick: function(calEvent, jsEvent, view) {
                        $scope.$apply(
                            function(){
                                  $scope.currentEvent = EventService.getEventDetail(calEvent.id);
                            }
                        );
                        $("#schedule").removeClass("active").removeClass("in");
                        $("#detail").addClass("active").addClass("in");
                  },
                  names: EventService.getNames(),
                  events: function(start, end, callback){
                        urlParams.startdate = start.format("yyyy-MM-dd");
                        urlParams.enddate = end.format("yyyy-MM-dd");

                        EventService.showLoading('数据获取中，请稍后... ...');
                        EventService.getEventsByPeople(urlParams, callback);
                        $timeout(
                            function() {
                                  document.getElementsByClassName('fc-button-agendaWeek')[0].click();
                            },
                            1
                        );
                  },
            });
      };

      $scope.orgClick = function (org) {
            for(var i = 0, j = $scope.orgs.length; i < j; i++){
                  if(org.id == $scope.orgs[i].id){
                        $scope.orgs[i].isSelected = true;
                  } else{
                        $scope.orgs[i].isSelected = false;
                  }
            }
            urlParams.companyid = org.id;

            EventService.showLoading('数据获取中，请稍后... ...');
            $http.get(EventService.getHostName() +  '/api/contact/getchlistbyou?apikey=a16cb0c916404be78cb0805fefc7d26a&ou=' + org.id, '')
            .success(function(response){
                if(true){
                      $scope.childOrgs = response;
                      var userIds = [];
                      for(var i = 0, j = response.length; i < j; i++){
                            var user =  response[i];
                            //user.id = user.ou;
                            user.username = user.name;
                            userIds.push({"userid": user.id});
                      }
                      $.unblockUI();
                      EventService.setPeoples(response);
                      $("#calendar").empty();
                      urlParams.userid = userIds;
                      callback();
                }
            });
      };

      $scope.scheduletype = [true, true, true, true, true];
      $scope.scheduleTypeClick = function(index){
            var scheduletypes = EventService.getScheduletypes();
            var typeId = scheduletypes[index].id;
            var disPlayEvents = EventService.getEventsByType(typeId, true);
            if($scope.scheduletype[index]){
                  for(var i = 0, j = disPlayEvents.length; i < j; i++){
                        $('#calendar').fullCalendar('removeEvents',  disPlayEvents[i].id);
                  }
            } else{
                  $('#calendar').fullCalendar('addEventSource',  disPlayEvents);
            }
            $scope.scheduletype[index] = !$scope.scheduletype[index];
      };

      $scope.addClick = function(){
            $scope.scheduletypes = EventService.getScheduletypes();
            $scope.scope = EventService.getScope();
            $scope.addParams = {
                  "title": "",
                  "scheduletype": "",
                  "startdate": new Date().format("yyyy-MM-dd"),
                  "description": "",
                  "scope": "",
                  "enddate": new Date().format("yyyy-MM-dd"),
                  "starttime": "8:30",
                  "endtime": "18:30",
                  "address": "",
                  "content": "",
                  "responsible": "",
                  "responsibledepartment": "",
                  "sourcelink": "",
                  "createuserid": EventService.getCookie('userid') ? EventService.getCookie('userid') : "",
                  "createusername": EventService.getCookie('username') ? EventService.getCookie('username') : "",
                  "createtime": new Date().format("yyyy-MM-dd"),
                  "other": "",
                  "people": {
                        "companyid": "",
                        "scheduletype": "",
                        "userid": "",
                        "username": "",
                        "peopletype": "",
                        "updatetime": "",
                        "collsaceid": ""
                  }
            };
            $("#startdate").daterangepicker({
                      singleDatePicker:!0,
                      showDropdowns:!0
                }
            );
            $("#enddate").daterangepicker({
                      singleDatePicker:!0,
                      showDropdowns:!0
                }
            );
           
      };

      $scope.addEvent = function(){
            if(!$scope.addParams.people.userid || $scope.addParams.people.userid.length <= 0){
                  EventService.showAlert('请选择组织');
                  return;
            }
            if(!$scope.addParams.scheduletype || $scope.addParams.scheduletype.length <= 0){
                  EventService.showAlert('请选择日程类型');
                  return;
            }
            if(!$scope.addParams.scope || $scope.addParams.scope.id.length <= 0){
                  EventService.showAlert('请选择日程公开范围');
                  return;
            }
            $scope.addParams.startdate = $("#startdate").val();
            $scope.addParams.enddate = $("#enddate").val();
            $scope.addParams.scheduletype = $scope.addParams.scheduletype.id;
            $scope.addParams.scope = $scope.addParams.scope.id;
            EventService.showLoading('数据提交中，请稍后... ...');
            EventService.addEvent($scope.addParams, false);
      };

      $scope.addPeopleClick = function(){
            $scope.searchParams = {
                  "content": '',
                  "result": '',
            }
            $('#orgSelectModal').modal('show');
            $http.get(EventService.getHostName() +  '/api/contact/getorgbyou?apikey=a16cb0c916404be78cb0805fefc7d26a&ou=', '')
                .success(function(response){
                      $scope.orgList = response;
                      $scope.newOrgList = [];
                      $scope.sceondLevelOrgList = [];
                      $scope.thirdLevelOrgList = [];
                      for(var i = 0, j = $scope.orgList.length; i < j; i++){
                            if($scope.orgList[i].level == 1){
                                  $scope.newOrgList.push($scope.orgList[i]);
                                  $scope.newOrgList[$scope.newOrgList.length - 1].child = [];
                            } else if($scope.orgList[i].level == 2){
                                  $scope.orgList[i].isSelect = false;
                                  $scope.sceondLevelOrgList.push($scope.orgList[i]);
                                  $scope.sceondLevelOrgList[$scope.sceondLevelOrgList.length - 1].child = [];;
                            } else if($scope.orgList[i].level == 3){
                                  $scope.thirdLevelOrgList.push($scope.orgList[i]);
                            }
                      }
                      for(var i = 0, j = $scope.thirdLevelOrgList.length; i < j; i++){
                            for(var m = 0, n = $scope.sceondLevelOrgList.length; m < n; m++){
                                  if($scope.sceondLevelOrgList[m].id == $scope.thirdLevelOrgList[i].pid){
                                        $scope.sceondLevelOrgList[m].child.push($scope.thirdLevelOrgList[i]);
                                  }
                            }
                      }
                      for(var i = 0, j = $scope.sceondLevelOrgList.length; i < j; i++){
                            for(var m = 0, n = $scope.newOrgList.length; m < n; m++){
                                  if($scope.newOrgList[m].id == $scope.sceondLevelOrgList[i].pid){
                                        $scope.newOrgList[m].child.push($scope.sceondLevelOrgList[i]);
                                  }
                            }
                      }

                      $timeout(
                          function() {
                                $(function() {
                                      $("#menus").accordion({
                                            speed: 500,
                                            closedSign: '[+]',
                                            openedSign: '[-]'
                                      });
                                });
                          },
                          2000
                      );
                });
      };

      $scope.userClick = function(user){
            user.isChecked = true;
            $scope.addParams.people.userid = user.id;
            $scope.addParams.people.peopletype = 0;//非领导
            $scope.addParams.people.username = user.name;
            $('#orgSelectModal').modal('hide');
      };

      $scope.peopleConfig = function(){
            $('#orgSelectModal').modal('hide');
      };

      $scope.editClick = function(){
            $scope.editParams = $scope.currentEvent;
            $("#detail").removeClass("active").removeClass("in");
            $("#edit").addClass("active").addClass("in");
            $("#edit_startdate").daterangepicker({
                      singleDatePicker:true,
                      showDropdowns:true
                }
            );
            $("#edit_enddate").daterangepicker({
                      singleDatePicker:true,
                      showDropdowns:true
                }
            );
      };

      $scope.editSubmit = function(){
            EventService.editEvent($scope.editParams, true);
      };

      $scope.delete = function(){
            EventService.deleteEventById($scope.currentEvent.id);
      };

      $scope.peopleInfo = {
            "orgid": "-1",
            "branchOrgid": "-1",
      };
      $scope.searchMyInfo = function(){
            var uid = EventService.getCookie('userid') ? EventService.getCookie('userid') : "";
            $http.get( EventService.getHostName() + '/api/contact/searchuser?apikey=a16cb0c916404be78cb0805fefc7d26a&id=&q=' + uid, '')
                .success(function(response){
                      if(response.length == 1){
                            var orgtree = response[0].orgtree;
                            var count = 0;
                            if (orgtree) {
                                  for (var orgi in orgtree) {
                                        for (var key in orgtree[orgi]){
                                              if(count == 1){
                                                    $scope.peopleInfo.orgid = key;
                                              } else if(count == 2){
                                                    $scope.peopleInfo.branchOrgid = key;
                                              }
                                              count++;
                                        }
                                  }
                            }
                            var isFind = false;
                            for(var i = 0, j = $scope.orgs.length; i < j; i++){
                                  if($scope.peopleInfo.orgid == $scope.orgs[i].id){
                                        $scope.orgClick($scope.orgs[i]);
                                        isFind = true;
                                        if(i > 5){
                                              $scope.displayParams.isShowAllOrg = true;
                                        }
                                  }
                            }
                            if(!isFind){
                                  $scope.orgClick($scope.orgs[0]);
                            }
                      }
                }
            );
      }
});
